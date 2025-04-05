import { EncodingType } from 'expo-file-system';

import { ItemOption, Languages } from '@infrastructure/interfaces';

export const fileEncodings = {
    BASE64: EncodingType.Base64,
    UTF8: EncodingType.UTF8
}

export const storageKeys = {
    AUTH: 'jwreports-auth',
    STORE_PERMISSIONS: 'jwreports-store-permissions',
    STORE_UI: 'jwreports-store-ui',
    STORE: 'jwreports-store',
    THEME: 'jwreports-theme'
}

export const LANGUAGE_OPTIONS: ItemOption[] = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' }
];

export const languagesCodes: Record<Uppercase<Languages>, Languages> = {
    EN: 'en',
    ES: 'es'
}

export const validLanguagesCodes: Languages[] = [
    'en',
    'es'
];