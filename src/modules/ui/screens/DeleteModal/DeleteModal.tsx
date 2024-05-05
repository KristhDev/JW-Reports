import React, { FC } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Screens */
import { Modal } from '../';

/* Components */
import { Button } from '../../components';

/* Interfaces */
import { DeleteModalProps } from './interfaces';

/* Theme */
import { styles as themeStylesheet } from '../../../theme';

/**
 * This modal is for removing resources of all kinds.
 *
 * @param {DeleteModalProps} { text: string, isLoading: boolean, isOpen: boolean, onClose: () => void, onConfirm: () => void } Props
 * for delete one resource.
 * - text: Text that informs about the deletion of a resource
 * - isLoading: Boolean to indicate if the removal process is loading
 * - isOpen: Boolean to show or not the modal
 * - onClose: Function to close the modal
 * - onConfirm: Function to confirm the deletion of a resource
 * @return {JSX.Element} rendered component to show delete modal
 */
const DeleteModal: FC<DeleteModalProps> = ({ text, isLoading, isOpen, onClose, onConfirm }): JSX.Element => {
    const { styles: themeStyles, theme: { colors } } = useStyles(themeStylesheet);

    return (
        <Modal isOpen={ isOpen }>
            { (!isLoading) ? (
                <View style={ themeStyles.modalContainer }>

                    {/* Modal text */}
                    <Text
                        style={{ ...themeStyles.modalText, marginBottom: 0 }}
                        testID="delete-modal-title"
                    >
                        { text }
                    </Text>

                    {/* Modal actions */}
                    <View style={ themeStyles.modalActions }>

                        {/* Cancel button */}
                        <Button
                            containerStyle={{ paddingHorizontal: 12, minWidth: 0 }}
                            onPress={ onClose }
                            text="CANCELAR"
                            textStyle={{ color: colors.button, fontSize: 16 }}
                            touchableStyle={{ backgroundColor: 'transparent' }}
                            underlayColor={ colors.buttonTranslucent }
                        />

                        {/* Confirm button */}
                        <Button
                            containerStyle={{ paddingHorizontal: 12, minWidth: 0 }}
                            onPress={ onConfirm }
                            text="ELIMINAR"
                            textStyle={{ color: colors.button, fontSize: 16 }}
                            touchableStyle={{ backgroundColor: 'transparent' }}
                            underlayColor={ colors.buttonTranslucent }
                        />
                    </View>
                </View>
            ) : (
                <ActivityIndicator
                    color={ colors.button }
                    size={ 50 }
                    testID="delete-modal-loading"
                />
            ) }
        </Modal>
    );
}

export default DeleteModal;