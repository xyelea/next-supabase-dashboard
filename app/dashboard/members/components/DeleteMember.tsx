"use client";
// Import necessary modules and components
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import React, { useTransition } from "react";
import { deleteMemberById } from "../actions";
import { toast } from "@/components/ui/use-toast";
/**
 * DeleteMember component for deleting a member.
 * @param {Object} props - Props containing the user ID of the member to be deleted.
 * @param {string} props.user_id - The user ID of the member to be deleted.
 */
export default function DeleteMember({ user_id }: { user_id: string }) {
  // Use React's useTransition for pending state during the deletion process
  const [isPending, startTransition] = useTransition();
  /**
   * Handle form submission to delete the member.
   */
  const onSubmit = () => {
    // Start a transition to handle the pending state
    startTransition(async () => {
      // Parse the result of the deleteMemberById function
      const result = JSON.parse(await deleteMemberById(user_id));

      // Check for errors during deletion and display appropriate toast messages
      if (result?.error?.message) {
        toast({
          title: "Fail to delete",
        });
      } else {
        toast({
          title: "Successfully delete",
        });
      }
    });
  };
  return (
    // Render a form with a button for member deletion
    <form action={onSubmit}>
      <Button variant="outline">
        <TrashIcon />
        Delete
      </Button>
    </form>
  );
}
