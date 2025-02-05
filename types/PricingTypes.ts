export type Plan = {
	link: string;
	priceId: string;
	price: string;
	duration: string;
}

export const plans: Array<Plan> = [
	{
		link: 'https://buy.stripe.com/test_9AQ022baQav4eMUeUU',
		priceId: 'price_1QoXipFtOvxb2o0P9Cdvc6XW',
		price: '97,00',
		duration: 'Mensal',
	},
	{
		link: 'https://buy.stripe.com/test_aEUbKK0wc8mWdIQ3cd',
		priceId: 'price_1QobxQFtOvxb2o0PjbV9uSwY',
		price: '197,00',
		duration: 'Mensal',
	},
	{
		link: 'https://buy.stripe.com/test_6oEg10fr60Uu34c28a',
		priceId: 'price_1QobxjFtOvxb2o0PONoRefwW',
		price: '497,00',
		duration: 'Mensal',
	}
]