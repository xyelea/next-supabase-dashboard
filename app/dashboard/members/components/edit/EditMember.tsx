// Import React and necessary components
import React from "react";
import DailogForm from "../DialogForm";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import EditForm from "./EditorForm";

// Define the EditMember component
export default function EditMember({ isAdmin }: { isAdmin: boolean }) {
  return (
    // Use the DialogForm component for editing members
    <DailogForm
      id="update-trigger"
      title="Edit Member"
      Trigger={
        <Button variant="outline">
          <Pencil1Icon />
          Edit
        </Button>
      }
      form={<EditForm isAdmin={isAdmin} />}
    />
  );
}
