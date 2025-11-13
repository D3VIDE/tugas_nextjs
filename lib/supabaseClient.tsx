import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


if (!supabaseUrl || !supabaseKey) {
  throw new Error(`
    ❌ MISSING SUPABASE ENVIRONMENT VARIABLES!
    
    Please check your .env.local file:
    - NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl ? '✅' : '❌'}
    - NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseKey ? '✅' : '❌'}
    
    Get these from: Supabase Dashboard → Settings → API
  `);
}

console.log('🔗 Supabase Client initialized');
console.log('📁 Project URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseKey);