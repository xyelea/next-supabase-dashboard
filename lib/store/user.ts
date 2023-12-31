// Import necessary modules and types

import { User } from "@supabase/supabase-js";
import { create } from "zustand";
// Define the shape of the user state
interface userState {
  // The user property can be a Supabase User or null if not authenticated
  user: User | null;
}
// Create a Zustand store for managing user state
export const useUserStore = create<userState>()((set) => ({
  user: null, // Initialize user as null by default
}));
