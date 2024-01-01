"use client";

// Import necessary modules and components
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { Ipermission } from "@/types";
import { updateMemberBasicById } from "../../actions";
import { useTransition } from "react";

// Define the form schema using Zod
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

/**
 * BasicForm component for updating basic information of a member.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.permission - The permission object containing member information.
 */ export default function BasicForm({
  permission,
}: {
  permission: Ipermission;
}) {
  const [isPending, startTransition] = useTransition();
  // Initialize the form using react-hook-form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: permission.member.name,
    },
  });

  // Function to handle form submission
  function onSubmit(data: z.infer<typeof FormSchema>) {
    // Use react-transition-group to handle pending state during form submission
    startTransition(async () => {
      // Parse the JSON response from the updateMemberBasicById function
      const { error } = JSON.parse(
        await updateMemberBasicById(permission.member_id, data)
      );
      // Display a toast notification based on the result of the update operation
      if (error?.message) {
        toast({
          title: "Fail to update",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">error?.message</code>
            </pre>
          ),
        });
      } else {
        toast({
          title: "Successfully update",
        });
      }
    });
  }

  // Render the form
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* Form field for updating display name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submit button for updating information */}
        <Button
          type="submit"
          className="flex gap-2 items-center w-full"
          variant="outline">
          Update{" "}
          <AiOutlineLoading3Quarters
            className={cn(" animate-spin", "hidden")}
          />
        </Button>
      </form>
    </Form>
  );
}
