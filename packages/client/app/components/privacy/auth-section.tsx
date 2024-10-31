export function AuthSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">
        Authentication & Third-Party Services
      </h2>
      <p>
        We use the following third-party services to provide authentication and
        data storage:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Supabase:</strong> We use Supabase for authentication and data
          storage. When you create an account or log in, your information is
          processed and stored according to{" "}
          <a
            href="https://supabase.com/privacy"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Supabase's Privacy Policy
          </a>
          .
        </li>
        <li>
          <strong>GitHub Authentication:</strong> If you choose to sign in with
          GitHub, we receive basic profile information from your GitHub account.
          This is processed according to{" "}
          <a
            href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub's Privacy Statement
          </a>
          .
        </li>
      </ul>
      <p className="text-sm text-muted-foreground mt-2">
        Note: When using third-party authentication, we only store necessary
        information such as your user ID, email, and basic profile details
        required for the application to function.
      </p>
    </section>
  );
}
