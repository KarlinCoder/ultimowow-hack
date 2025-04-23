import supabase from "./supabaseClient";

export const deleteAllAccounts = async (): Promise<void> => {
  try {
    // Eliminar todos los registros de la tabla "accounts"
    const { error } = await supabase.from("accounts").delete().neq("id", ""); // Usamos .neq() para evitar errores de validación

    // Manejo de errores
    if (error) {
      console.error("Supabase Error:", error.message);
      throw new Error(`Error deleting accounts: ${error.message}`);
    }

    console.log("All accounts deleted successfully");
  } catch (error) {
    // Manejo de errores generales
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error occurred");
    }
    throw error; // Re-lanzar el error para que el llamador lo maneje
  }
};
