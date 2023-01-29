import React, { FC, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

import { Modal } from '../../ui';

import { ModalActions } from './ModalActions';
import { DatetimeField } from '../../../components/ui';

import { useCourses, useTheme } from '../../../hooks';

import { ModalProps } from '../../../interfaces/ui';

import { styles as themeStyles } from '../../../theme';

const FinishOrStartLessonModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    const [ reschedule, setReschedule ] = useState<boolean>(false);

    const { state: { selectedLesson, isLessonLoading }, finishOrStartLesson } = useCourses();
    const { state: { colors } } = useTheme();

    const modalMsg = (selectedLesson.done)
        ? '¿Está seguro de reprogramar está clase?'
        : '¿Está seguro de terminar está clase?';

    const handleClose = () => {
        setReschedule(false);
        onClose();
    }

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
                                    <Text
                                        style={{
                                            ...themeStyles.modalText,
                                            color: colors.modalText
                                        }}
                                    >
                                        { modalMsg }
                                    </Text>

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
                                            <Text
                                                style={{
                                                    ...themeStyles.modalText,
                                                    color: colors.modalText
                                                }}
                                            >
                                                Por favor ingrese la fecha en la se dará la clase
                                            </Text>

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
                    />
                )
            }
        </Modal>
    );
}

export default FinishOrStartLessonModal;