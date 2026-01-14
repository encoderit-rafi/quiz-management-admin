import { SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Navbar from "@/components/base/navbar";
import { useCurrentUser, useToken } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { getAuthProfile } from "../_auth/-api";
import { useEffect } from "react";

export const Route = createFileRoute("/_app")({
  beforeLoad: () => {
    const { token } = useToken.getState();
    if (!token) {
      throw redirect({ to: "/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { setUser } = useCurrentUser();
  const { data: user } = useQuery(getAuthProfile());
  console.log("👉 ~ RouteComponent ~ user:", user);
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);
  return (
    <SidebarProvider>
      <div className="flex h-svh w-full overflow-hidden">
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 flex flex-col overflow-hidden py-4">
            <div className="flex-1 flex flex-col overflow-hidden shadow-none">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
