import React, { FC } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { Modal } from '../../ui';

import { Button } from '../../../components/ui';

import { useCourses, useTheme } from '../../../hooks';

import { ActiveOrSuspendCourseModalProps } from './interfaces';

import themeStyles from '../../../theme/styles';

const ActiveOrSuspendCourseModal: FC<ActiveOrSuspendCourseModalProps> = ({ onClose, isOpen }) => {
    const { state: { selectedCourse, isCourseLoading }, activeOrSuspendCourse } = useCourses();
    const { state: { colors }, BUTTON_TRANSLUCENT_COLOR } = useTheme();

    const modalMsg = (selectedCourse.suspended)
        ? '¿Está seguro de volver a comenzar este curso?'
        : '¿Está seguro de suspender este curso?';

    const confirmTextButton = (selectedCourse.suspended)
        ? 'Aceptar'
        : 'Suspender';

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
                                containerStyle={{ paddingHorizontal: 14, paddingVertical: 7 }}
                                onPress={ onClose }
                                text="Cancelar"
                                textStyle={{ color: colors.button }}
                                touchableStyle={{ backgroundColor: 'transparent', marginRight: 10 }}
                                underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                            />

                            <Button
                                containerStyle={{ paddingHorizontal: 14, paddingVertical: 7 }}
                                onPress={ handleConfirm }
                                text={ confirmTextButton }
                                textStyle={{ color: colors.button }}
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