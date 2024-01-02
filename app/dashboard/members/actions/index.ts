"use server";
import { readUserSession } from "@/lib/actions";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";
/**
 * Create a new member with the specified data.
 * @param {Object} data - The member data including name, role, status, email, password, and confirm.
 * @returns {string} - A JSON string representing the result of the member creation.
 */
export async function createMember(data: {
  name: string;
  role: "user" | "admin";
  status: "active" | "resigned";
  email: string;
  password: string;
  confirm: string;
}) {
  // Check if the current user has admin role
  const { data: userSession } = await readUserSession();
  if (userSession.session?.user.user_metadata.role !== "admin") {
    return JSON.stringify({
      error: { message: "You are not allowed to do this!" },
    });
  } // Create Supabase Admin client
  const supabase = await createSupabaseAdmin();

  // Create account using Supabase admin API
  const createResult = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      role: data.role,
    },
  });
  // Handle errors during account creation
  if (createResult.error?.message) {
    return JSON.stringify(createResult);
  } else {
    // Insert member information into the "member" table
    const memberResult = await supabase.from("member").insert({
      name: data.name,
      id: createResult.data.user?.id,
      email: data.email,
    });
    // Handle errors during member insertion
    if (memberResult.error?.message) {
      return JSON.stringify(memberResult);
    } else {
      // Insert permission information into the "permission" table
      const permissionResult = await supabase.from("permission").insert({
        role: data.role,
        member_id: createResult.data.user?.id,
        status: data.status,
      });
      // Invalidate the cache for the "/dashboard/member" path
      revalidatePath("/dashboard/member");
      return JSON.stringify(permissionResult);
    }
  }
}

/**
 * Update basic information of a member with the specified ID.
 * @param {string} id - The ID of the member to update.
 * @param {Object} data - The updated member data including name.
 * @returns {string} - A JSON string representing the result of the member update.
 */
export async function updateMemberBasicById(
  id: string,
  data: {
    name: string;
  }
) {
  const supabase = await createSupbaseServerClient();

  const result = await supabase.from("member").update(data).eq("id", id);
  // Invalidate the cache for the "/dashboard/member" path
  revalidatePath("/dashboard/member");
  return JSON.stringify(result);
}
/**
 * Update advanced information of a member with the specified permission ID and user ID.
 * @param {string} permission_id - The permission ID of the member to update.
 * @param {string} user_id - The user ID of the member to update.
 * @param {Object} data - The updated member data including role and status.
 * @returns {string} - A JSON string representing the result of the member update.
 */
export async function updateMemberAdvanceById(
  permission_id: string,
  user_id: string,
  data: {
    role: "user" | "admin";
    status: "active" | "resigned";
  }
) {
  // Check if the current user has admin role
  const { data: userSession } = await readUserSession();
  if (userSession.session?.user.user_metadata.role !== "admin") {
    return JSON.stringify({
      error: { message: "You are not allowed to do this!" },
    });
  } // Create Supabase Admin client
  const supabaseAdmin = await createSupabaseAdmin();

  // Update account using Supabase admin API
  const updateResult = await supabaseAdmin.auth.admin.updateUserById(user_id, {
    user_metadata: { role: data.role },
  });

  // Handle errors during user role update
  if (updateResult?.error?.message) {
    return JSON.stringify(updateResult);
  } else {
    // Create Supabase server client
    const supabase = await createSupbaseServerClient();

    // Update member information in the "permission" table
    const result = await supabase
      .from("permission")
      .update(data)
      .eq("id", permission_id);
    // Invalidate the cache for the "/dashboard/member" path
    revalidatePath("/dashboard/member");
    return JSON.stringify(result);
  }
}
/**
 * Delete a member with the specified user ID.
 * @param {string} user_id - The user ID of the member to delete.
 * @returns {string} - A JSON string representing the result of the member deletion.
 */
export async function deleteMemberById(user_id: string) {
  // Check if the current user has admin role
  const { data: userSession } = await readUserSession();
  if (userSession.session?.user.user_metadata.role !== "admin") {
    return JSON.stringify({
      error: { message: "You are not allowed to do this!" },
    });
  } // Create Supabase Admin client
  const supabase = await createSupabaseAdmin();
  // Delete user using Supabase admin API
  const deleteResult = await supabase.auth.admin.deleteUser(user_id);

  if (deleteResult?.error?.message) {
    return JSON.stringify(deleteResult);
  } else {
    // Create Supabase server client
    const supabase = await createSupbaseServerClient();
    // Delete member from the "member" table
    const result = await supabase.from("member").delete().eq("id", user_id);
    // Invalidate the cache for the "/dashboard/member" path
    revalidatePath("/dashboard/member");

    return JSON.stringify(result);
  }
}
/**
 * Read members from the "permission" table including related information from the "member" table.
 * Uses unstable_noStore to prevent caching of the response.
 * @returns {Object} - Result of the query containing member and permission data.
 */
export async function readMembers() {
  unstable_noStore();
  // Create Supabase server client
  const supabase = await createSupbaseServerClient();
  return await supabase.from("permission").select("*, member(*)");
}
