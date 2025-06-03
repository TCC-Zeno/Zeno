// Imports
import { createClient } from '@supabase/supabase-js';  
import { env } from './env.js';

// Create a Supabase client
export const supabase = createClient(
    env.SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
        
    }
    );
