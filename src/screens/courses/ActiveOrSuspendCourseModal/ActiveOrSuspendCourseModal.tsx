import React, { FC } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { Modal } from '../../ui';

import { Button } from '../../../components/ui';

import { useCourses, useTheme } from '../../../hooks';

import { ModalProps } from '../../../interfaces/ui';

import { styles as themeStyles } from '../../../theme';

const ActiveOrSuspendCourseModal: FC<ModalProps> = ({ onClose, isOpen }) => {
    const { state: { selectedCourse, isCourseLoading }, activeOrSuspendCourse } = useCourses();
    const { state: { colors }, BUTTON_TRANSLUCENT_COLOR } = useTheme();

    const modalMsg = (selectedCourse.suspended)
        ? '¿Está seguro de continuar este curso?'
        : '¿Está seguro de suspender este curso?';

    const confirmTextButton = (selectedCourse.suspended)
        ? 'ACEPTAR'
        : 'SUSPENDER';

    const handleConfirm = () => {
        activeOrSuspendCourse(onClose);
    }

    return (
        <Modal isOpen={ isOpen }>
            {
                (!isCourseLoading) ? (
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
                            { modalMsg }
                        </Text>

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
                                onPress={ handleConfirm }
                                text={ confirmTextButton }
                                textStyle={{ color: colors.button, fontSize: 16 }}
                                touchableStyle={{ backgroundColor: 'transparent' }}
                                underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                            />
                        </View>
                    </View>
                ) : (
                    <ActivityIndicator
                        color={ colors.button }
                        size={ 50 }
                    />
                )
            }
        </Modal>
    );
}

export default ActiveOrSuspendCourseModal;