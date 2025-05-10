/* Constants */
import { themes } from '@application/constants/utils';

/* Contracts */
import { TranslationAdapterContract } from '@domain/contracts/adapters';
import { ThemeServiceContract } from '@domain/contracts/services';

export class ThemeService implements ThemeServiceContract {
    constructor(
        private readonly translationAdapter: TranslationAdapterContract
    ) {}

    public get THEME_OPTIONS() {
        return [
            { 
                label: this.translationAdapter.translate('theme.options.lightMode'),
                value: themes.LIGHT
            },
            {
                label: this.translationAdapter.translate('theme.options.darkMode'),
                value: themes.DARK
            },
            {
                label: this.translationAdapter.translate('theme.options.defaultMode'),
                value: themes.DEFAULT
            }
        ]
    }
}