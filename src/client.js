import { createClient } from '@supabase/supabase-js'

const URL = 'https://vtomzeyxgwxadoenmyuh.supabase.co'
const API = 'sb_publishable_rMiEtdHd8M_t2qALYPqwnQ_uqtMbFVN'

const supabase = createClient(URL, API)

export default supabase