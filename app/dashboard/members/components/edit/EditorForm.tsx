// Import necessary React components and modules
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicForm from "./BasicForm";
import AccountForm from "./AccountForm";
import AdvanceForm from "./AdvanceForm";
import { cn } from "@/lib/utils";

// Define the EditForm component
export default function EditForm({ isAdmin }: { isAdmin: boolean }) {
  return (
    // Use the Tabs component for organizing different sections of the form
    <Tabs defaultValue="basic" className="w-full space-y-5">
      {/* TabsList represents the tabs for selecting different sections */}
      <TabsList
        className={cn("grid w-full ", isAdmin ? "grid-cols-3" : "grid-cols-1")}>
        <TabsTrigger value="basic">Basic</TabsTrigger>
        {isAdmin && (
          <>
            <TabsTrigger value="account">Acccount</TabsTrigger>
            <TabsTrigger value="advance">Advance</TabsTrigger>
          </>
        )}
      </TabsList>
      {/* TabsContent represents the content of each tab */}
      <TabsContent value="basic">
        <BasicForm />
      </TabsContent>
      {/* Display additional content for admin users */}
      {isAdmin && (
        <>
          <TabsContent value="account">
            <AccountForm />
          </TabsContent>
          <TabsContent value="advance">
            <AdvanceForm />
          </TabsContent>
        </>
      )}
    </Tabs>
  );
}
