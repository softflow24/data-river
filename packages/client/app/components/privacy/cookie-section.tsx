import { SectionHeader } from "./section-header";
import { CookieTable } from "./cookie-table";

export function CookieSection() {
  return (
    <section className="space-y-4" id="cookies-and-similar-technologies">
      <SectionHeader id="cookies-and-similar-technologies">
        Cookies and Similar Technologies
      </SectionHeader>
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
          consent to do so.
        </p>
      </div>

      <p>We use the following types of cookies:</p>
      <CookieTable />
    </section>
  );
}
