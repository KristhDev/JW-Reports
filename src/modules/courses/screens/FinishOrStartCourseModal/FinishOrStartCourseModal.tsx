import React, { FC } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Modules */
import { Modal, ModalProps, ModalActions } from '../../../ui';
import { useCourses } from '../../hooks';
import { styles as themeStylesheet } from '../../../theme';

/**
 * This modal is responsible for grouping the components to finish
 * or start a course again.
 *
 * @param {ModalProps} { isOpen: boolean, onClose: () => void }
 * @return {JSX.Element} rendered component to show modal
 */
const FinishOrStartCourseModal: FC<ModalProps> = ({ isOpen, onClose }): JSX.Element => {
    const { state: { selectedCourse, isCourseLoading }, finishOrStartCourse } = useCourses();
    const { styles: themeStyles, theme: { colors, fontSizes } } = useStyles(themeStylesheet);

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
                    size={ (fontSizes.xxl + 2) }
                    testID="modal-loading"
                />
            ) }
        </Modal>
    );
}

export default FinishOrStartCourseModal;