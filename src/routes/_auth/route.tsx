// import { useToken } from "@/store";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});
function RouteComponent() {
  // const { token } = useToken();
  // const navigate = useNavigate();
  // if (Boolean(token)) return navigate({ to: "/", replace: true });

  return (
    <div className="min-h-svh overflow-hidden flex items-center justify-center p-2">
      <Outlet />
    </div>
  );
}
