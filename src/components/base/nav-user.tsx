// import { useState } from "react";
// import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Spinner } from "@/components/ui/spinner";

// import {  useToken } from "@/store";
// // import { useAuth } from "@/store/use-token";
// // import { useActiveCompany } from "@/store/use-active-company.store"; // your active company store
// // import { toast } from "sonner";
// import { useNavigate } from "@tanstack/react-router";
// import { Button } from "../ui/button";

export function NavUser() {
  // const navigate = useNavigate();
  // // const { user, clearUser } = useCurrentUser();
  // // const { clearActiveCompany } = useActiveCompany();
  // const { setToken } = useToken();

  // const [isDialogOpen, setDialogOpen] = useState(false);
  // const [isLoggingOut, setIsLoggingOut] = useState(false);

  // // ✅ Enhanced logout handler
  // const handleLogout = async () => {
  //   setIsLoggingOut(true);
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  //   // clearUser();
  //   // clearActiveCompany();
  //   setToken(null);
  //   navigate({ to: "/login", replace: true });
  //   toast.success("Log out successfully");
  // };

  // if (!user) {
  //   return (
  //     <SidebarMenu>
  //       <SidebarMenuItem>
  //         <SidebarMenuButton size="lg">
  //           <div className="grid flex-1 text-left text-sm leading-tight">
  //             <span className="truncate font-medium">Loading...</span>
  //             <span className="truncate text-xs text-muted-foreground">
  //               Please wait
  //             </span>
  //           </div>
  //         </SidebarMenuButton>
  //       </SidebarMenuItem>
  //     </SidebarMenu>
  //   );
  // }

  return (
    <div>USER</div>
    // <>
    //   <SidebarMenu>
    //     <SidebarMenuItem>
    //       <DropdownMenu>
    //         <DropdownMenuTrigger>
    //           {/* <SidebarMenuButton
    //             size="lg"
    //             className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
    //           > */}
    //           <Avatar className="size-8 rounded-full">
    //             <AvatarImage
    //               src={
    //                 "https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3087"
    //               }
    //               alt={user.name}
    //               className="object-cover"
    //             />
    //             <AvatarFallback className="rounded-full">
    //               {user.name?.[0]?.toUpperCase() || "U"}
    //             </AvatarFallback>
    //           </Avatar>
    //           {/* <div className="grid flex-1 text-left text-sm leading-tight">
    //               <span className="truncate font-medium">{user.name}</span>
    //               <span className="truncate text-xs text-muted-foreground">
    //                 {user.email}
    //               </span>
    //             </div>
    //             <ChevronsUpDown className="ml-auto size-4" /> */}
    //           {/* </SidebarMenuButton> */}
    //         </DropdownMenuTrigger>

    //         <DropdownMenuContent
    //           className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg ml-2"
    //           // side={isMobile ? "bottom" : "right"}
    //           side="bottom"
    //           align="end"
    //           sideOffset={4}
    //         >
    //           {/* Profile info */}
    //           <DropdownMenuLabel className="p-0 font-normal">
    //             <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
    //               <Avatar className="size-8 rounded-full">
    //                 <AvatarImage
    //                   src={
    //                     "https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3087"
    //                   }
    //                   alt={user.name}
    //                   className="object-cover"
    //                 />
    //                 <AvatarFallback className="rounded-full">
    //                   {user.name?.[0]?.toUpperCase() || "U"}
    //                 </AvatarFallback>
    //               </Avatar>
    //               <div className="grid flex-1 text-left text-sm leading-tight">
    //                 <span className="truncate font-medium">{user.name}</span>
    //                 <span className="truncate text-xs text-muted-foreground">
    //                   {user.email}
    //                 </span>
    //               </div>
    //             </div>
    //           </DropdownMenuLabel>

    //           <DropdownMenuSeparator />

    //           {/* Actions */}
    //           <DropdownMenuGroup>
    //             <DropdownMenuItem>
    //               <Sparkles />
    //               Upgrade to Pro
    //             </DropdownMenuItem>
    //           </DropdownMenuGroup>

    //           <DropdownMenuSeparator />

    //           <DropdownMenuGroup>
    //             <DropdownMenuItem>
    //               <BadgeCheck />
    //               Account
    //             </DropdownMenuItem>
    //             <DropdownMenuItem>
    //               <CreditCard />
    //               Billing
    //             </DropdownMenuItem>
    //             <DropdownMenuItem>
    //               <Bell />
    //               Notifications
    //             </DropdownMenuItem>
    //           </DropdownMenuGroup>

    //           <DropdownMenuSeparator />

    //           {/* Confirm Logout */}
    //           <DropdownMenuItem
    //             variant="destructive"
    //             onClick={() => setDialogOpen(true)}
    //           >
    //             <LogOut />
    //             Log out
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     </SidebarMenuItem>
    //   </SidebarMenu>

    //   <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
    //     <AlertDialogContent>
    //       <AlertDialogHeader>
    //         <AlertDialogTitle>
    //           Are you sure you want to log out?
    //         </AlertDialogTitle>
    //         <AlertDialogDescription>
    //           You’ll need to sign in again to access your dashboard.
    //         </AlertDialogDescription>
    //       </AlertDialogHeader>
    //       <AlertDialogFooter>
    //         <AlertDialogCancel
    //           onClick={() => setDialogOpen(false)}
    //           disabled={isLoggingOut}
    //         >
    //           Cancel
    //         </AlertDialogCancel>

    //         {/* <AlertDialogAction asChild> */}
    //         <Button
    //           variant="destructive"
    //           className="bg-destructive text-destructive-foreground hover:bg-destructive/90 flex items-center gap-2"
    //           onClick={handleLogout}
    //           disabled={isLoggingOut}
    //         >
    //           {isLoggingOut ? (
    //             <Spinner variant="circle" size="sm" />
    //           ) : (
    //             <LogOut />
    //           )}
    //           Log out
    //         </Button>
    //         {/* </AlertDialogAction> */}
    //       </AlertDialogFooter>
    //     </AlertDialogContent>
    //   </AlertDialog>
    // </>
  );
}
