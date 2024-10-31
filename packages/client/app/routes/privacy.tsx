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
import { SectionHeader } from "~/components/privacy/section-header";
import { TableOfContents } from "~/components/privacy/table-of-contents";
import { ControlSection } from "~/components/privacy/control-section";

export default function PrivacyPolicy() {
  const lastUpdated = "2024-10-31";
  const { locale } = useOutletContext<{ locale: string }>();

  const formattedDate = new Date(lastUpdated).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const sections = [
    { id: "introduction", title: "Introduction" },
    {
      id: "data-collection",
      title: "Data Collection",
    },
    {
      id: "authentication-services",
      title: "Authentication & Third-Party Services",
    },
    {
      id: "cookies-and-similar-technologies",
      title: "Cookies and Similar Technologies",
    },
    { id: "data-storage", title: "Data Storage" },
    { id: "your-rights", title: "Your Rights" },
    { id: "contact", title: "Contact Us" },
    {
      id: "control-over-information",
      title: "Control Over Your Information",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-8xl">
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Privacy Policy</CardTitle>
          <p className="text-sm text-muted-foreground">
            Last updated: {formattedDate}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <TableOfContents sections={sections} />

          <section id="introduction" className="space-y-4">
            <SectionHeader id="introduction">Introduction</SectionHeader>
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

          <ControlSection />

          <section id="data-storage" className="space-y-4">
            <SectionHeader id="data-storage">Data Storage</SectionHeader>
            <p className="text-muted-foreground">
              Your data is stored securely in data-river's infrastructure. We
              implement appropriate security measures to protect your personal
              information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Encrypted data transmission</li>
              <li>Secure authentication mechanisms</li>
              <li>Regular security updates and monitoring</li>
              <li>
                Limited access to personal data by authorized personnel only
              </li>
            </ul>
          </section>

          <section id="your-rights" className="space-y-4">
            <SectionHeader id="your-rights">Your Rights</SectionHeader>
            <p className="text-muted-foreground">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Access your personal data</li>
              <li>Correct your personal data</li>
              <li>Delete your account and associated data</li>
              <li>Object to processing of your personal data</li>
              <li>Export your personal data</li>
              <li>Revoke third-party authentication permissions</li>
            </ul>
          </section>

          <CookieSection />

          <section id="contact" className="space-y-4">
            <SectionHeader id="contact">Contact Us</SectionHeader>
            <p className="text-muted-foreground">
              If you have any questions about our Privacy Policy or how we
              handle your data, please contact us:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground">
              <li>Email: privacy@example.com</li>
              <li>Address: 123 Privacy Street, Data City, 12345</li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
