import React, { FC, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

/* Screens */
import { Modal } from '../../ui';

/* Components */
import { ModalActions } from './ModalActions';
import { DatetimeField } from '../../../components/ui';

/* Hooks */
import { useCourses, useTheme } from '../../../hooks';

/* Interfaces */
import { ModalProps } from '../../../interfaces/ui';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This modal is responsible for grouping the components to finish
 * or start a lesson again.
 * @param {ModalProps} { isOpen: boolean, onClose: () => void }
 */
const FinishOrStartLessonModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    const [ reschedule, setReschedule ] = useState<boolean>(false);

    const { state: { selectedLesson, isLessonLoading }, finishOrStartLesson } = useCourses();
    const { state: { colors } } = useTheme();

    const modalMsg = (selectedLesson.done)
        ? '¿Está seguro de reprogramar esta clase?'
        : '¿Está seguro de terminar esta clase?';

    /**
     * When the user clicks the close button, the modal will close and the onClose function will be
     * called.
     */
    const handleClose = () => {
        setReschedule(false);
        onClose();
    }

    /**
     * This is the confirmation function of the modal that executes one or another function
     * depending on selectdLesson, the reschedule state or the function parameters.
     * @param {{ next_lesson: Date }} values - This is the values with next_lesson property to lesson
     */
    const handleConfirm = (values?: { next_lesson: Date }) => {
        if (!reschedule && !selectedLesson.done) {
            finishOrStartLesson(new Date(selectedLesson.next_lesson), handleClose);
        }
        else if (reschedule && selectedLesson.done) {
            finishOrStartLesson(values?.next_lesson || new Date(), handleClose);
        }
        else {
            setReschedule(true);
        }
    }

    return (
        <Modal isOpen={ isOpen }>
            {
                (!isLessonLoading) ? (
                    <View
                        style={{
                            ...themeStyles.modalContainer,
                            backgroundColor: colors.modal
                        }}
                    >
                        {
                            (!reschedule) ? (
                                <>

                                    {/* Modal title  */}
                                    <Text
                                        style={{
                                            ...themeStyles.modalText,
                                            color: colors.modalText
                                        }}
                                        testID="modal-text"
                                    >
                                        { modalMsg }
                                    </Text>

                                    {/* Modal actions */}
                                    <ModalActions
                                        onClose={ handleClose }
                                        onConfirm={ handleConfirm }
                                        reschedule={ reschedule }
                                    />
                                </>
                            ) : (
                                <Formik
                                    initialValues={{
                                        next_lesson: new Date(selectedLesson.next_lesson)
                                    }}
                                    onSubmit={ handleConfirm }
                                >
                                    { ({ handleSubmit }) => (
                                        <>

                                            {/* Modal title in form */}
                                            <Text
                                                style={{
                                                    ...themeStyles.modalText,
                                                    color: colors.modalText
                                                }}
                                            >
                                                Por favor ingrese la fecha en la se dará la clase
                                            </Text>

                                            {/* Next lesson field */}
                                            <DatetimeField
                                                icon={
                                                    <Icon
                                                        color={ colors.contentHeader }
                                                        name="calendar-outline"
                                                        size={ 25 }
                                                    />
                                                }
                                                inputDateFormat="DD/MM/YYYY"
                                                label="Reprogramar clase:"
                                                modalTitle="Reprogramar clase"
                                                mode="date"
                                                name="next_lesson"
                                                placeholder="Seleccione el día"
                                                style={{ width: '100%' }}
                                            />

                                            {/* Modal actions */}
                                            <ModalActions
                                                onClose={ handleClose }
                                                onConfirm={ handleSubmit }
                                                reschedule={ reschedule }
                                            />
                                        </>
                                    ) }
                                </Formik>
                            )
                        }
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

export default FinishOrStartLessonModal;