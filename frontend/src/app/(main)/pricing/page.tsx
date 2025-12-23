"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "",
      description: "Free for everyone",
      cta: "Get Started",
      ctaLink: "/sign-up",
      ctaVariant: "secondary" as const,
      features: [
        "Basic personality assessment",
        "Limited chat tokens",
        "3 friend invites",
        "Access to SELVE knowledge base",
        "Basic insights and recommendations",
        "Community support",
      ],
      highlighted: false,
    },
    {
      name: "Pro",
      price: billingCycle === "monthly" ? "$9.99" : "$8.33",
      period: "/month",
      billingNote: billingCycle === "annual" ? "Billed annually at $99.99" : "",
      description: "For individuals",
      cta: "Try SELVE Pro",
      ctaLink: "/sign-up?plan=pro",
      ctaVariant: "primary" as const,
      features: [
        "Everything in Free",
        "Unlimited chat messages",
        "Unlimited friend invites",
        "Advanced personality insights",
        "Personalized growth recommendations",
        "Priority support",
        "Export conversation history",
        "Custom personality tracking",
        "Deep dive assessments",
      ],
      highlighted: true,
      comingSoon: true,
    },
    {
      name: "Max",
      price: "From $100",
      period: "/person/month",
      description: "For teams and organizations",
      cta: "Contact Sales",
      ctaLink: "/contact-sales",
      ctaVariant: "secondary" as const,
      features: [
        "Everything in Pro",
        "Team dashboard and analytics",
        "Unlimited team members",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced API access",
        "Custom personality frameworks",
        "Priority onboarding",
        "24/7 enterprise support",
        "Custom data retention policies",
      ],
      highlighted: false,
      comingSoon: true,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Go beyond limits, <br />unlock your potential
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Choose the plan that works best for you. Start free, upgrade when you're ready.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mt-12 mb-16">
          <div className="inline-flex rounded-lg border border-zinc-200 dark:border-zinc-800 p-1 bg-white dark:bg-zinc-900">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === "annual"
                  ? "bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
              }`}
            >
              Annual
              <span className="ml-2 text-xs text-emerald-600 dark:text-emerald-400">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-8 flex flex-col relative ${
                tier.highlighted
                  ? "bg-zinc-900 dark:bg-zinc-50 border-2 border-zinc-900 dark:border-zinc-50 shadow-xl scale-105"
                  : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
              }`}
            >
              {tier.comingSoon && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-zinc-900 px-3 py-1 rounded-full text-xs font-bold">
                  Coming Soon
                </div>
              )}
              
              {tier.highlighted && !tier.comingSoon && (
                <div className="text-xs font-semibold text-zinc-50 dark:text-zinc-900 mb-4 uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${
                  tier.highlighted ? "text-zinc-50 dark:text-zinc-900" : "text-zinc-900 dark:text-zinc-50"
                }`}>
                  {tier.name}
                </h3>
                <div className={`flex items-baseline mb-1 ${
                  tier.highlighted ? "text-zinc-50 dark:text-zinc-900" : "text-zinc-900 dark:text-zinc-50"
                }`}>
                  <span className="text-5xl font-bold">{tier.price}</span>
                  {tier.period && <span className="text-xl ml-1">{tier.period}</span>}
                </div>
                {tier.billingNote && (
                  <p className="text-sm text-zinc-400 dark:text-zinc-600">{tier.billingNote}</p>
                )}
                <p className={`text-sm mt-2 ${
                  tier.highlighted ? "text-zinc-300 dark:text-zinc-700" : "text-zinc-600 dark:text-zinc-400"
                }`}>
                  {tier.description}
                </p>
              </div>

              <Link
                href={tier.ctaLink}
                className={`w-full py-3 px-4 rounded-lg font-medium text-center transition-colors mb-8 ${
                  tier.comingSoon
                    ? "opacity-50 cursor-not-allowed bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                    : tier.ctaVariant === "primary"
                    ? "bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    : tier.highlighted
                    ? "bg-zinc-800 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200"
                    : "bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
                }`}
                onClick={(e) => tier.comingSoon && e.preventDefault()}
              >
                {tier.comingSoon ? "Coming Soon" : tier.cta}
              </Link>

              <div className="flex-1">
                <ul className="space-y-4">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        tier.highlighted ? "text-zinc-50 dark:text-zinc-900" : "text-zinc-900 dark:text-zinc-50"
                      }`} />
                      <span className={`text-sm ${
                        tier.highlighted ? "text-zinc-300 dark:text-zinc-700" : "text-zinc-600 dark:text-zinc-400"
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16 border-t border-zinc-200 dark:border-zinc-800">
        <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-zinc-50 mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Can I switch plans at any time?
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Yes! You can upgrade or downgrade your plan at any time. Changes to your plan will be reflected in your next billing cycle.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              We accept all major credit cards (Visa, Mastercard, American Express) and support payment through Stripe for secure transactions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              Is there a free trial for Pro?
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Yes! Pro plans include a 14-day free trial. You can cancel anytime during the trial period without being charged.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              How does team pricing work?
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Max plans are customized based on your team size and needs. Contact our sales team for a personalized quote and demo.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
              When will Pro and Max plans be available?
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              We're working hard to bring you Pro and Max plans. Join our waitlist to be notified when they launch!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
