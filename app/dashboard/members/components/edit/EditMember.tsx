// Import React and necessary components
import React from "react";
import DailogForm from "../DialogForm";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import EditForm from "./EditorForm";
import { Ipermission } from "@/types";

// Define the EditMember component
export default function EditMember({
  isAdmin,
  permission,
}: {
  isAdmin: boolean;
  permission: Ipermission;
}) {
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
      form={<EditForm isAdmin={isAdmin} permission={permission} />}
    />
  );
}
