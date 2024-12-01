import React, { FC } from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { Button } from '../Button';

/* Interfaces */
import { ModalActionsProps } from './interfaces';

/* Styles */
import { stylesheet } from './styles';

/**
 * Renders the modal actions component with the provided props.
 *
 * @param {ModalActionsProps} props - The props for the modal actions component.
 * @param {string} props.confirmTextButton - The text for the confirm button.
 * @param {() => void} props.onConfirm - The function to be called when the confirm button is pressed.
 * @param {string} props.cancelButtonText - The text for the cancel button.
 * @param {() => void} props.onCancel - The function to be called when the cancel button is pressed.
 * @param {boolean} props.showCancelButton - Whether to show the cancel button.
 * @param {boolean} props.showConfirmButton - Whether to show the confirm button.
 * @return {JSX.Element} The rendered modal actions component.
 */
export const ModalActions: FC<ModalActionsProps> = ({ confirmTextButton, onConfirm, cancelButtonText, onCancel, showCancelButton, showConfirmButton }): JSX.Element => {
    const { styles, theme: { colors } } = useStyles(stylesheet);

    return (
        <View style={ styles.modalActions }>
            { showCancelButton && (
                <Button
                    containerStyle={ styles.modalButton }
                    onPress={ onCancel! }
                    text={ cancelButtonText! }
                    textStyle={ styles.modalButtonText }
                    pressableStyle={{ backgroundColor: 'transparent' }}
                    underlayColor={ colors.buttonTranslucent }
                />
            ) }

            { showConfirmButton && (
                <Button
                    containerStyle={ styles.modalButton }
                    onPress={ onConfirm! }
                    text={ confirmTextButton! }
                    textStyle={ styles.modalButtonText }
                    pressableStyle={{ backgroundColor: 'transparent' }}
                    underlayColor={ colors.buttonTranslucent }
                />
            ) }
        </View>
    );
}