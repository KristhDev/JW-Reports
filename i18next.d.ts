import { Resources } from '@config/i18n';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'translation';
        resources: Resources['es']
    }
}