import { db } from '@/lib/db/db';
import { users } from '@/lib/db/schema';
import { plans } from '@/types/PricingTypes';
import { createClient } from '@/utils/supabase/server';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const rawBody = await req.arrayBuffer();
  const buffer = Buffer.from(rawBody);
  const sig = req.headers.get('stripe-signature'); 
	
	let data;

  try {
    const event = stripe.webhooks.constructEvent(
      buffer,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

		data = event.data;
		const session = data.object as Stripe.Checkout.Session;

    switch (event.type) {
      case 'checkout.session.completed':

				const retrievedSession = await stripe.checkout.sessions.retrieve(session.id, {
					expand: ['line_items'],
				});

				const customerId = retrievedSession.customer;
				if (typeof customerId === 'string') {
					const customer = await stripe.customers.retrieve(customerId);

					const priceId = retrievedSession?.line_items?.data[0]?.price?.id;
					const plan = plans.find((plan) => plan.priceId === priceId);

					console.log('✅ Pagamento concluído:', retrievedSession);

					if (!plan) break;

					if ('email' in customer && customer.email) {
						const registeredUser = await db.select().from(users).where(eq(users.email, customer.email));

						await db.update(users).set({
								...registeredUser,
								hasAccess: true,
								planPriceId: priceId,
								customerId
							})
						}

						// send e-mail maybe here \/
				
				} else {
					console.log('⚠️ Customer ID is null or not a string');
				}

      break;

			case 'customer.subscription.deleted':
					const subscription = await stripe.subscriptions.retrieve(session.id);

					const idCustomer = typeof subscription.customer === 'string'
							? subscription.customer
							: subscription.customer?.id;

					if (idCustomer) {
							const updatedUser = await db
									.update(users)
									.set({
											hasAccess: false,
									})
									.where(eq(users.customerId, idCustomer))
									.returning();

							if (updatedUser.length > 0) {
									console.log(`🔒 Access revoked for user with customer ID: ${idCustomer}`);
							} else {
									console.log(`❗ No user found with customer ID: ${idCustomer}`);
							}
					} else {
							console.log('❗ Invalid customer ID.');
					}

					console.log('🔔 Subscription canceled');
			break;

				

      case 'customer.subscription.created':
        console.log('🔔 Nova assinatura criada');
        break;

			case 'payment_intent.succeeded':
				console.log('💸 Pagamento salvo no banco:', 'teste');
				break;

      default:
        console.log(`ℹ️ Evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error(`❌ Erro no webhook:`, err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }
}
