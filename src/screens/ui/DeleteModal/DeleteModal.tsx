import React, { FC } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { Modal } from '../';

import { Button } from '../../../components/ui';

import { useTheme } from '../../../hooks';

import { DeleteModalProps } from './interfaces';

import { BUTTON_TRANSLUCENT_COLOR } from '../../../utils';

import styles from './styles';

const DeleteModal: FC<DeleteModalProps> = ({ text, isLoading, isOpen, onClose, onConfirm }) => {
    const { state: { colors } } = useTheme();

    return (
        <Modal isOpen={ isOpen || isLoading }>
            {
                (!isLoading)
                    ? (
                        <View
                            style={{
                                ...styles.deleteModal,
                                backgroundColor: colors.contentHeader
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.deleteText,
                                    color: colors.modalText
                                }}
                            >
                                { text }
                            </Text>

                            <View style={ styles.modalActions }>
                                <Button
                                    containerStyle={{ paddingHorizontal: 14, paddingVertical: 7 }}
                                    onPress={ onConfirm }
                                    text="Eliminar"
                                    textStyle={{ color: colors.button }}
                                    touchableStyle={{ backgroundColor: 'transparent', marginRight: 10 }}
                                    underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                                />

                                <Button
                                    containerStyle={{ paddingHorizontal: 14, paddingVertical: 7 }}
                                    onPress={ onClose }
                                    text="Cancelar"
                                    textStyle={{ color: colors.button }}
                                    touchableStyle={{ backgroundColor: 'transparent' }}
                                    underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                                />
                            </View>
                        </View>
                    ) : (
                        <ActivityIndicator
                            color={ colors.button }
                            size="large"
                        />
                    )
            }
        </Modal>
    );
}

export default DeleteModal;