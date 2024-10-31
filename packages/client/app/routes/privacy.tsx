import { Link } from "@remix-run/react";
import { Button } from "@data-river/shared/ui/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@data-river/shared/ui/components/ui/card";
import { CookieSection } from "~/components/privacy/cookie-section";
import { AuthSection } from "~/components/privacy/auth-section";
import { DataCollection } from "~/components/privacy/data-collection";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    lastUpdated: "2024-10-31",
  });
}

export default function PrivacyPolicy() {
  const { lastUpdated } = useLoaderData<typeof loader>();
  const { locale } = useOutletContext<{ locale: string }>();

  // Use a stable date format that won't change between server and client
  const formattedDate = new Date(lastUpdated).toISOString().split("T")[0];

  return (
    <div className="container mx-auto py-8 px-4 max-w-10xl">
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Privacy Policy</CardTitle>
          <p className="text-sm text-muted-foreground">
            Last updated: {formattedDate}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Table of Contents */}
          <nav className="space-y-2">
            <h2 className="text-xl font-semibold">Contents</h2>
            <ul className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>
                <a href="#introduction" className="hover:underline">
                  Introduction
                </a>
              </li>
              <li>
                <a href="#data-collection" className="hover:underline">
                  Data Collection
                </a>
              </li>
              <li>
                <a href="#authentication-services" className="hover:underline">
                  Authentication & Third-Party Services
                </a>
              </li>
              <li>
                <a
                  href="#cookies-and-similar-technologies"
                  className="hover:underline"
                >
                  Cookies and Similar Technologies
                </a>
              </li>
              <li>
                <a href="#data-storage" className="hover:underline">
                  Data Storage
                </a>
              </li>
              <li>
                <a href="#your-rights" className="hover:underline">
                  Your Rights
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          <section id="introduction" className="space-y-4">
            <h2 className="text-xl font-semibold">Introduction</h2>
            <p className="text-muted-foreground">
              This Privacy Policy explains how we collect, use, and protect your
              personal information when you use our service.
            </p>
          </section>

          <section id="data-collection">
            <DataCollection />
          </section>

          <section id="authentication-services">
            <AuthSection />
          </section>

          <CookieSection />

          <section id="data-storage" className="space-y-4">
            <h2 className="text-xl font-semibold">Data Storage</h2>
            <p>
              Your data is stored securely in Supabase's infrastructure. We
              implement appropriate security measures to protect your personal
              information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encrypted data transmission</li>
              <li>Secure authentication mechanisms</li>
              <li>Regular security updates and monitoring</li>
              <li>
                Limited access to personal data by authorized personnel only
              </li>
            </ul>
          </section>

          <section id="your-rights" className="space-y-4">
            <h2 className="text-xl font-semibold">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct your personal data</li>
              <li>Delete your account and associated data</li>
              <li>Object to processing of your personal data</li>
              <li>Export your personal data</li>
              <li>Revoke third-party authentication permissions</li>
            </ul>
          </section>

          <section id="contact" className="space-y-4">
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p>
              If you have any questions about our Privacy Policy or how we
              handle your data, please contact us:
            </p>
            <ul className="list-disc pl-6">
              <li>Email: privacy@example.com</li>
              <li>Address: 123 Privacy Street, Data City, 12345</li>
            </ul>
          </section>

          <div className="pt-6">
            <Button asChild variant="outline">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
