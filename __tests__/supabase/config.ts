import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Env */
import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from '@env';

import 'react-native-url-polyfill/auto';

/* Creating a admin client that will be used to connect to the database. */
export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    {
        auth: {
            storage: AsyncStorage,
            persistSession: true
        }
    }
);