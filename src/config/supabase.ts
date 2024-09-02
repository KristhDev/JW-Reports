import { createClient } from '@supabase/supabase-js';

/* Utils */
import { storage, storageKeys } from '@utils';

/* Env */
import { SUPABASE_APY_KEY, SUPABASE_URL } from '@env';

import 'react-native-url-polyfill/auto';

/* Creating a client that will be used to connect to the database. */
export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_APY_KEY,
    {
        auth: {
            storage,
            storageKey: storageKeys.AUTH,
            persistSession: true
        }
    }
);