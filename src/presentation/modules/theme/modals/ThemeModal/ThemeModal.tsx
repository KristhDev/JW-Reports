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

    /**
     * When the user clicks on a button, the value of the button is set to the value of the input
     * field, and the modal is hidden.
     *
     * @param {string} value - string - the value of the input
     * @return {void} This function returns nothing
     */
    const handleChangeValue = (value: string): void => {
        setTheme(value as Theme);
        onClose();
    }

    return (
        <OptionsModal
            isOpen={ isOpen }
            items={ THEME_OPTIONS }
            onCancel={ onClose }
            onChangeValue={ handleChangeValue }
            title={ translate('modals.theme.titles.appearance') }
            value={ selectedTheme }
        />
    );
}

export default ThemeModal;