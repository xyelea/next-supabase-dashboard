// Import React and necessary components

import React from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import EditMember from "./edit/EditMember";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/lib/store/user";
// Define the ListOfMembers component

export default function ListOfMembers() {
  // Sample data for members (replace with actual data from API or state)

  const members = [
    {
      name: "Sokheng",
      role: "admin",
      created_at: new Date().toDateString(),
      status: "active",
    },
    {
      name: "Sokheng",
      role: "user",
      created_at: new Date().toDateString(),
      status: "active",
    },
    {
      name: "Sokheng",
      role: "admin",
      created_at: new Date().toDateString(),
      status: "resigned",
    },
    {
      name: "Sokheng",
      role: "user",
      created_at: new Date().toDateString(),
      status: "active",
    },
  ];
  // Get user information from the Zustand store

  const user = useUserStore.getState().user;
  // Check if the user has admin privileges

  const isAdmin = user?.user_metadata.role === "admin";
  // Render the list of members

  return (
    <div className="dark:bg-inherit bg-white mx-2 rounded-sm">
      {members.map((member, index) => {
        return (
          <div
            className=" grid grid-cols-5  rounded-sm  p-3 align-middle font-normal"
            key={index}>
            {/* Display member information */}

            <h1>{member.name}</h1>

            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full shadow capitalize  border-[.5px] text-sm",
                  {
                    "border-green-500 text-green-600 bg-green-200":
                      member.role === "admin",
                    "border-zinc-300 dark:text-yellow-300 dark:border-yellow-700 px-4 bg-yellow-50":
                      member.role === "user",
                  }
                )}>
                {member.role}
              </span>
            </div>
            <h1>{member.created_at}</h1>
            <div>
              <span
                className={cn(
                  " dark:bg-zinc-800 px-2 py-1 rounded-full  capitalize text-sm border-zinc-300  border",
                  {
                    "text-green-600 px-4 dark:border-green-400 bg-green-200":
                      member.status === "active",
                    "text-red-500 bg-red-100 dark:text-red-300 dark:border-red-400":
                      member.status === "resigned",
                  }
                )}>
                {member.status}
              </span>
            </div>
            {/* Action buttons for deleting and editing members */}

            <div className="flex gap-2 items-center">
              <Button variant="outline">
                <TrashIcon />
                Delete
              </Button>
              <EditMember isAdmin={isAdmin} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
