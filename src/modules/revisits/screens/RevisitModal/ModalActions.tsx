import React, { FC } from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { Button } from '../../../ui';

/* Hooks */
import { useRevisits } from '../../hooks';

/* Interfaces */
import { ModalActionProps } from './interfaces';

/* Styles */
import { styles as themeStylesheet } from '../../../theme';

/**
 * This component is responsible for grouping actions for modal.
 *
 * @param {ModalActionProps} { onClose: () => void, onConfirm: () => void, reschedule: boolean, revisitPerson: boolean }
 * @return {JSX.Element} rendered component to show actions of modal
 */
export const ModalActions: FC<ModalActionProps> = ({ onClose, onConfirm, revisitPerson }): JSX.Element => {
    const { state: { selectedRevisit } } = useRevisits();
    const { styles: themeStyles, theme: { colors } } = useStyles(themeStylesheet);

    const confirmTextButton = (revisitPerson)
        ? 'GUARDAR'
        : (selectedRevisit.done)
            ? 'ACEPTAR'
            : 'MARCAR';

    return (
        <View style={{ ...themeStyles.modalActions, alignSelf: 'flex-end' }}>

            {/* Cancel button */}
            <Button
                containerStyle={{ paddingHorizontal: 12, minWidth: 0 }}
                onPress={ onClose }
                text="CANCELAR"
                textStyle={{ color: colors.button, fontSize: 16 }}
                touchableStyle={{ backgroundColor: 'transparent', marginRight: 5 }}
                underlayColor={ colors.buttonTranslucent }
            />

            {/* Confirm button */}
            <Button
                containerStyle={{ paddingHorizontal: 12, minWidth: 0 }}
                onPress={ onConfirm }
                text={ confirmTextButton }
                textStyle={{ color: colors.button, fontSize: 16 }}
                touchableStyle={{ backgroundColor: 'transparent' }}
                underlayColor={ colors.buttonTranslucent }
            />
        </View>
    );
}
