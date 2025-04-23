import axios from "axios";

// Configuración
const FILE_UUID = "7f2a91f2-6531-4bd7-a3a1-6505506c9f5e"; // Tu UUID
const MANAGE_URL = `https://api.jsonsilo.com/api/v1/manage/${FILE_UUID}`;
const API_KEY = "qkBe3Lb0lyrk2mZQUC958wcQh6iZ4kCqkpqqOrhcHN";

const headers = {
  "X-MAN-API": API_KEY, // ¡Clave correcta para gestión!
  "Content-Type": "application/json",
};

export const addAccount = async (username: string, password: string) => {
  try {
    // 1. Obtener datos existentes (GET a tu URL base)
    const { data: currentData } = await axios.get(
      `https://api.jsonsilo.com/${FILE_UUID}`,
      { headers: { "X-SILO-KEY": API_KEY } } // Usa X-SILO-KEY para GET
    );

    // 2. Preparar el nuevo objeto
    const newAccount = {
      id: (currentData?.file_data?.length || 0) + 1,
      username,
      password,
    };

    // 3. Body según la documentación
    const postData = {
      file_name: "my_accounts", // Nombre descriptivo
      file_data: [...(currentData?.file_data || []), newAccount],
      region_name: "api", // Región por defecto
      is_public: false, // Silo privado
    };

    // 4. Hacer PUT/POST (ambos funcionan según doc)
    const response = await axios.put(MANAGE_URL, postData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error al guardar:", error);
    throw new Error("No se pudo actualizar el silo");
  }
};
