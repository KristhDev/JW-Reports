import { createClient } from '@supabase/supabase-js';
import { SUPABASE_APY_KEY, SUPABASE_URL } from '@env';

export const supabase = createClient(SUPABASE_URL, SUPABASE_APY_KEY);