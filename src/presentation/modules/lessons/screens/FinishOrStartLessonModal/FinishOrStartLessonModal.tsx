import React, { FC, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useFormik } from 'formik';
import { useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';

/* DI */
import { timeAdapter, placeholdersService } from '@config/di';

/* Screens */
import { Modal } from '@ui/screens';

/* Components */
import { ModalActions, FormCalendar, DatetimeField } from '@ui/components';

/* Hooks */
import { useLessons } from '../../hooks';
import { useTranslation, useUI } from '@ui/hooks';

import { ModalProps } from '@ui/interfaces';

/* Styles */
import { themeStylesheet } from '@theme/styles';

/**
 * This modal is responsible for grouping the components to finish
 * or start a lesson again.
 *
 * @param {ModalProps} { isOpen: boolean, onClose: () => void }
 * @return {JSX.Element} rendered component to show list of modal
 */
const FinishOrStartLessonModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    const LESSONS_PLACEHOLDERS = placeholdersService.lessonsPlaceholders;

    const [ reschedule, setReschedule ] = useState<boolean>(false);

    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { selectedLesson, isLessonLoading }, finishOrStartLesson } = useLessons();
    const { translate } = useTranslation();
    const { state: { userInterface } } = useUI();

    const reprogramModalTitle = translate('modals.titles.reprogramAsk', {
        article: 'esta',
        attribute: translate('entities.lesson')
    });

    const finishModalTitle = translate('modals.titles.finishAsk', {
        article: 'esta',
        attribute: translate('entities.lesson')
    });

    const modalMsg = (selectedLesson.done) ? reprogramModalTitle : finishModalTitle;

    const confirmTextButton = (reschedule)
        ? translate('forms.actions.accept').toUpperCase()
        : (selectedLesson.done)
            ? translate('forms.actions.reprogram').toUpperCase() 
            : translate('forms.actions.finish').toUpperCase();

    /**
     * When the user clicks the close button, the modal will close and the onClose function will be
     * called.
     *
     * @return {void} This function does not return anything.
     */
    const handleClose = (): void => {
        setReschedule(false);
        onClose();
    }

    /**
     * This is the confirmation function of the modal that executes one or another function
     * depending on selectdLesson, the reschedule state or the function parameters.
     *
     * @param {{ nextLesson: Date }} values - This is the values with nextLesson property to lesson
     * @return {void} This function does not return anything
     */
    const handleConfirm = (values?: { nextLesson: Date }): void => {
        if (!reschedule && !selectedLesson.done) {
            finishOrStartLesson(new Date(selectedLesson.nextLesson), handleClose);
        }
        else if (reschedule && selectedLesson.done) {
            finishOrStartLesson(values?.nextLesson || new Date(), handleClose);
        }
        else {
            setReschedule(true);
        }
    }

    const { handleSubmit, setFieldValue, values } = useFormik({
        initialValues: { nextLesson: new Date(selectedLesson.nextLesson) },
        onSubmit: handleConfirm
    });

    return (
        <Modal isOpen={ isOpen }>
            { (!isLessonLoading) ? (
                <View style={ themeStyles.modalContainer }>
                    { (!reschedule) ? (
                        <>

                            {/* Modal title  */}
                            <Text
                                style={ themeStyles.modalText }
                                testID="modal-text"
                            >
                                { modalMsg }
                            </Text>

                            {/* Modal actions */}
                            <ModalActions
                                cancelButtonText={ translate('forms.actions.cancel').toUpperCase() }
                                confirmTextButton={ confirmTextButton }
                                onCancel={ handleClose }
                                onConfirm={ handleConfirm }
                                showCancelButton
                                showConfirmButton
                            />
                        </>
                    ) : (
                        <>

                            {/* Modal title in form */}
                            <Text style={{ ...themeStyles.modalText, marginBottom: margins.md }}>
                                { translate('modals.lessons.descriptions.reprogramLesson') }
                            </Text>

                            {/* Next lesson field */}
                            { (userInterface.oldDatetimePicker) ? (
                                <DatetimeField
                                    disabled={ isLessonLoading }
                                    icon={
                                        <Ionicons
                                            color={ colors.contentHeader }
                                            name="calendar-outline"
                                            size={ fontSizes.icon }
                                        />
                                    }
                                    inputDateFormat="DD/MM/YYYY"
                                    label={ translate('forms.labels.lessons.reprogramLesson') }
                                    mode="date"
                                    onChangeDate={ (date: string) => setFieldValue('nextLesson', timeAdapter.toDate(date)) }
                                    placeholder={ LESSONS_PLACEHOLDERS.SELECT_DAY }
                                    style={{ marginBottom: 0 }}
                                    value={ values.nextLesson.toString() }
                                />
                            ) : (
                                <FormCalendar
                                    editable={ !isLessonLoading }
                                    icon={
                                        <Ionicons
                                            color={ colors.contentHeader }
                                            name="calendar-outline"
                                            size={ fontSizes.icon }
                                        />
                                    }
                                    inputDateFormat="DD/MM/YYYY"
                                    label={ translate('forms.labels.lessons.reprogramLesson') }
                                    onChangeDate={ (date: string) => setFieldValue('nextLesson', timeAdapter.toDate(date)) }
                                    style={{ marginBottom: 0 }}
                                    value={ values.nextLesson.toString() }
                                />
                            ) }

                            {/* Modal actions */}
                            <ModalActions
                                cancelButtonText={ translate('forms.actions.cancel').toUpperCase() }
                                confirmTextButton={ confirmTextButton }
                                onCancel={ handleClose }
                                onConfirm={ handleSubmit }
                                showCancelButton
                                showConfirmButton
                            />
                        </>
                    ) }
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

export default FinishOrStartLessonModal;