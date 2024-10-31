export function DataCollection() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">What We Collect</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Essential Cookies:</strong> Required for basic site
          functionality and security.
        </li>
        <li>
          <strong>Authentication Data:</strong> Email, user ID, and profile
          information provided through Supabase or GitHub authentication.
        </li>
        <li>
          <strong>Profile Information:</strong> Display name, username, and
          avatar that you choose to provide.
        </li>
        <li>
          <strong>Analytics Cookies:</strong> Help us understand how visitors
          interact with our website.
        </li>
        <li>
          <strong>Preference Cookies:</strong> Remember your settings and
          preferences.
        </li>
      </ul>
    </section>
  );
}
