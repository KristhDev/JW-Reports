import { useTranslation as useTranslationI18Next } from 'react-i18next';

/* i18n */
import { TranslationKeys } from '@config/i18n';

/* DI */
import { timeAdapter } from '@config/di';

/* Interfaces */
import { Languages } from '@infrastructure/interfaces';

/* Hooks */
import useUI from './useUI';

const useTranslation = () => {
    const { t, i18n } = useTranslationI18Next();
    const { setLanguage } = useUI();

    /**
     * Changes the language of the application, including the i18n translations
     * and the time adapter locale.
     *
     * @param {Languages} lang - The language code to change to.
     * @returns {Promise<void>} A promise that resolves when the language is changed.
     */
    const changeLanguage = async (lang: Languages): Promise<void> => {
        try {
            await i18n.changeLanguage(lang);
            setLanguage(lang);
            timeAdapter.setLocale(lang);
        } 
        catch (error) {
            console.error(error);
        }
    }

    /**
     * Translates a translation key into its corresponding string in the current
     * language, optionally replacing placeholders with the given values.
     *
     * @param {TranslationKeys} key - The translation key to translate.
     * @param {Record<string, string | number>} [replacements] - An object containing replacement values for 
     * the placeholders in the translation string.
     * @returns {string} The translated string.
     */
    const translate = (key: TranslationKeys, replacements?: Record<string, string | number>): string => {
        return t(key, replacements);
    }

    return {
        changeLanguage,
        translate
    }
}

export default useTranslation;