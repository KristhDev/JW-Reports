import React, { FC } from 'react';

/* DI */
import { themeService } from '@config/di';

/* Context */
import { Theme } from '@application/context';

/* Screens */
import { OptionsModal } from '@ui/screens';

/* Hooks */
import { useTheme } from '../../hooks';
import { useTranslation } from '@ui/hooks';

/* Interfaces */
import { ModalProps } from '@ui/interfaces';

/**
 * This is a modal that allows the user to change the theme.
 *
 * @param {ModalProps} { isOpen, onClose }
 * @return {JSX.Element} Return jsx element to render modal of theme
 */
const ThemeModal: FC<ModalProps> = ({ isOpen, onClose }): JSX.Element => {
    const THEME_OPTIONS = themeService.THEME_OPTIONS;
    const { state: { selectedTheme }, setTheme } = useTheme();
    const { translate } = useTranslation();

    return (
        <OptionsModal
            isOpen={ isOpen }
            items={ THEME_OPTIONS }
            onCancel={ onClose }
            onChangeValue={ (value) => setTheme(value as Theme) }
            title={ translate('modals.theme.titles.appearance') }
            value={ selectedTheme }
        />
    );
}

export default ThemeModal;