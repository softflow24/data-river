import { Button } from "@data-river/shared/ui/components/ui/button";
import { Form, useFetcher } from "@remix-run/react";
import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/node";
import { createClient } from "~/utils/supabase.server";
import { z } from "zod";
import { UsernameInput } from "~/components/welcome/username/username-input";
import { Requirements } from "~/components/welcome/username/requirements";
import { LegalAgreements } from "~/components/welcome/username/legal-agreements";

const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(30, "Username cannot exceed 30 characters")
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    "Username can only contain letters, numbers, underscores, and hyphens",
  );

type ValidationError = {
  error: string;
  isAvailable?: never;
};

type AvailabilityResponse = {
  isAvailable: boolean;
  error?: never;
};

type ActionResponse = ValidationError | AvailabilityResponse;

export const meta: MetaFunction = () => {
  return [{ title: "Data-river | Account Setup" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase } = await createClient(request);
  const { data: user } = await supabase.auth.getUser();

  if (!user || !user.user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.user.id)
    .single();

  if ((profile?.username ?? "") !== "") {
    return redirect("/welcome/interests");
  }

  return null;
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const acceptedTerms = formData.get("terms") === "true";
  const acceptedPrivacy = formData.get("privacy") === "true";

  if (!acceptedTerms || !acceptedPrivacy) {
    return json({ error: "You must accept both agreements to continue" });
  }

  const result = usernameSchema.safeParse(username);
  if (!result.success) {
    return json({ error: result.error.errors[0].message });
  }

  const { supabase, headers } = await createClient(request);

  const { data: client } = await supabase.auth.getUser();
  if (!client.user) {
    return json({ error: "Not authenticated" }, { status: 401 });
  }

  // Get client IP and user agent for audit
  const ip =
    request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip");
  const userAgent = request.headers.get("user-agent");

  // Start a Supabase transaction
  const { error: usernameError } = await supabase
    .from("profiles")
    .update({ username, display_name: username })
    .eq("id", client.user.id);

  if (usernameError) {
    return json({ error: "Failed to update username" });
  }

  // Record legal acceptances
  const { error: legalError } = await supabase
    .from("legal_acceptances")
    .insert([
      {
        user_id: client.user.id,
        document_type: "terms_of_service",
        document_version: "1.0",
        ip_address: ip,
        user_agent: userAgent,
      },
      {
        user_id: client.user.id,
        document_type: "privacy_policy",
        document_version: "1.0",
        ip_address: ip,
        user_agent: userAgent,
      },
    ]);

  if (legalError) {
    return json({ error: "Failed to record legal acceptances" });
  }

  return redirect("/welcome/interests", { headers });
}

export default function UsernameSetup() {
  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastCheckedUsername, setLastCheckedUsername] = useState("");
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
  });
  const fetcher = useFetcher<ActionResponse>();

  const checkUsername = useCallback(
    (value: string) => {
      setError(null);

      const result = usernameSchema.safeParse(value);
      if (!result.success) {
        setError(result.error.errors[0].message);
        setIsAvailable(null);
        return;
      }

      if (value === lastCheckedUsername) {
        return;
      }

      setIsChecking(true);
      setLastCheckedUsername(value);

      // Use the new availability endpoint
      const formData = new FormData();
      formData.append("username", value);
      fetcher.submit(formData, {
        method: "POST",
        action: "/api/username-availability", // New endpoint
      });
    },
    [fetcher, lastCheckedUsername],
  );

  const debouncedCheck = useCallback(debounce(checkUsername, 500), [
    checkUsername,
  ]);

  useEffect(() => {
    if (username) {
      debouncedCheck(username);
    } else {
      setIsAvailable(null);
      setError(null);
      setLastCheckedUsername("");
    }

    return () => {
      debouncedCheck.cancel();
    };
  }, [username, debouncedCheck]);

  useEffect(() => {
    if (fetcher.data) {
      if ("error" in fetcher.data) {
        setError(fetcher.data.error);
        setIsAvailable(null);
      } else {
        setIsAvailable(fetcher.data.isAvailable);
        setError(null);
      }
      setIsChecking(false);
    }
  }, [fetcher.data]);

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (isAvailable !== null || error) {
      setIsAvailable(null);
      setError(null);
    }
  };

  const handleAgreementChange = (
    type: "terms" | "privacy",
    checked: boolean,
  ) => {
    setAgreements((prev) => ({
      ...prev,
      [type]: checked,
    }));
  };

  const canSubmit =
    isAvailable &&
    !isChecking &&
    !error &&
    agreements.terms &&
    agreements.privacy;

  return (
    <div className="space-y-8 max-w-md mx-auto md:mx-0">
      <div>
        <h1 className="text-2xl font-bold">Account Setup</h1>
        <p className="text-muted-foreground">
          Choose your username and review our terms.
        </p>
      </div>

      <Form method="post" className="space-y-8">
        <div className="space-y-6">
          <UsernameInput
            username={username}
            isChecking={isChecking}
            isAvailable={isAvailable}
            error={error}
            onChange={handleUsernameChange}
          />

          <Requirements username={username} isAvailable={isAvailable} />
        </div>

        <LegalAgreements
          agreements={agreements}
          onAgreementChange={handleAgreementChange}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={!canSubmit}>
            Continue
          </Button>
        </div>

        <input type="hidden" name="terms" value={agreements.terms.toString()} />
        <input
          type="hidden"
          name="privacy"
          value={agreements.privacy.toString()}
        />
      </Form>
    </div>
  );
}
