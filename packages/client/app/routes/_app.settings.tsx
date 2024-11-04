import { Outlet } from "@remix-run/react";
import { SettingsSidebar } from "~/components/settings/settings-sidebar";
import { Toaster } from "@data-river/shared/ui/components/ui/sonner";

export default function SettingsLayout() {
  return (
    <div className="container py-8 mx-auto">
      <div className="flex gap-8">
        <aside className="w-64 flex-shrink-0">
          <SettingsSidebar />
        </aside>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
