import { Form } from "@remix-run/react";
import { LogOut, Settings, User } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@data-river/shared/ui/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@data-river/shared/ui/components/ui/dropdown-menu";
import type { Database } from "~/types/supabase";

type UserMenuProps = {
  profile: Pick<
    Database["public"]["Tables"]["profiles"]["Row"],
    "id" | "display_name" | "avatar_url" | "username"
  >;
};

export function UserMenu({ profile }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={profile.avatar_url ?? undefined} />
          <AvatarFallback>
            {profile.display_name?.[0]?.toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">
          {profile.display_name ?? "Anonymous"}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href={`/profile/${profile.username}`}>
            <User className="mr-2 h-4 w-4" />
            Profile
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/settings/profile">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Form method="POST" action="/logout">
            <button type="submit" className="flex items-center w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </button>
          </Form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
