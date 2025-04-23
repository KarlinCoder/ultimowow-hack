import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lxyiyctwgwonyeyfosxr.supabase.co"; // Ej: 'https://xyzabc.supabase.co'
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4eWl5Y3R3Z3dvbnlleWZvc3hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNzY5MTEsImV4cCI6MjA2MDk1MjkxMX0.vY9oaoCOms97hz8xB9Ja3127tmV8rdslXMovw0W9geo"; // Clave anónima o clave de servicio
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
