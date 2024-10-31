import { Link } from "@remix-run/react";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { CookieTable } from "./cookie-table";

export function CookieSection() {
  return (
    <section className="space-y-4" id="cookies-and-similar-technologies">
      <h2 className="text-xl font-semibold">
        Cookies and Similar Technologies
      </h2>
      <div className="space-y-4 text-muted-foreground">
        <p>
          Cookies are pieces of code that we transfer to your computer's hard
          disk for record-keeping purposes. The cookies listed as strictly
          necessary are required for the operation of the Service, such as
          cookies that enable you to log in to secure areas of the Service.
        </p>

        <p>
          We use Analytics cookies to collect information to assess how our
          Service is used. We will only do so, however, only if you give us your
          consent to do so.{" "}
          <Button variant="link" className="p-0 h-auto text-primary" asChild>
            <Link
              to="#"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("toggle-cookie-preferences"),
                )
              }
            >
              Manage preferences
            </Link>
          </Button>
        </p>
      </div>

      <p>We use the following types of cookies:</p>
      <CookieTable />

      <div className="space-y-4 text-muted-foreground">
        <p>
          Most browsers also allow you to change your cookie settings to block
          certain cookies. Depending on your mobile device and operating system,
          you may not be able to delete or block all cookies. Please note that
          if you choose to refuse all cookies you may not be able to use the
          full functionality of our Service. These settings will typically be
          found in the "options" or "preferences" menu of your browser.
        </p>

        <p>
          In order to understand these settings, the following links may be
          helpful, otherwise you should use the "Help" option in your browser
          for more details:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a
              href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cookie settings in Internet Explorer
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cookie settings in Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cookie settings in Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/guide/safari/manage-cookies-sfri11471"
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cookies settings in Safari web and iOS
            </a>
          </li>
        </ul>

        <p>
          If you would like to find out more about cookies and other similar
          technologies, please visit{" "}
          <a
            href="https://allaboutcookies.org"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            allaboutcookies.org
          </a>
          .
        </p>

        <p className="mt-4">
          Please note that deleting or blocking cookies may not be effective for
          all types of tracking technologies, such as Local Storage Objects
          (LSOs) like HTML5.
        </p>
      </div>
    </section>
  );
}
