import React from "react";
import { Header } from "../components/landing-page/header";
import { Hero } from "../components/landing-page/hero";
import { Features } from "../components/landing-page/features";
import { Pricing } from "../components/landing-page/pricing";
import { Footer } from "../components/landing-page/footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
