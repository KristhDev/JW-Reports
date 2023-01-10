import React, { FC } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { Modal } from '../';

import { Button } from '../../../components/ui';

import { useTheme } from '../../../hooks';

import { DeleteModalProps } from './interfaces';

import themeStyles from '../../../theme/styles';

const DeleteModal: FC<DeleteModalProps> = ({ text, isLoading, isOpen, onClose, onConfirm }) => {
    const { state: { colors }, BUTTON_TRANSLUCENT_COLOR } = useTheme();

    return (
        <Modal isOpen={ isOpen }>
            {
                (!isLoading) ? (
                    <View
                        style={{
                            ...themeStyles.modalContainer,
                            backgroundColor: colors.modal
                        }}
                    >
                        <Text
                            style={{
                                ...themeStyles.modalText,
                                color: colors.modalText
                            }}
                        >
                            { text }
                        </Text>

                        <View style={ themeStyles.modalActions }>
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