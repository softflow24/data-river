import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import StorySection from "../components/StorySection";
import FeaturesSection from "../components/FeaturesSection";
import RoadmapSection from "../components/RoadmapSection";
import ContributionSection from "../components/ContributionSection";
import Footer from "../components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "data-river: Visual Programming and Automation Framework" },
    {
      name: "description",
      content:
        "Ride the Flow of Innovation with data-river - The Open-Source Framework for Visual Programming and Automation",
    },
  ];
};

export default function Index() {
  const [stats, setStats] = useState({
    stars: 123,
    contributors: 123,
    nodes: 123,
    workflows: 123,
  });

  return (
    <>
      <main>
        <HeroSection />
        <StorySection stats={stats} />
        <FeaturesSection />
        <RoadmapSection />
        <ContributionSection />
      </main>
      <Footer />
    </>
  );
}

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "assets/images/favicon.svg",
      type: "image/svg+xml",
    },
    {
      rel: "icon",
      href: "assets/images/favicon.png",
      type: "image/png",
    },
  ];
};
