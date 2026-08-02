import { createClient } from '@supabase/supabase-js'

const URL = import.meta.env.VITE_SUPABASE_URL
const API = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(URL, API)

export default supabase