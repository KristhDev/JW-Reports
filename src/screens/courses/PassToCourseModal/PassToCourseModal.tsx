import React, { FC, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

import { Modal } from '../../ui';

import { ModalActions } from './ModalActions';
import { FormField } from '../../../components/ui';

import { useCourses, useRevisits, useStatus, useTheme } from '../../../hooks';

import { PassToCourseModalProps } from './interfaces';

import themeStyles from '../../../theme/styles';

const PassToCourseModal: FC<PassToCourseModalProps> = ({ isOpen, onClose }) => {
    const [ startCourse, setStartCourse ] = useState<boolean>(false);

    const { state: { selectedRevisit } } = useRevisits();
    const { state: { isCourseLoading }, saveCourse } = useCourses();
    const { setStatus } = useStatus();
    const { state: { colors } } = useTheme();

    const handleConfirm = (values?: { publication: string }) => {
        if (startCourse) {
            if (values?.publication && values?.publication.length >= 5) {
                saveCourse({
                    person_name: selectedRevisit.person_name,
                    person_about: selectedRevisit.about,
                    person_address: selectedRevisit.address,
                    publication: values?.publication!
                }, onClose);
            }
            else {
                setStatus({
                    code: 400,
                    msg: 'El nombre de la publicación debe tener al menos 5 caracteres.',
                });

                onClose();
            }

            setStartCourse(false);
        }
        else {
            setStartCourse(true);
        }
    }

    const handleClose = () => {
        onClose();
        setStartCourse(false);
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
                        {
                            (!startCourse) ? (
                                <>
                                    <Text
                                        style={{
                                            ...themeStyles.modalText,
                                            color: colors.modalText
                                        }}
                                    >
                                        ¿Está seguro de comenzar un curso bíblico con { selectedRevisit.person_name }?
                                    </Text>

                                    <ModalActions
                                        onClose={ handleClose }
                                        onConfirm={ handleConfirm }
                                    />
                                </>
                            ) : (
                                <Formik
                                    initialValues={{ publication: '' }}
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
                                                Por favor ingrese el nombre de la publicación de estudio
                                            </Text>

                                            <FormField
                                                icon={
                                                    <Icon
                                                        color={ colors.icon }
                                                        name="book-outline"
                                                        size={ 25 }
                                                    />
                                                }
                                                label="Publicación de estudio:"
                                                name="publication"
                                                placeholder="Ingrese la publicación"
                                                style={{ width: '100%' }}
                                            />

                                            <ModalActions
                                                onClose={ handleClose }
                                                onConfirm={ handleSubmit }
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

export default PassToCourseModal;