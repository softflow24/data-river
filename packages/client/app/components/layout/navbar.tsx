import Logo from "~/components/auth/logo";
import { UserMenu } from "./user-menu";
import type { Database } from "~/types/supabase";

type NavbarProps = {
  profile: Pick<
    Database["public"]["Tables"]["profiles"]["Row"],
    "id" | "display_name" | "avatar_url" | "username"
  >;
};

export function Navbar({ profile }: NavbarProps) {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <Logo />
        <div className="ml-auto flex items-center space-x-4">
          <UserMenu profile={profile} />
        </div>
      </div>
    </nav>
  );
}
