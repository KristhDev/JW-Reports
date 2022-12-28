import { createClient } from '@supabase/supabase-js';
import { SUPABASE_APY_KEY, SUPABASE_URL } from '@env';

import 'react-native-url-polyfill/auto'

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_APY_KEY,
    {
        auth: {
            autoRefreshToken: true,
            persistSession: true
        }
    }
);