import { SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
// import { AppSidebar } from "@/components/base/app-sidebar";
import Navbar from "@/components/base/navbar";
import { useToken } from "@/store";
// import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  const { token } = useToken();
  console.log("👉 ~ RouteComponent ~ token:", token);

  return (
    <SidebarProvider>
      <div className="flex h-svh w-full overflow-hidden">
        {/* <div className="max-w-full">
          <AppSidebar />
        </div> */}
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
