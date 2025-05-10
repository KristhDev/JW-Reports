import { AppState } from 'react-native';
import { createClient, SupportedStorage } from '@supabase/supabase-js';

/* Config */
import { env } from './env';
import { storageAdapter } from './di';

/* Constants */
import { storageKeys } from '@application/constants/utils/adapters.util';

import 'react-native-url-polyfill/auto';

const supabaseAuthStorage: SupportedStorage = {
    getItem: (key: string) => storageAdapter.getItem(key),
    setItem: (key: string, value: string) => storageAdapter.setItem(key, value),
    removeItem: (key: string) => storageAdapter.removeItem(key)
}

/* Creating a client that will be used to connect to the database. */
export const supabase = createClient(
    env.SUPABASE_URL!,
    env.SUPABASE_APY_KEY!,
    {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            storage: supabaseAuthStorage,
            storageKey: storageKeys.AUTH
        }
    }
);

AppState.addEventListener('change', (state) => {
    if (state === 'active') supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
})