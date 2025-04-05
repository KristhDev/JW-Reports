/* Config */
import i18n, { TranslationKeys } from '@config/i18n';

/* Contracts */
import { TranslationAdapterContract } from '@domain/contracts/adapters';

export class TranslationAdapter implements TranslationAdapterContract {
    public translate(key: TranslationKeys, replacements?: Record<string, any>): string {
        return i18n.t(key, replacements);
    }
}