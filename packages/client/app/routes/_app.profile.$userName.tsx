import { useLoaderData } from "@remix-run/react";
import { type LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { getSession } from "~/utils/session.server";
import { supabase } from "~/utils/supabase.server";
import type { Database } from "~/types/supabase";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@data-river/shared/ui/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@data-river/shared/ui/components/ui/avatar";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { Link } from "@remix-run/react";
import {
  Building2,
  MapPin,
  Globe2,
  Clock,
  Mail,
  Calendar,
  Edit,
  Users,
  GitFork,
  Star,
} from "lucide-react";
import { format } from "date-fns";

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
          <div className="relative">
            <Avatar className="h-64 w-64 mx-auto">
              <AvatarImage src={profile.avatar_url ?? undefined} />
              <AvatarFallback className="text-4xl">
                {profile.display_name?.[0]?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="mt-4 text-center">
              <h1 className="text-2xl font-bold">{profile.display_name}</h1>
              <p className="text-lg text-muted-foreground">
                @{profile.username}
              </p>
            </div>
            {profile.id === currentUserId && (
              <Button asChild variant="outline" className="w-full mt-4">
                <Link to="/settings">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit profile
                </Link>
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {profile.bio && (
              <p className="text-muted-foreground">{profile.bio}</p>
            )}

            <div className="space-y-2">
              {profile.company && (
                <div className="flex items-center text-muted-foreground">
                  <Building2 className="mr-2 h-4 w-4" />
                  <span>{profile.company}</span>
                </div>
              )}
              {(profile.city || profile.country) && (
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>
                    {[profile.city, profile.country].filter(Boolean).join(", ")}
                  </span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center text-muted-foreground">
                  <Globe2 className="mr-2 h-4 w-4" />
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {new URL(profile.website).hostname}
                  </a>
                </div>
              )}
              {profile.timezone && (
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{profile.timezone}</span>
                </div>
              )}
              <div className="flex items-center text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  Joined {format(new Date(profile.created_at), "MMMM yyyy")}
                </span>
              </div>
            </div>
          </div>

          {/* GitHub-style stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-muted-foreground">
                    Flows Created
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">3.2k</div>
                  <div className="text-xs text-muted-foreground">Flow Runs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-xs text-muted-foreground">Templates</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">142</div>
                  <div className="text-xs text-muted-foreground">
                    Contributions
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Activity & Projects */}
        <div className="md:col-span-2 space-y-6">
          {/* Popular Flows */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Popular Flows
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <GitFork className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Data Transformation Flow {i}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Last updated 2 days ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        <span className="text-sm">{42 * i}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-sm">{12 * i}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Star className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Created new flow:</span>{" "}
                        Data Pipeline {i}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(
                          new Date().setDate(new Date().getDate() - i),
                          "PPP",
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
