import i18n, { TranslationKeys } from '@config/i18n';

export class TranslationAdapter {
    public static translate(key: TranslationKeys, replacements?: Record<string, any>): string {
        return i18n.t(key, replacements);
    }
}