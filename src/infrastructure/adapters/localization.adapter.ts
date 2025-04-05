import * as Localization from 'expo-localization';

import { languagesCodes } from '@application/constants/utils/adapters.util';

import { LocalizationAdapterContract } from '@domain/contracts/adapters';

export class LocalizationAdapter implements LocalizationAdapterContract {
    public getCurrentLanguageCode(): string {
        const locales = Localization.getLocales();

        if (locales.length > 0) return locales[0].languageCode || languagesCodes.EN;
        return languagesCodes.EN;
    }
}