import { TranslationKeys } from '@config/i18n';

export abstract class TranslationAdapterContract {
    public abstract translate(key: TranslationKeys, replacements?: Record<string, any>): string
}