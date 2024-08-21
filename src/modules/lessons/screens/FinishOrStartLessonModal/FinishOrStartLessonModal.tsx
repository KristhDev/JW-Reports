import React, { FC, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Formik } from 'formik';
import { useStyles } from 'react-native-unistyles';
import Icon from 'react-native-vector-icons/Ionicons';

/* Modules */
import { Modal, ModalActions, ModalProps, FormCalendar, useUI, DatetimeField } from '../../../ui';
import { useLessons } from '../../hooks';
import { themeStylesheet } from '../../../theme';

/**
 * This modal is responsible for grouping the components to finish
 * or start a lesson again.
 *
 * @param {ModalProps} { isOpen: boolean, onClose: () => void }
 * @return {JSX.Element} rendered component to show list of modal
 */
const FinishOrStartLessonModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    const [ reschedule, setReschedule ] = useState<boolean>(false);

    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { selectedLesson, isLessonLoading }, finishOrStartLesson } = useLessons();
    const { state: { userInterface } } = useUI();

    const modalMsg = (selectedLesson.done)
        ? '¿Está seguro de reprogramar esta clase?'
        : '¿Está seguro de terminar esta clase?';

    const confirmTextButton = (reschedule)
        ? 'ACEPTAR'
        : (selectedLesson.done)
            ? 'REPROGRAMAR' : 'TERMINAR';


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
                                cancelButtonText="CANCELAR"
                                confirmTextButton={ confirmTextButton }
                                onCancel={ handleClose }
                                onConfirm={ handleConfirm }
                                showCancelButton
                                showConfirmButton
                            />
                        </>
                    ) : (
                        <Formik
                            initialValues={{
                                nextLesson: new Date(selectedLesson.nextLesson)
                            }}
                            onSubmit={ handleConfirm }
                        >
                            { ({ handleSubmit }) => (
                                <>

                                    {/* Modal title in form */}
                                    <Text style={{ ...themeStyles.modalText, marginBottom: margins.md }}>
                                        Por favor ingrese la fecha en la se dará la clase
                                    </Text>

                                    {/* Next lesson field */}
                                    { (userInterface.oldDatetimePicker) ? (
                                        <DatetimeField
                                            icon={
                                                <Icon
                                                    color={ colors.contentHeader }
                                                    name="calendar-outline"
                                                    size={ fontSizes.icon }
                                                />
                                            }
                                            inputDateFormat="DD/MM/YYYY"
                                            label="Reprogramar clase:"
                                            modalTitle="Reprogramar clase"
                                            mode="date"
                                            name="nextLesson"
                                            placeholder="Seleccione el día"
                                            style={{ marginBottom: 0 }}
                                        />
                                    ) : (
                                        <FormCalendar
                                            icon={
                                                <Icon
                                                    color={ colors.contentHeader }
                                                    name="calendar-outline"
                                                    size={ fontSizes.icon }
                                                />
                                            }
                                            inputDateFormat="DD/MM/YYYY"
                                            label="Reprogramar clase:"
                                            name="nextLesson"
                                            style={{ marginBottom: 0 }}
                                        />
                                    ) }

                                    {/* Modal actions */}
                                    <ModalActions
                                        cancelButtonText="CANCELAR"
                                        confirmTextButton={ confirmTextButton }
                                        onCancel={ handleClose }
                                        onConfirm={ handleSubmit }
                                        showCancelButton
                                        showConfirmButton
                                    />
                                </>
                            ) }
                        </Formik>
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