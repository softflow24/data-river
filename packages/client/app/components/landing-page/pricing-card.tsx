import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface PricingFeature {
  name: string;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  period?: string;
  features: PricingFeature[];
  buttonText?: string;
}

export function PricingCard({
  title,
  description,
  price,
  period = "per month",
  features,
  buttonText = "Choose Plan",
}: PricingCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">
          {price === 0 ? "Free" : `€${price}`}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {price === 0 ? "forever" : period}
        </p>
        <ul className="mt-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index}>{feature.name}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">{buttonText}</Button>
      </CardFooter>
    </Card>
  );
}
