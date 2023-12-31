// Import React and necessary components
import React from "react";
import MemberTable from "./components/MemberTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchMembers from "./components/SearchMembers";
import CreateMember from "./components/create/CreateMember";
import { useUserStore } from "@/lib/store/user";
// Define the Members component

export default function Members() {
  // Get user information from the Zustand store

  const user = useUserStore.getState().user;
  // Check if the user has admin privileges

  const isAdmin = user?.user_metadata.role === "admin";
  // Render the main content of the Members page

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Members</h1>

      {isAdmin && (
        <>
          <div className="flex gap-2">
            <SearchMembers />
            <CreateMember />
          </div>
        </>
      )}
      {/* Render the MemberTable component */}

      <MemberTable />
    </div>
  );
}
