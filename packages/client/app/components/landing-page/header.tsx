import { Link } from "@remix-run/react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" to="/">
            <span className="hidden font-bold sm:inline-block">data-river</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              to="#product"
            >
              Product overview
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center transition-colors hover:text-foreground/80 text-foreground/60">
                Use cases <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>For Developers</DropdownMenuItem>
                <DropdownMenuItem>For Business</DropdownMenuItem>
                <DropdownMenuItem>For Kids</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              to="https://docs.data-river.dev"
            >
              Documentation
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              to="#pricing"
            >
              Pricing
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center transition-colors hover:text-foreground/80 text-foreground/60">
                Community <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="https://data-river.dev">How to contribute</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="https://discord.gg/data-river">Discord</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
