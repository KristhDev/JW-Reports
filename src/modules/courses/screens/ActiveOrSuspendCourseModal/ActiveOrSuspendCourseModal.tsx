import React, { FC } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* UI */
import { Modal, ModalActions, ModalProps } from '@ui';

/* Hooks */
import { useCourses } from '../../hooks';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This is a modal that groups the components to activate
 * or suspend a course.
 *
 * @param {ModalProps} { onClose: () => void, isOpen: boolean }
 * @return {JSX.Element} Return jsx element to render the modal
 */
const ActiveOrSuspendCourseModal: FC<ModalProps> = ({ onClose, isOpen }): JSX.Element => {
    const { state: { selectedCourse, isCourseLoading }, activeOrSuspendCourse } = useCourses();
    const { styles: themeStyles, theme: { colors, fontSizes } } = useStyles(themeStylesheet);

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
            { (!isCourseLoading) ? (
                <View style={ themeStyles.modalContainer }>

                    {/* Modal text */}
                    <Text
                        style={{ ...themeStyles.modalText, marginBottom: 0 }}
                        testID="modal-text"
                    >
                        { modalMsg }
                    </Text>

                    {/* Modal actions */}
                    <ModalActions
                        cancelButtonText="CANCELAR"
                        confirmTextButton={ confirmTextButton }
                        onCancel={ onClose }
                        onConfirm={ handleConfirm }
                        showCancelButton
                        showConfirmButton
                    />
                </View>
            ) : (
                <ActivityIndicator
                    color={ colors.button }
                    size={ fontSizes.xxl }
                    testID="modal-loading"
                />
            ) }
        </Modal>
    );
}

export default ActiveOrSuspendCourseModal;