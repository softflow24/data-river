import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@data-river/shared/ui/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@data-river/shared/ui/components/ui/sheet";
import { WelcomeSidebar } from "./sidebar";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTitle className="hidden">Welcome Setup</SheetTitle>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 sm:w-96 pr-0">
        <WelcomeSidebar className="mt-8" />
      </SheetContent>
    </Sheet>
  );
}
