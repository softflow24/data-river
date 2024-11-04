import { SectionHeader } from "./section-header";

export function DataCollection() {
  return (
    <section className="space-y-4" id="data-collection">
      <SectionHeader id="data-collection">Data Collection</SectionHeader>

      <div className="space-y-6">
        <div className="space-y-4">
          <h3
            className="text-lg font-semibold"
            id="information-that-you-provide"
          >
            Information That You Provide
          </h3>
          <p className="text-muted-foreground">
            We collect personal information that you submit directly to us. The
            categories of information we collect can include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong>Registration information:</strong> We collect personal
              and/or business information when you register, including your
              name, email address, and GitHub username. This information is used
              to administer your account, provide services, and support.
            </li>
            <li>
              <strong>Communications:</strong> When you communicate with us, we
              may collect your contact information and any details you provide.
              We use this to respond to inquiries and enhance our services.
            </li>
            <li>
              <strong>User Content:</strong> Any content you create, upload, or
              transmit as part of using the Service is stored and collected. You
              maintain full control over the information included in your User
              Content.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3
            className="text-lg font-semibold"
            id="information-from-third-party-sources"
          >
            Information from Third Party Sources
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong>Single Sign-On (SSO):</strong> Through GitHub
              authentication, we access information such as your name, username,
              email address, language preference, and profile picture to operate
              and maintain the Service.
            </li>
            <li>
              <strong>Social Media:</strong> When interacting with our social
              media, we may receive profile information based on your privacy
              settings with the social network.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3
            className="text-lg font-semibold"
            id="other-uses-of-personal-information"
          >
            Other Uses of Personal Information
          </h3>
          <p className="text-muted-foreground">
            We may use your personal information for:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Operating and providing the Service functionality</li>
            <li>Communicating about account-related matters</li>
            <li>Analytics and research purposes</li>
            <li>Enforcing our Terms of Service</li>
            <li>Protecting our business interests</li>
            <li>Complying with legal obligations</li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4">
            Note: While we may use your personal information for these purposes,
            we never use User Content to send you ads, and we never share User
            Content with third parties for marketing purposes unless explicitly
            submitted for that purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
