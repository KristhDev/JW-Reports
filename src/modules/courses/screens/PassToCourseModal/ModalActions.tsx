import React, { FC } from 'react';
import { View } from 'react-native';

/* Components */
import { Button } from '../../../ui/components';

/* Interfaces */
import { ModalActionProps } from './interfaces';

/* Theme */
import { styles as themeStyles, useTheme } from '../../../theme';

/**
 * This component is responsible for grouping actions for modal.
 * @param {ModalActionProps} { onClose: () => void, onConfirm: () => void, reschedule: boolean }
 */
export const ModalActions: FC<ModalActionProps> = ({ onClose, onConfirm }) => {
    const { state: { colors }, BUTTON_TRANSLUCENT_COLOR } = useTheme();

    return (
        <View style={{ ...themeStyles.modalActions, alignSelf: 'flex-end' }}>

            {/* Cancel button */}
            <Button
                containerStyle={{ paddingHorizontal: 12, minWidth: 0 }}
                onPress={ onClose }
                text="CANCELAR"
                textStyle={{ color: colors.button, fontSize: 16 }}
                touchableStyle={{ backgroundColor: 'transparent', marginRight: 10 }}
                underlayColor={ BUTTON_TRANSLUCENT_COLOR }
            />

            {/* Confirm button */}
            <Button
                containerStyle={{ paddingHorizontal: 12, minWidth: 0 }}
                onPress={ onConfirm }
                text="ACEPTAR"
                textStyle={{ color: colors.button, fontSize: 16 }}
                touchableStyle={{ backgroundColor: 'transparent' }}
                underlayColor={ BUTTON_TRANSLUCENT_COLOR }
            />
        </View>
    );
}
