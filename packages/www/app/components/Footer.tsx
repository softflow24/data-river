import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-background text-secondary-foreground py-20 relative pt-40">
      <div className="container mx-auto px-4 m-auto relative z-10">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">data-river</h3>
            <p className="text-muted-foreground">
              Empowering visual programming and automation for everyone.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Quick Links</h3>
            <ul>
              <li>
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  Discord
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-2">Stay Connected</h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for updates and news.
            </p>
            <form className="mt-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full mb-2"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} data-river. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
