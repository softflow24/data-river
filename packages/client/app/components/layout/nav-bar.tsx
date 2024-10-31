import { Button } from "@data-river/shared/ui";
import { FileText } from "lucide-react";
import Logo from "~/components/auth/logo";

export const NavBar = () => {
  return (
    <div className="fixed left-4 right-4 top-4 flex items-center justify-between">
      <Logo />
      <Button variant="outline" asChild className="hidden lg:flex">
        <a
          href="https://docs.data-river.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <FileText className="h-4 w-4" />
          Documentation
        </a>
      </Button>
    </div>
  );
};
