import { useLoaderData } from "@remix-run/react";
import { type LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { getSession } from "~/utils/session.server";
import { supabase } from "~/utils/supabase.server";
import type { Database } from "~/types/supabase";
import { ProfileHeader } from "~/components/profile/profile-header";
import { AchievementsCard } from "~/components/profile/achievements-card";
import { PopularFlows } from "~/components/profile/popular-flows";
import { RecentActivity } from "~/components/profile/recent-activity";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export async function loader({ request, params }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const currentUserId = session.get("user_id") as string;

  if (!params.userName) {
    return redirect("/profile");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.userName)
    .single();

  if (error || !profile) {
    throw new Error("Profile not found");
  }

  return json({ profile, currentUserId });
}

export default function ProfilePage() {
  const { profile, currentUserId } = useLoaderData<typeof loader>();

  return (
    <div className="container py-8 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="space-y-4">
          <ProfileHeader profile={profile} currentUserId={currentUserId} />
          <AchievementsCard />
        </div>

        {/* Right Column - Activity & Projects */}
        <div className="md:col-span-2 space-y-6">
          <PopularFlows />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
