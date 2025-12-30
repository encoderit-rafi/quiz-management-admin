import { SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppSidebar } from "@/components/base/app-sidebar";
import Navbar from "@/components/base/navbar";
import { useToken } from "@/store";
import { Card } from "@/components/ui/card";
// import { useToken } from "@/store";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  // const navigate = useNavigate();
  const { token } = useToken();
  console.log("👉 ~ RouteComponent ~ token:", token);
  // const { setUser, clearUser } = useCurrentUser();
  // const { initializeCompany, clearActiveCompany } = useActiveCompany();

  // // fetch user profile from API
  // const {
  //   data: user,
  //   isLoading,
  //   isError,
  // } = useUserProfile({
  //   options: { enabled: !!token },
  // });

  // // handle user state changes
  // useEffect(() => {
  //   if (isError) {
  //     // if fetch fails, clear all stores and redirect
  //     setToken(null);
  //     clearUser();
  //     clearActiveCompany();
  //     navigate({ to: "/login", replace: true });
  //     return;
  //   }

  //   if (user) {
  //     setUser(user);
  //     initializeCompany();
  //   }
  // }, [user, isError]);

  // // loading UI
  // if (isLoading) {
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       <Spinner key="bars" variant="bars" />
  //     </div>
  //   );
  // }

  // // guard: nothing to render if no user/token
  // if (!token || !user) return null;

  // main layout
  // if (!Boolean(token)) return navigate({ to: "/login", replace: true });

  return (
    <SidebarProvider>
      <div className="flex h-svh w-full overflow-hidden">
        <div className="max-w-full">
          <AppSidebar />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 flex flex-col overflow-hidden p-4">
            <Card className="flex-1 flex flex-col overflow-hidden shadow-none">
              <Outlet />
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
