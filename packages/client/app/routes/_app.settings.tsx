import { useLoaderData } from "@remix-run/react";
import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { getSession } from "~/utils/session.server";
import { supabase } from "~/utils/supabase.server";
import type { Database } from "~/types/supabase";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@data-river/shared/ui/components/ui/card";
import { Label } from "@data-river/shared/ui/components/ui/label";
import { Input } from "@data-river/shared/ui/components/ui/input";
import { Textarea } from "@data-river/shared/ui/components/ui/textarea";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { Form, useActionData } from "@remix-run/react";
import { profileSchema } from "~/schemas/profile";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

type ActionData =
  | {
      success: true;
      errors: null;
    }
  | {
      success?: never;
      errors: {
        form?: string[];
        display_name?: string[];
        username?: string[];
        bio?: string[];
        avatar_url?: string[];
        website?: string[];
        company?: string[];
        location?: string[];
        city?: string[];
        country?: string[];
        timezone?: string[];
      };
      values: Record<string, unknown>;
    };

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
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
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("access_token")) {
    return redirect("/sign-in");
  }

  const userId = session.get("user_id") as string;
  const formData = Object.fromEntries(await request.formData());

  const result = profileSchema.safeParse({
    display_name: formData.display_name || null,
    username: formData.username || null,
    bio: formData.bio || null,
    avatar_url: formData.avatar_url || null,
    website: formData.website || null,
    company: formData.company || null,
    location: formData.location || null,
    city: formData.city || null,
    country: formData.country || null,
    timezone: formData.timezone || null,
  });

  if (!result.success) {
    return json<ActionData>(
      {
        errors: result.error.flatten().fieldErrors,
        values: formData,
      },
      { status: 400 },
    );
  }

  const { error } = await supabase
    .from("profiles")
    .update(result.data)
    .eq("id", userId);

  if (error) {
    return json<ActionData>(
      {
        errors: { form: ["Failed to update profile"] },
        values: formData,
      },
      { status: 500 },
    );
  }

  return json<ActionData>({ success: true, errors: null });
}

export default function SettingsPage() {
  const { profile } = useLoaderData<typeof loader>();
  const actionData = useActionData<ActionData>();

  return (
    <div className="container py-8 mx-auto">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="display_name">Display Name</Label>
                  <Input
                    id="display_name"
                    name="display_name"
                    defaultValue={profile.display_name ?? ""}
                  />
                  {actionData?.errors?.display_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {actionData.errors.display_name.join(", ")}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    defaultValue={profile.username ?? ""}
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    defaultValue={profile.bio ?? ""}
                  />
                </div>

                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    defaultValue={profile.company ?? ""}
                  />
                </div>

                <div>
                  <Label htmlFor="job_title">Job Title</Label>
                  <Input
                    id="job_title"
                    name="job_title"
                    defaultValue={profile.job_title ?? ""}
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    defaultValue={profile.website ?? ""}
                  />
                </div>

                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    defaultValue={profile.city ?? ""}
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    defaultValue={profile.country ?? ""}
                  />
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    name="timezone"
                    defaultValue={profile.timezone ?? ""}
                  />
                </div>
              </div>

              <Button type="submit">Save Changes</Button>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
