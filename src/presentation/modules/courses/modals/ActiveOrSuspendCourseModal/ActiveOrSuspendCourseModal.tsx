import React, { FC } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Screens */
import { Modal } from '@ui/screens';

/* Components */
import { ModalActions } from '@ui/components';

/* Hooks */
import { useCourses } from '../../hooks';
import { useTranslation } from '@ui/hooks';

/* Interfaces */
import { ModalProps } from '@ui/interfaces';

/* Styles */
import { themeStylesheet } from '@theme/styles';

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

    const { translate } = useTranslation();

    const continueCourseQuestion = translate('modals.titles.continueAsk', {
        article: 'este',
        attribute: translate('entities.course')
    });

    const suspendCourseQuestion = translate('modals.titles.suspendAsk', {
        article: 'este',
        attribute: translate('entities.course')
    });

    const modalMsg = (selectedCourse.suspended) ? continueCourseQuestion : suspendCourseQuestion;

    const confirmTextButton = (selectedCourse.suspended)
        ? translate('forms.actions.accept').toUpperCase()
        : translate('forms.actions.suspend').toUpperCase();

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
                        cancelButtonText={ translate('forms.actions.cancel').toUpperCase() }
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