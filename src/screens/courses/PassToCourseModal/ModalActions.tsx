import React, { FC } from 'react';
import { View } from 'react-native';

import { Button } from '../../../components/ui';

import { useTheme } from '../../../hooks';

import { ModalActionProps } from './interfaces';

import themeStyles from '../../../theme/styles';

export const ModalActions: FC<ModalActionProps> = ({ onClose, onConfirm }) => {
    const { state: { colors }, BUTTON_TRANSLUCENT_COLOR } = useTheme();

    return (
        <View style={{ ...themeStyles.modalActions, alignSelf: 'flex-end' }}>
            <Button
                containerStyle={{ paddingHorizontal: 12 }}
                onPress={ onClose }
                text="CANCELAR"
                textStyle={{ color: colors.button, fontSize: 16 }}
                touchableStyle={{ backgroundColor: 'transparent', marginRight: 10 }}
                underlayColor={ BUTTON_TRANSLUCENT_COLOR }
            />

            <Button
                containerStyle={{ paddingHorizontal: 12 }}
                onPress={ onConfirm }
                text="ACEPTAR"
                textStyle={{ color: colors.button, fontSize: 16 }}
                touchableStyle={{ backgroundColor: 'transparent' }}
                underlayColor={ BUTTON_TRANSLUCENT_COLOR }
            />
        </View>
    );
}
