import { Outlet, createRootRoute } from "@tanstack/react-router";
import "@/utils/i18n";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
