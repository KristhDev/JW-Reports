import React, { FC } from 'react';

/* Screens */
import { OptionsModal } from '../../../screens/ui';

/* Hooks */
import { useTheme } from '../../../hooks';

/* Interfaces */
import { Theme } from '../../../interfaces/theme';
import { ModalProps } from '../../../interfaces/ui';

/* Utils */
import { THEME_OPTIONS } from '../../../utils';

/**
 * This is a modal that allows the user to change the theme.
 *
 * @param {ModalProps} { isOpen, onClose }
 * @return {JSX.Element} Return jsx element to render modal of theme
 */
const ThemeModal: FC<ModalProps> = ({ isOpen, onClose }): JSX.Element => {
    const { state: { theme }, setTheme } = useTheme();

    return (
        <OptionsModal
            isOpen={ isOpen }
            items={ THEME_OPTIONS }
            onCancel={ onClose }
            onChangeValue={ (value) => setTheme(value as Theme) }
            title="Apariencia"
            value={ theme }
        />
    );
}

export default ThemeModal;