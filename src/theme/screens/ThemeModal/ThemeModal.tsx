import React, { FC } from 'react';

import { OptionsModal } from '../../../screens/ui';

import { useTheme } from '../../../hooks';

import { Theme } from '../../../interfaces/theme';
import { ModalProps } from '../../../interfaces/ui';

import { THEME_OPTIONS } from '../../../utils';

const ThemeModal: FC<ModalProps> = ({ isOpen, onClose }) => {
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