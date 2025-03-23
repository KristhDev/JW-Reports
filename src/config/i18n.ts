import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import es from '@locales/es.json';
import en from '@locales/en.json';

export const resources = {
    es: { translation: es },
    en: { translation: en },
}

type Join<K, P> = K extends string | number
    ? P extends string | number
    ? `${K}.${P}`
    : K
    : never;

type ObjectKeys<T> = T extends object
    ? {
        [K in keyof T]: T[K] extends object
        ? Join<K, ObjectKeys<T[K]>>
        : K;
    }[keyof T]
    : never;

export type Resources = typeof resources;
export type TranslationKeys = ObjectKeys<Resources["es"]["translation"]>;

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    defaultNS: 'translation',
    interpolation: {
        escapeValue: false
    },
    lng: 'en',
    resources,
});

export default i18n;