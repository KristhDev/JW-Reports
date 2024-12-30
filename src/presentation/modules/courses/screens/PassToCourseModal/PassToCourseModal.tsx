import React, { FC, useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useFormik } from 'formik';
import Ionicons from '@expo/vector-icons/Ionicons';

/* UI */
import { FormField, Modal, ModalProps, ModalActions } from '@ui';

/* Hooks */
import { useCourses } from '../../hooks';
import { useRevisits } from '@revisits';
import { useStatus } from '@shared';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This modal is responsible for grouping the components to
 * revisit a course.
 *
 * @param {ModalProps} { isOpen: boolean, onClose: () => void }
 * @return {JSX.Element} rendered component to show modal
 */
const PassToCourseModal: FC<ModalProps> = ({ isOpen, onClose }): JSX.Element => {
    const [ startCourse, setStartCourse ] = useState<boolean>(false);

    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { selectedRevisit } } = useRevisits();
    const { state: { isCourseLoading }, saveCourse } = useCourses();
    const { setStatus } = useStatus();

    /**
     * This is the confirmation function of the modal that executes one or another function
     * depending on startCourse or the function parameters.
     *
     * @param {{ publication: string }} values - This is the values with publication property to create course
     * @return {void} This function does not return anything
     */
    const handleConfirm = (values?: { publication: string }): void => {
        if (startCourse) {
            if (values?.publication && values?.publication.length >= 5) {
                saveCourse({
                    personName: selectedRevisit.personName,
                    personAbout: selectedRevisit.about,
                    personAddress: selectedRevisit.address,
                    publication: values?.publication!
                }, false, onClose);
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
                                ¿Está seguro de comenzar un curso bíblico con { selectedRevisit.personName }?
                            </Text>

                            {/* Modal actions */}
                            <ModalActions
                                cancelButtonText="CANCELAR"
                                confirmTextButton="ACEPTAR"
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
                                Por favor ingrese el nombre de la publicación de estudio
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
                                label="Publicación de estudio:"
                                onChangeText={ handleChange('publication') }
                                placeholder="Ingrese la publicación"
                                style={{ marginBottom: 0 }}
                                value={ values.publication }
                            />

                            {/* Modal actions in form */}
                            <ModalActions
                                cancelButtonText="CANCELAR"
                                confirmTextButton="ACEPTAR"
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