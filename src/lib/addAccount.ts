import supabase from "./supabaseClient";

export const addAccount = async (username: string, password: string) => {
  try {
    const { error } = await supabase
      .from("accounts")
      .insert({ username, password });

    if (error) throw error;
    return "done";
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
  }
};
