import { useTranslation as useTranslationI18Next } from 'react-i18next';

import { TranslationKeys } from '@config/i18n';

import { TimeAdapter } from '@infrastructure/adapters';

import { Languages } from '@infrastructure/interfaces';

import useUI from './useUI';

const useTranslation = () => {
    const { t, i18n } = useTranslationI18Next();
    const { setLanguage } = useUI();

    const changeLanguage = async (lang: Languages): Promise<void> => {
        try {
            await i18n.changeLanguage(lang);
            setLanguage(lang);

            const timerLocale = TimeAdapter.locale[lang as keyof typeof TimeAdapter.locale];
            TimeAdapter.setLocale(timerLocale);
        } 
        catch (error) {
            console.error(error);
        }
    }

    const translate = (key: TranslationKeys, replacements?: Record<string, string | number>): string => {
        return t(key, replacements);
    }

    return {
        changeLanguage,
        translate
    }
}

export default useTranslation;