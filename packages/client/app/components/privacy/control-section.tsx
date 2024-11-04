import { SectionHeader } from "./section-header";

export function ControlSection() {
  return (
    <section className="space-y-4" id="control-over-information">
      <SectionHeader id="control-over-information">
        Control Over Your Information
      </SectionHeader>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold" id="email-communications">
            Email Communications
          </h3>
          <p className="text-muted-foreground">
            We may send you emails about service updates, account notifications,
            and system changes. These service-related communications are part of
            your Data River account and cannot be opted out of. We do not send
            marketing or promotional emails.
          </p>
        </div>

        <div className="space-y-4">
          <h3
            className="text-lg font-semibold"
            id="modifying-account-information"
          >
            Modifying Account Information
          </h3>
          <p className="text-muted-foreground">
            You can modify your account information through your profile
            settings in Data River. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Display name and username</li>
            <li>Profile picture</li>
            <li>Email preferences</li>
            <li>Interface preferences (theme, language)</li>
          </ul>
          <p className="text-muted-foreground">
            For data that isn't directly accessible through your account
            settings, you can contact us at support@data-river.com. We'll
            respond to your request within 30 days, though we may need
            additional information to verify your identity.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold" id="tracking-technologies">
            How We Use Tracking Technologies
          </h3>
          <p className="text-muted-foreground">
            We use tracking technologies primarily for essential service
            functionality and user preferences. We collect:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong>Device Information:</strong> Browser type, operating
              system, and unique device identifiers for service optimization
            </li>
            <li>
              <strong>Usage Information:</strong> How you interact with our
              service, including accessed pages and feature usage
            </li>
            <li>
              <strong>Performance Data:</strong> Technical metrics to ensure
              service reliability and performance
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            We use this information to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Maintain your authenticated session</li>
            <li>Remember your preferences</li>
            <li>Improve service performance</li>
            <li>Fix technical issues</li>
            <li>Enhance security</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            Note: We do not use tracking for advertising purposes or share your
            usage data with third parties for marketing.
          </p>
        </div>
      </div>
    </section>
  );
}
