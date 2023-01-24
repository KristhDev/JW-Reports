import React, { FC } from 'react';

import { OptionsModal } from '../../../screens/ui';

import { useTheme } from '../../../hooks';

import { Theme } from '../../../interfaces/theme';
import { ModalProps } from '../../../interfaces/ui';

const ThemeModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    const { state: { theme }, setTheme } = useTheme();

    return (
        <OptionsModal
            isOpen={ isOpen }
            items={[
                { label: 'Modo predeterminado', value: 'default' },
                { label: 'Modo claro', value: 'light' },
                { label: 'Modo oscuro', value: 'dark' }
            ]}
            onCancel={ onClose }
            onChangeValue={ (value) => setTheme(value as Theme) }
            title="Apariencia"
            value={ theme }
        />
    );
}

export default ThemeModal;