import { Outlet } from "@remix-run/react";

export default function WorkflowsLayout() {
  return (
    <div className="h-full flex flex-col container mx-auto">
      <Outlet />
    </div>
  );
}
