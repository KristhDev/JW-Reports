import React, { FC } from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { Button } from '../Button';

import { ModalActionsProps } from './interfaces';

import stylesheet from './styles';

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