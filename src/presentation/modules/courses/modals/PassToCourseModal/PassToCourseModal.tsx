import React, { FC, useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useFormik } from 'formik';
import Ionicons from '@expo/vector-icons/Ionicons';

/* DI */
import { messagesService, placeholdersService } from '@config/di';

/* Screens */
import { Modal } from '@ui/screens';

/* Components */
import { FormField, ModalActions } from '@ui/components';

/* Hooks */
import { useCourses } from '../../hooks';
import { useRevisits } from '@revisits/hooks';
import { useToaster, useTranslation } from '@ui/hooks';

/* Interfaces */
import { ModalProps } from '@ui/interfaces';

/* Theme */
import { themeStylesheet } from '@theme/styles';

/**
 * This modal is responsible for grouping the components to
 * revisit a course.
 *
 * @param {ModalProps} { isOpen: boolean, onClose: () => void }
 * @return {JSX.Element} rendered component to show modal
 */
const PassToCourseModal: FC<ModalProps> = ({ isOpen, onClose }): JSX.Element => {
    const coursesMessages = messagesService.coursesMessages;
    const coursesPlaceholders = placeholdersService.coursesPlaceholders;
    const [ startCourse, setStartCourse ] = useState<boolean>(false);

    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { selectedRevisit } } = useRevisits();
    const { state: { isCourseLoading }, saveCourse } = useCourses();
    const { showToast } = useToaster();
    const { translate } = useTranslation();

    const startCourseTitle = translate('modals.courses.titles.startCourse', { person: selectedRevisit.personName });

    /**
     * This is the confirmation function of the modal that executes one or another function
     * depending on startCourse or the function parameters.
     *
     * @param {{ publication: string }} values - This is the values with publication property to create course
     * @return {void} This function does not return anything
     */
    const handleConfirm = (values?: { publication: string }): void => {
        if (!startCourse) {
            setStartCourse(true);
            return;
        }

        if (!values?.publication || values?.publication.length === 0) {
            showToast(coursesMessages.PUBLICATION_MIN_LENGTH);
            onClose();
            setStartCourse(false);

            return;
        }

        const data = {
            personName: selectedRevisit.personName,
            personAbout: selectedRevisit.about,
            personAddress: selectedRevisit.address,
            publication: values?.publication!
        }

        saveCourse(data, { onFinish: onClose });
        setStartCourse(false);
    }

    const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
        initialValues: { publication: '' },
        onSubmit: handleConfirm
    });

    /**
     * When the user clicks the close button, the modal closes and the startCourse state is set to
     * false.
     *
     * @return {void} This function does not return anything
     */
    const handleClose = (): void => {
        onClose();
        setStartCourse(false);
    }

    useEffect(() => {
        setFieldValue('publication', '');
    }, [ startCourse ]);

    return (
        <Modal isOpen={ isOpen }>
            { (!isCourseLoading) ? (
                <View style={ themeStyles.modalContainer }>
                    { (!startCourse) ? (
                        <>

                            {/* Modal title */}
                            <Text
                                style={{ ...themeStyles.modalText, marginBottom: 0 }}
                                testID="modal-text"
                            >
                                { startCourseTitle }
                            </Text>

                            {/* Modal actions */}
                            <ModalActions
                                cancelButtonText={ translate('forms.actions.cancel').toUpperCase() }
                                confirmTextButton={ translate('forms.actions.accept').toUpperCase() }
                                onCancel={ handleClose }
                                onConfirm={ handleConfirm }
                                showCancelButton
                                showConfirmButton
                            />
                        </>
                    ) : (
                        <View>

                            {/* Modal title in form */}
                            <Text style={{ ...themeStyles.modalText, marginBottom: margins.md }}>
                                { coursesMessages.WRITE_STUDY_PUBLICATION }
                            </Text>

                            {/* Publication field */}
                            <FormField
                                leftIcon={
                                    <Ionicons
                                        color={ colors.icon }
                                        name="book-outline"
                                        size={ fontSizes.icon }
                                    />
                                }
                                label={ translate('forms.labels.studyPublication') }
                                onChangeText={ handleChange('publication') }
                                placeholder={ coursesPlaceholders.PUBLICATION }
                                style={{ marginBottom: 0 }}
                                value={ values.publication }
                            />

                            {/* Modal actions in form */}
                            <ModalActions
                                cancelButtonText={ translate('forms.actions.cancel').toUpperCase() }
                                confirmTextButton={ translate('forms.actions.accept').toUpperCase() }
                                onCancel={ handleClose }
                                onConfirm={ handleSubmit }
                                showCancelButton
                                showConfirmButton
                            />
                        </View>
                    ) }
                </View>
            ) : (
                <ActivityIndicator
                    color={ colors.button }
                    size={ fontSizes.xxl }
                />
            ) }
        </Modal>
    );
}

export default PassToCourseModal;