import { useTranslation as useTranslationI18Next } from 'react-i18next';

import { TranslationKeys } from '@config/i18n';

import { Languages } from '@infrastructure/interfaces';

const useTranslation = () => {
    const { t, i18n } = useTranslationI18Next();

    // const settings = useStore((state) => state.settings);
    // const setSettings = useStore((state) => state.setSettings);

    const changeLanguage = async (lang: Languages): Promise<void> => {
        try {
            await i18n.changeLanguage(lang);

            // const newSettings: UISettings = {
            //     ...settings,
            //     language: {
            //         language: lang
            //     }
            // }

            // setSettings(newSettings);
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