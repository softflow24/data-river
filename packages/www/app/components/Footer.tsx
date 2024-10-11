// app/components/Footer.tsx
import React, { useState, useEffect } from "react";
import { Link, useFetcher } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "~/hooks/use-toast";

interface QuickLink {
  label: string;
  url: string;
}

const quickLinks: QuickLink[] = [
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
  const [email, setEmail] = useState<string>("");
  const fetcher = useFetcher();
  const { toast } = useToast();

  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    action: "subscribe" | "unsubscribe",
  ) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      return;
    }

    fetcher.submit(
      { email, action },
      { method: "post", action: "/api/email-subscription" },
    );
  };

  useEffect(() => {
    if (fetcher.data) {
      if ("message" in fetcher.data) {
        toast({
          title: "Success",
          description: fetcher.data.message,
        });
        setEmail("");
      } else if ("error" in fetcher.data) {
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
            <fetcher.Form
              className="mt-4"
              onSubmit={(e) => handleSubmit(e, "subscribe")}
            >
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full mb-2"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <Button type="submit" className="w-full mb-2">
                Subscribe
              </Button>
              {/*<Button*/}
              {/*  type="button"*/}
              {/*  className="w-full"*/}
              {/*  onClick={(e) => {*/}
              {/*    e.preventDefault();*/}
              {/*    handleSubmit(*/}
              {/*      e as unknown as React.FormEvent<HTMLFormElement>,*/}
              {/*      "unsubscribe",*/}
              {/*    );*/}
              {/*  }}*/}
              {/*>*/}
              {/*  Unsubscribe*/}
              {/*</Button>*/}
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
