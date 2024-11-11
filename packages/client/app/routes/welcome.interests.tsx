import { Button } from "@data-river/shared/ui/components/ui/button";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { createClient } from "~/utils/supabase.server";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { InterestsGrid } from "~/components/welcome/interests/interests-grid";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase } = await createClient(request);

  const { data: interests, error } = await supabase
    .from("interests")
    .select("*")
    .order("name");

  if (error) throw error;

  return json({ interests });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const interestIds = formData.getAll("interests") as string[];

  const { supabase } = await createClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return json({ error: "Not authenticated" }, { status: 401 });
  }

  // Delete existing interests and insert new ones
  const { error: deleteError } = await supabase
    .from("user_interests")
    .delete()
    .eq("user_id", user.id);

  if (deleteError) throw deleteError;

  if (interestIds.length > 0) {
    const { error: insertError } = await supabase.from("user_interests").insert(
      interestIds.map((interestId) => ({
        user_id: user.id,
        interest_id: interestId,
      })),
    );

    if (insertError) throw insertError;
  }

  return redirect("/");
}

export default function InterestsSetup() {
  const { interests } = useLoaderData<typeof loader>();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInterestToggle = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Select Your Interests
        </h1>
        <p className="text-muted-foreground text-lg">
          Choose topics that interest you to personalize your experience.
        </p>
      </div>

      <Form method="post" className="space-y-6">
        <InterestsGrid
          interests={interests}
          selectedInterests={selectedInterests}
          onInterestToggle={handleInterestToggle}
        />

        <div className="flex justify-end pt-4">
          <Button variant="outline" size="lg" className="px-8 mr-4">
            Skip
          </Button>
          <Button type="submit" size="lg" className="px-8">
            Continue
          </Button>
        </div>
      </Form>
    </div>
  );
}
