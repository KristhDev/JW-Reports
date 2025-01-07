import { createClient } from '@supabase/supabase-js';

/* Adapters */
import { storage, storageKeys } from '@infrasturcture/adapters';

/* Env */
import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from '@env';

import 'react-native-url-polyfill/auto';

/* Creating a admin client that will be used to connect to the database. */
export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            storage,
            storageKey: storageKeys.AUTH
        }
    }
);