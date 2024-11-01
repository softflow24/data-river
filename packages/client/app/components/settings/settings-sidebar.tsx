import { NavLink } from "@remix-run/react";
import { cn } from "@data-river/shared/ui";
import {
  User,
  Key,
  Bell,
  Settings,
  Shield,
  Database,
  Code,
} from "lucide-react";

const navigation = [
  {
    title: "User Settings",
    items: [
      {
        title: "Public Profile",
        href: "/settings/profile",
        icon: User,
      },
      {
        title: "Account",
        href: "/settings/account",
        icon: Settings,
      },
      {
        title: "Security",
        href: "/settings/security",
        icon: Shield,
      },
      {
        title: "Authentication",
        href: "/settings/auth",
        icon: Key,
      },
      {
        title: "Notifications",
        href: "/settings/notifications",
        icon: Bell,
      },
    ],
  },
  {
    title: "Developer Settings",
    items: [
      {
        title: "API Keys",
        href: "/settings/api-keys",
        icon: Key,
      },
      {
        title: "Database",
        href: "/settings/database",
        icon: Database,
      },
      {
        title: "Developer Tools",
        href: "/settings/developer",
        icon: Code,
      },
    ],
  },
];

export function SettingsSidebar() {
  return (
    <nav className="space-y-6">
      {navigation.map((group) => (
        <div key={group.title}>
          <h3 className="mb-2 px-2 text-sm font-semibold text-muted-foreground">
            {group.title}
          </h3>
          <div className="space-y-1">
            {group.items.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium",
                    "hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground",
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
