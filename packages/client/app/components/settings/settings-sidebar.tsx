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
        disabled: true,
      },
      {
        title: "Security",
        href: "/settings/security",
        icon: Shield,
        disabled: true,
      },
      {
        title: "Authentication",
        href: "/settings/auth",
        icon: Key,
        disabled: true,
      },
      {
        title: "Notifications",
        href: "/settings/notifications",
        icon: Bell,
        disabled: true,
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
        disabled: true,
      },
      {
        title: "Database",
        href: "/settings/database",
        icon: Database,
        disabled: true,
      },
      {
        title: "Developer Tools",
        href: "/settings/developer",
        icon: Code,
        disabled: true,
      },
      {
        title: "Environment Variables",
        href: "/settings/environment-variables",
        icon: Code,
        disabled: false,
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
            {group.items.map(
              (item) =>
                (!item.disabled && (
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
                        item.disabled ? "cursor-not-allowed opacity-50" : "",
                      )
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </NavLink>
                )) || (
                  <span
                    key={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium cursor-not-allowed opacity-50 text-muted-foreground",
                    )}
                  >
                    {item.title}
                  </span>
                ),
            )}
          </div>
        </div>
      ))}
    </nav>
  );
}
