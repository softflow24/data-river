import { LinksFunction, MetaFunction } from "@remix-run/node";
import HeroSection from "../components/HeroSection";
import StorySection from "../components/StorySection";
import FeaturesSection from "../components/FeaturesSection";
import RoadmapSection from "../components/RoadmapSection";
import ContributionSection from "../components/ContributionSection";
import Footer from "../components/Footer";
import { LRUCache } from "lru-cache";
import { useLoaderData } from "@remix-run/react";

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

const cache = new LRUCache<
  string,
  { stars: number; contributors: number; blocks: number; workflows: number }
>({
  max: 100,
  ttl: 1000 * 60 * 15, // Cache expiration time: 15 minutes
});

export const loader = async () => {
  const repoUrl = "https://api.github.com/repos/softflow24/data-river";
  const cacheKey = "storySectionStats";
  try {
    const cachedStats = cache.get(cacheKey);
    if (cachedStats) {
      return cachedStats;
    }
    const [repoData, contributorsData] = await Promise.all([
      fetch(repoUrl).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch repo data");
        return res.json();
      }),
      fetch(repoUrl + "/contributors").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contributors data");
        return res.json();
      }),
    ]);

    const result = {
      stars: Number(repoData.stargazers_count) ?? 0,
      contributors: Number(contributorsData.length) ?? 0,
      blocks: 5,
      workflows: 0.4, // this is rounded to 0 in number-ticker, but if you put directly 0, nothing will be displayed
    };
    cache.set(cacheKey, result);
    return result;
  } catch (err: any) {
    console.error(
      err.message || "Something went wrong while fetching GitHub stats",
    );
    return {
      stars: 0,
      contributors: 0,
      blocks: 5,
      workflows: 0.4, // this is rounded to 0 in number-ticker, but if you put directly 0, nothing will be displayed
    };
  }
};

export default function Index() {
  const stats = useLoaderData<typeof loader>();

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
