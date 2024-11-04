import { Link } from "@remix-run/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@data-river/shared/ui/components/ui/avatar";
import { Button } from "@data-river/shared/ui/components/ui/button";
import { Building2, MapPin, Globe2, Clock, Calendar, Edit } from "lucide-react";
import { format } from "date-fns";
import type { Database } from "~/types/supabase";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface ProfileHeaderProps {
  profile: Profile;
  currentUserId: string;
}

export function ProfileHeader({ profile, currentUserId }: ProfileHeaderProps) {
  return (
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
          <p className="text-lg text-muted-foreground">@{profile.username}</p>
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
        {profile.bio && <p className="text-muted-foreground">{profile.bio}</p>}

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
    </div>
  );
}
