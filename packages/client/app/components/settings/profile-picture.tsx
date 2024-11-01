import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@data-river/shared/ui/components/ui/card";
import { Button } from "@data-river/shared/ui/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@data-river/shared/ui/components/ui/avatar";
import { Camera } from "lucide-react";
import type { Database } from "~/types/supabase";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface ProfilePictureProps {
  profile: Profile;
}

export function ProfilePicture({ profile }: ProfilePictureProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-40 w-40">
              <AvatarImage src={profile.avatar_url ?? undefined} />
              <AvatarFallback className="text-4xl">
                {profile.display_name?.[0]?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 rounded-full"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center space-y-1.5">
            <p className="text-sm text-muted-foreground">
              Your profile picture will be used on your profile and throughout
              the site.
            </p>
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm">
                Upload New Picture
              </Button>
              {profile.avatar_url && (
                <Button variant="destructive" size="sm">
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
