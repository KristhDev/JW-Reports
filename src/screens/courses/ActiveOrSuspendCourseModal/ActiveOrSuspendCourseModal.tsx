import React, { FC } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

/* Screens */
import { Modal } from '../../ui';

/* Components */
import { Button } from '../../../components/ui';

/* Hooks */
import { useCourses, useTheme } from '../../../hooks';

/* Interfaces */
import { ModalProps } from '../../../interfaces/ui';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This is a modal that groups the components to activate
 * or suspend a course.
 *
 * @param {ModalProps} { onClose: () => void, isOpen: boolean }
 * @return {JSX.Element} Return jsx element to render the modal
 */
const ActiveOrSuspendCourseModal: FC<ModalProps> = ({ onClose, isOpen }): JSX.Element => {
    const { state: { selectedCourse, isCourseLoading }, activeOrSuspendCourse } = useCourses();
    const { state: { colors }, BUTTON_TRANSLUCENT_COLOR } = useTheme();

    const modalMsg = (selectedCourse.suspended)
        ? '¿Está seguro de continuar este curso?'
        : '¿Está seguro de suspender este curso?';

    const confirmTextButton = (selectedCourse.suspended)
        ? 'ACEPTAR'
        : 'SUSPENDER';

    /**
     * HandleConfirm() is a function that calls activeOrSuspendCourse() and passes onClose() as an
     * argument.
     *
     * @return {void} This function does not return anything.
     */
    const handleConfirm = (): void => {
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

                        {/* Modal text */}
                        <Text
                            style={{
                                ...themeStyles.modalText,
                                color: colors.modalText,
                                marginBottom: 0
                            }}
                            testID="modal-text"
                        >
                            { modalMsg }
                        </Text>

                        {/* Modal actions */}
                        <View style={{ ...themeStyles.modalActions, alignSelf: 'flex-end' }}>
                            <Button
                                containerStyle={{ paddingHorizontal: 12, minWidth: 0 }}
                                onPress={ onClose }
                                text="CANCELAR"
                                textStyle={{ color: colors.button, fontSize: 16 }}
                                touchableStyle={{ backgroundColor: 'transparent', marginRight: 5 }}
                                underlayColor={ BUTTON_TRANSLUCENT_COLOR }
                            />

                            <Button
                                containerStyle={{ paddingHorizontal: 12, minWidth: 0 }}
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
                        testID="modal-loading"
                    />
                )
            }
        </Modal>
    );
}

export default ActiveOrSuspendCourseModal;