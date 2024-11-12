import React, { FC } from 'react';

/* Constants */
import { THEME_OPTIONS } from '@application/constants';

/* Context */
import { Theme } from '@application/context';

/* Screens */
import { OptionsModal, ModalProps } from '@ui';

/* Hooks */
import { useTheme } from '../../hooks';

/**
 * This is a modal that allows the user to change the theme.
 *
 * @param {ModalProps} { isOpen, onClose }
 * @return {JSX.Element} Return jsx element to render modal of theme
 */
const ThemeModal: FC<ModalProps> = ({ isOpen, onClose }): JSX.Element => {
    const { state: { selectedTheme }, setTheme } = useTheme();

    return (
        <OptionsModal
            isOpen={ isOpen }
            items={ THEME_OPTIONS }
            onCancel={ onClose }
            onChangeValue={ (value) => setTheme(value as Theme) }
            title="Apariencia"
            value={ selectedTheme }
        />
    );
}

export default ThemeModal;