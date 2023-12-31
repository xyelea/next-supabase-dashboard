// Import necessary React components and modules
import React, { ReactNode } from "react";
import SideNav from "./components/SideNav";
import ToggleSidebar from "./components/ToggleSidebar";
import MobileSideNav from "./components/MobileSideNav";
import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import { useUserStore } from "@/lib/store/user";
// Define the Layout component
export default async function Layout({ children }: { children: ReactNode }) {
  // Read user session information
  const { data: userSession } = await readUserSession();
  // Redirect to the authentication page if there is no active user session
  if (!userSession.session) {
    return redirect("/auth");
  }
  // Update the user state in the Zustand store
  useUserStore.setState({ user: userSession.session.user });
  // Render the main layout structure
  return (
    <div className="w-full flex ">
      {/* Sidebar components for desktop and mobile */}
      <div className="h-screen flex flex-col">
        <SideNav />
        <MobileSideNav />
      </div>
      {/* Main content area with toggle sidebar button and child components */}
      <div className="w-full sm:flex-1 p-5 sm:p-10 space-y-5 bg-gray-100 dark:bg-inherit">
        <ToggleSidebar />
        {children}
      </div>
    </div>
  );
}
