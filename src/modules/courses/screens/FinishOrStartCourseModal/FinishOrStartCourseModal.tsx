import React, { FC } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Modules */
import { useCourses } from '../../hooks';
import { themeStylesheet } from '@theme';
import { Modal, ModalProps, ModalActions } from '@ui';

/**
 * This modal is responsible for grouping the components to finish
 * or start a course again.
 *
 * @param {ModalProps} { isOpen: boolean, onClose: () => void }
 * @return {JSX.Element} rendered component to show modal
 */
const FinishOrStartCourseModal: FC<ModalProps> = ({ isOpen, onClose }): JSX.Element => {
    const { styles: themeStyles, theme: { colors, fontSizes } } = useStyles(themeStylesheet);

    const { state: { selectedCourse, isCourseLoading }, finishOrStartCourse } = useCourses();

    const modalMsg = (selectedCourse.finished)
        ? '¿Está seguro de volver a comenzar este curso?'
        : '¿Está seguro de terminar este curso?';

    const confirmTextButton = (selectedCourse.finished) ? 'COMENZAR' : 'TERMINAR';

    /**
     * HandleConfirm() is a function that calls the finishOrStartCourse() function and passes the
     * onClose() function as an argument.
     *
     * @return {void} This function does not return anything.
     */
    const handleConfirm = (): void => {
        finishOrStartCourse(onClose);
    }

    return (
        <Modal isOpen={ isOpen }>
            { (!isCourseLoading) ? (
                <View style={ themeStyles.modalContainer }>
                    <Text
                        style={{ ...themeStyles.modalText, marginBottom: 0 }}
                        testID="modal-text"
                    >
                        { modalMsg }
                    </Text>

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

export default FinishOrStartCourseModal;