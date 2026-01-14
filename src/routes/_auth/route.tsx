import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useToken, useCurrentUser } from "../../store";
import { useEffect } from "react";
import { getAuthProfile } from "./-api";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_PAGINATION } from "@/consts";

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    const { token } = useToken.getState();
    if (token) {
      throw redirect({ to: "/", search: DEFAULT_PAGINATION });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  // const { user: currentUser, setUser } = useCurrentUser();
  // const { data: user } = useQuery({
  //   ...getAuthProfile(),
  //   enabled: !Boolean(currentUser),
  // });
  // console.log("👉 ~ RouteComponent ~ user:", user);
  // useEffect(() => {
  //   if (user) {
  //     setUser(user.data);
  //   }
  // }, [user]);

  return (
    <div className="min-h-svh overflow-hidden flex items-center justify-center p-2">
      <Outlet />
    </div>
  );
}
