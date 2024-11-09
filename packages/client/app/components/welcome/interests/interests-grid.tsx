import { InterestCard } from "./interest-card";
import type { Interest } from "~/types/interests";

interface InterestsGridProps {
  interests: Interest[];
  selectedInterests: string[];
  onInterestToggle: (id: string) => void;
}

export function InterestsGrid({
  interests,
  selectedInterests,
  onInterestToggle,
}: InterestsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {interests.map((interest) => (
        <InterestCard
          key={interest.id}
          {...interest}
          isSelected={selectedInterests.includes(interest.id)}
          onToggle={onInterestToggle}
        />
      ))}
    </div>
  );
}
