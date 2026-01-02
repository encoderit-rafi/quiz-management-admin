import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});
function RouteComponent() {
  return (
    <div className="min-h-svh overflow-hidden flex items-center justify-center p-2">
      <Outlet />
    </div>
  );
}
