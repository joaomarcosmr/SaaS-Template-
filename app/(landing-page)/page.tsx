"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    CheckCircle,
} from "lucide-react";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import Navbar from "./navbar";
import Footer from "./footer";
import { plans } from "@/types/PricingTypes";
import Link from "next/link";

type AdvantageCardProps = {
    title: string;
    description: string;
    image: string;
};

type PricingCardProps = {
    plan: string;
    price: string;
    priceId: string;
    features: string[];
    highlight?: boolean;
    link: string;
};

export default function LandingPage() {
    return (
        <div className="bg-[#f9f8f6] text-gray-900 font-sans relative">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <header className="h-[70vh] flex flex-col items-center justify-center text-center px-4 md:px-52 relative overflow-hidden pt-20 md:pt-0">
                <div
                    className="absolute inset-0 bg-grid-pattern"
                    style={{
                        backgroundImage: `linear-gradient(rgba(226,232,240,.35) 1px, transparent 1px),
                            linear-gradient(to right, rgba(226,232,240,.35) 2px, transparent 1px)`,
                        backgroundSize: `80px 80px`,
                        backgroundPosition: `center center`,
                    }}
                />
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900 relative">
                    Welcome to Our Platform
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed relative">
                    Experience the future with our innovative solutions designed for you.
                </p>
                <Button className="mt-6 px-8 text-lg font-medium relative">
                    Get Started
                </Button>
            </header>

            {/* Video Section */}
            <section className="text-center px-4 md:px-52 relative mt-16">
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    DEMO
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-4">See it in Action</h2>
                <p className="text-base md:text-lg text-gray-600 mt-2">
                    Here's how easy it is to use 👇
                </p>
                <div className="relative mt-6 mx-auto max-w-5xl rounded-xl border border-gray-200 shadow-lg overflow-hidden">
                    <div className="absolute inset-0 bg-blue-300 blur-2xl rounded-xl"></div>
                    <video className="relative w-full rounded-xl" controls>
                        <source src="/path-to-your-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </section>

            {/* Product Advantages */}
            <section className="py-24 px-4 md:px-52 bg-[#f9f8f6]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
                    <AdvantageCard
                        title="Premium Member Area"
                        description="Our platform offers a premium members area with a cinematic layout, enhancing the experience for your users."
                        image="/images/members-area.png"
                    />
                    <AdvantageCard
                        title="Higher Approval Rates"
                        description="With our proprietary payment processor, enjoy higher approval rates and fewer transaction rejections."
                        image="/images/payment-approval.png"
                    />
                    <AdvantageCard
                        title="Create Your Own Podcast"
                        description="Record and distribute your podcast episodes with ease, reaching thousands of listeners."
                        image="/images/podcast-feature.png"
                    />
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 text-center px-4 md:px-52 bg-[#f9f8f6]">
                <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-gray-900">
                    What Our Users Say
                </h2>
                <div className="max-w-3xl mx-auto text-gray-600">
                    <blockquote className="italic text-xl md:text-2xl font-light leading-relaxed">
                        “This platform has changed the way we work. It’s simply amazing!”
                    </blockquote>
                    <p className="mt-6 font-semibold text-base md:text-lg text-gray-900">
                        - Alex Johnson, CEO
                    </p>
                </div>
            </section>

            {/* Pricing Section */}
            {/* Adicionando id="pricing" para a âncora do link "Veja os planos" */}
            <section
                id="pricing"
                className="py-24 text-center px-4 md:px-52 bg-[#f9f8f6]"
            >
                <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-gray-900">
                    Choose Your Plan
                </h2>
                <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    {plans.map((plan) => (
                        <PricingCard
                            key={plan.priceId}
                            plan="Basic"
                            priceId={plan.priceId}
                            price={`R$ ${plan.price} / ${plan.duration}`}
                            features={["Essential features", "Limited access", "Community support"]}
                            link={plan.link}
                        />
                    ))}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 text-center px-4 md:px-52 bg-[#f9f8f6]">
                <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-gray-900">
                    Frequently Asked Questions
                </h2>
                <Accordion
                    type="single"
                    className="max-w-3xl mx-auto text-left"
                    collapsible
                >
                    <AccordionItem value="faq-1">
                        <AccordionTrigger>How does the platform work?</AccordionTrigger>
                        <AccordionContent>
                            Our platform provides AI-driven analytics to help you make better financial decisions with real-time data.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-2">
                        <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                        <AccordionContent>
                            We accept major credit cards, PayPal, and bank transfers for enterprise clients.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="faq-3">
                        <AccordionTrigger>Is there a free trial available?</AccordionTrigger>
                        <AccordionContent>
                            Yes! We offer a 14-day free trial with access to all core features.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>

            {/* Call to Action Section */}
            <section className="py-24 text-center px-4 md:px-52 relative">
                <div
                    className="absolute inset-0 bg-grid-pattern"
                    style={{
                        backgroundImage: `linear-gradient(rgba(226,232,240,.35) 1px, transparent 1px),
                            linear-gradient(to right, rgba(226,232,240,.35) 1px, transparent 1px)`,
                        backgroundSize: `40px 40px`,
                        backgroundPosition: `center center`,
                    }}
                />
                <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-gray-900 relative">
                    Ready to buy our product?
                </h2>
                <div className="max-w-3xl mx-auto text-gray-600 relative">
                    <p className="mt-6 font-semibold text-base md:text-lg text-gray-900">
                        Signing up takes <span className="underline">just 1 minute</span>
                    </p>
                    <Button className="mt-6 px-8 text-lg font-medium">Get Started</Button>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}

function AdvantageCard({ title, description, image }: AdvantageCardProps) {
    return (
        <div className="flex flex-col md:flex-row items-center gap-6 text-left">
            <img
                src={image}
                alt={title}
                className="w-48 h-48 rounded-xl object-cover"
            />
            <div>
                <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed mt-2">
                    {description}
                </p>
            </div>
        </div>
    );
}

function PricingCard({ plan, price, features, highlight, link, priceId }: PricingCardProps) {
    return (
        <Card
            className={`p-8 shadow-md rounded-xl bg-white ${highlight ? "border-2 border-blue-600" : ""
                }`}
        >
            <CardContent className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900">{plan}</h3>
                <p className="text-4xl font-bold text-gray-900 mt-4">{price}</p>
                <ul className="mt-6 text-gray-600 space-y-2">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center justify-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" /> {feature}
                        </li>
                    ))}
                </ul>
                <Link className="mt-6 w-full inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                    href={'/register?priceId=' + priceId}
                >Subscribe</Link>
            </CardContent>
        </Card>
    )
}
