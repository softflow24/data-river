import React, { useState, useEffect } from "react";
import { Link, useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "~/hooks/use-toast";

interface FetcherData {
  message?: string;
  error?: string;
  status?: "active" | "unsubscribed" | "bounced" | "complained";
}

const quickLinks = [
  {
    label: "Documentation",
    url: "https://docs.data-river.dev/",
  },
  {
    label: "GitHub",
    url: "https://github.com/softflow24/data-river",
  },
  {
    label: "Discord",
    url: "https://discord.com/invite/CmEqvZQUQn",
  },
];

export default function Footer(): React.ReactElement {
  const [email, setEmail] = useState("");
  const fetcher = useFetcher<FetcherData>();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      return;
    }

    fetcher.submit(
      { email },
      { method: "post", action: "/api/email-subscription" },
    );
  };

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.message) {
        toast({
          title: "Success",
          description: fetcher.data.message,
        });
        setEmail("");
      } else if (fetcher.data.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: fetcher.data.error,
        });
      }
    }
  }, [fetcher.data, toast]);

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
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.url}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-2">Stay Connected</h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for updates and news.
            </p>
            <fetcher.Form className="mt-4" onSubmit={handleSubmit}>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={fetcher.state !== "idle"}
              >
                {fetcher.state !== "idle" ? "Subscribing..." : "Subscribe"}
              </Button>
            </fetcher.Form>
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
