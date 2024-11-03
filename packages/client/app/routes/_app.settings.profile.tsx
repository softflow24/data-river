import { useLoaderData, useActionData, useNavigate } from "@remix-run/react";
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { getSession } from "~/utils/session.server";
import { supabase } from "~/utils/supabase.server";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@data-river/shared/ui/components/ui/card";
import { profileSchema } from "~/schemas/profile";
import { ProfilePicture } from "~/components/settings/profile-picture";
import { ProfileForm } from "~/components/settings/profile-form";
import { useEffect } from "react";
import { toast } from "sonner";

// Define the action data type
type ActionData = {
  errors?: Record<string, string[]>;
  values?: Record<string, unknown>;
  success?: boolean;
  error?: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);
  const userId = session.get("user_id") as string;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !profile) {
    throw new Error("Failed to load profile");
  }

  return json({ profile });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request);
  if (!session.has("access_token")) {
    return redirect("/sign-in");
  }

  const userId = session.get("user_id") as string;
  const formData = Object.fromEntries(await request.formData());

  const cleanData = {
    display_name: formData.display_name as string,
    username: formData.username as string,
    bio: formData.bio ? String(formData.bio) : null,
    website: formData.website ? String(formData.website) : null,
    company: formData.company ? String(formData.company) : null,
    city: formData.city ? String(formData.city) : null,
    country: formData.country ? String(formData.country) : null,
    timezone: formData.timezone ? String(formData.timezone) : null,
  };

  const result = profileSchema.safeParse(cleanData);

  if (!result.success) {
    return json(
      {
        errors: result.error.flatten().fieldErrors,
        values: formData,
      },
      { status: 400 },
    );
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      ...result.data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) {
    console.error("Supabase error:", error);
    return json(
      {
        errors: { form: ["Failed to update profile"] },
        values: formData,
      },
      { status: 500 },
    );
  }

  return json<ActionData>({ success: true });
}

export default function ProfileSettings() {
  const { profile } = useLoaderData<typeof loader>();
  const actionData = useActionData<ActionData>();
  const navigate = useNavigate();

  // Handle action data changes
  useEffect(() => {
    if (actionData) {
      if (actionData.error) {
        toast.error(actionData.error);
      } else if (actionData.success) {
        toast.success("Profile updated successfully");
        // Optionally refresh the page to show updated data
        navigate(".", { replace: true });
      }
    }
  }, [actionData, navigate]);

  return (
    <div className="grid grid-cols-3 gap-6">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Public Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm
            profile={profile}
            actionData={actionData}
            action="/settings/profile"
          />
        </CardContent>
      </Card>

      <div className="space-y-6">
        <ProfilePicture profile={profile} />
      </div>
    </div>
  );
}
