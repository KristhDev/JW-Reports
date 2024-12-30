import { AppState } from 'react-native';
import { createClient } from '@supabase/supabase-js';

/* Config */
import { env } from './env';

/* Adapters */
import { storage, storageKeys } from '@infrasturcture/adapters';

import 'react-native-url-polyfill/auto';

/* Creating a client that will be used to connect to the database. */
export const supabase = createClient(
    env.SUPABASE_URL!,
    env.SUPABASE_APY_KEY!,
    {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            storage,
            storageKey: storageKeys.AUTH
        }
    }
);

AppState.addEventListener('change', (state) => {
    if (state === 'active') supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
})