import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@data-river/shared/ui/components/ui/collapsible";
import { cn } from "@data-river/shared/ui/utils";

interface FilterSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function FilterSection({
  title,
  defaultOpen = false,
  children,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border/50 last:border-none">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-4 text-sm font-medium">
          {title}
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              {
                "transform rotate-180": isOpen,
              },
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pb-4">{children}</CollapsibleContent>
      </Collapsible>
    </div>
  );
}
