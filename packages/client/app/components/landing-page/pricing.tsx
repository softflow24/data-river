import React from "react";
import { Link } from "@remix-run/react";
import { PricingCard } from "./pricing-card";

const pricingPlans = [
  {
    title: "Starter",
    description: "For individuals and small teams",
    price: {
      monthly: "20",
      yearly: "192",
    },
    features: [
      { name: "5 Active Workflows" },
      { name: "2,500 Workflow Executions" },
      { name: "1 Shared Projects" },
      { name: "Forum support" },
      { name: "Hosting: Hosted by data-river" },
      { name: "Global Variables" },
      { name: "Debug in Editor" },
      { name: "Workflow Marketplace" },
      { name: "Custom Blocks Builder" },
    ],
  },
  {
    title: "Pro",
    description: "For power users and businesses",
    price: {
      monthly: "50",
      yearly: "480",
    },
    features: [
      { name: "10 Active Workflows" },
      { name: "6000 Workflow Executions" },
      { name: "10 Shared Projects" },
      { name: "Priority Support via email" },
      { name: "Hosting: Hosted by data-river" },
      { name: "Global Variables" },
      { name: "Debug in Editor" },
      { name: "Workflow Marketplace" },
      { name: "Custom Blocks Builder" },
    ],
  },
  {
    title: "Kids Playground",
    description: "For young creators and learners",
    price: {
      monthly: "10",
      yearly: "96",
    },
    features: [
      { name: "5 Active Workflows" },
      { name: "2,500 Workflow Executions" },
      { name: "1 Shared Project" },
      { name: "Forum support" },
      { name: "Hosting: Hosted by data-river" },
      { name: "Global Variables" },
      { name: "Debug in Editor" },
      { name: "Workflow Marketplace" },
      { name: "Custom Blocks Builder" },
    ],
  },
];

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = React.useState<
    "monthly" | "yearly"
  >("monthly");

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
          Pricing Plans
        </h2>
        <div className="flex justify-center mt-8 mb-8">
          <div className="flex items-center space-x-4 bg-muted p-1 rounded-lg">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 rounded-md ${
                billingPeriod === "monthly"
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/60"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-4 py-2 rounded-md ${
                billingPeriod === "yearly"
                  ? "bg-background shadow-sm"
                  : "hover:bg-background/60"
              }`}
            >
              Yearly (20% off)
            </button>
          </div>
        </div>
        <div className="grid mx-auto gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.title}
              {...plan}
              price={plan.price[billingPeriod]}
              period={billingPeriod === "monthly" ? "per month" : "per year"}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="#"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            View Community plan details
          </Link>
        </div>
      </div>
    </section>
  );
}
