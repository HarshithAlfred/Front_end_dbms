
import { createClient } from "@supabase/supabase-js";
const API_Url=import.meta.env.VITE_APIURL;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
        