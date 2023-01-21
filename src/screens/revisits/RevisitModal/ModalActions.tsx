import React, { FC } from 'react';
import { View } from 'react-native';

import { Button } from '../../../components/ui';

import { useRevisits, useTheme } from '../../../hooks';

import { ModalActionProps } from './interfaces';

import { styles as themeStyles } from '../../../theme';

export const ModalActions: FC<ModalActionProps> = ({ onClose, onConfirm, revisitPerson }) => {
    const { state: { selectedRevisit } } = useRevisits();
    const { state: { colors }, BUTTON_TRANSLUCENT_COLOR } = useTheme();

    const confirmTextButton = (revisitPerson)
        ? 'GUARDAR'
        : (selectedRevisit.done)
            ? 'ACEPTAR'
            : 'MARCAR';

    return (
        <View style={{ ...themeStyles.modalActions, alignSelf: 'flex-end' }}>
            <Button
                containerStyle={{ paddingHorizontal: 12 }}
                onPress={ onClose }
                text="CANCELAR"
                textStyle={{ color: colors.button, fontSize: 16 }}
                touchableStyle={{ backgroundColor: 'transparent', marginRight: 5 }}
                underlayColor={ BUTTON_TRANSLUCENT_COLOR }
            />

            <Button
                containerStyle={{ paddingHorizontal: 12 }}
                onPress={ onConfirm }
                text={ confirmTextButton }
                textStyle={{ color: colors.button, fontSize: 16 }}
                touchableStyle={{ backgroundColor: 'transparent' }}
                underlayColor={ BUTTON_TRANSLUCENT_COLOR }
            />
        </View>
    );
}
