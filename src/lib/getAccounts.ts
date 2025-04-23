import supabase from "./supabaseClient";

interface Account {
  id: number;
  username: string;
  password: string;
}

export const getAccounts = async (): Promise<Account[]> => {
  try {
    const { data, error } = await supabase.from("accounts").select("*");

    // Manejo de errores
    if (error) {
      console.error("Supabase Error:", error.message);
      throw new Error(`Error fetching accounts: ${error.message}`);
    }

    // Verificar que `data` no sea null y tenga el tipo correcto
    if (!data || !Array.isArray(data)) {
      console.error("Unexpected data format:", data);
      throw new Error("Unexpected data format when fetching accounts");
    }

    // Asegurarse de que cada elemento en `data` cumple con la interfaz `Account`
    const accounts: Account[] = data.map((account) => {
      if (
        typeof account.id === "number" &&
        typeof account.username === "string" &&
        typeof account.password === "string"
      ) {
        return account as Account;
      } else {
        throw new Error("Invalid account data format");
      }
    });

    return accounts;
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
