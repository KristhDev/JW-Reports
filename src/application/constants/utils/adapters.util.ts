import { EncodingType } from 'expo-file-system';

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