import React, { FC, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

/* Screens */
import { Modal } from '../../ui';

/* Components */
import { ModalActions } from './ModalActions';
import { FormField } from '../../../components/ui';

/* Hooks */
import { useCourses, useRevisits, useStatus, useTheme } from '../../../hooks';

/* Interfaces */
import { ModalProps } from '../../../interfaces';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This modal is responsible for grouping the components to
 * revisit a course.
 *
 * @param {ModalProps} { isOpen: boolean, onClose: () => void }
 * @return {JSX.Element} rendered component to show modal
 */
const PassToCourseModal: FC<ModalProps> = ({ isOpen, onClose }): JSX.Element => {
    const [ startCourse, setStartCourse ] = useState<boolean>(false);

    const { state: { selectedRevisit } } = useRevisits();
    const { state: { isCourseLoading }, saveCourse } = useCourses();
    const { setStatus } = useStatus();
    const { state: { colors } } = useTheme();

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

                                    {/* Modal title */}
                                    <Text
                                        style={{
                                            ...themeStyles.modalText,
                                            marginBottom: 0,
                                            color: colors.modalText
                                        }}
                                        testID="modal-text"
                                    >
                                        ¿Está seguro de comenzar un curso bíblico con { selectedRevisit.personName }?
                                    </Text>

                                    {/* Modal actions */}
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
                                        <View>

                                            {/* Modal title in form */}
                                            <Text
                                                style={{
                                                    ...themeStyles.modalText,
                                                    marginBottom: 24,
                                                    color: colors.modalText
                                                }}
                                            >
                                                Por favor ingrese el nombre de la publicación de estudio
                                            </Text>

                                            {/* Publication field */}
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
                                                style={{ marginBottom: 0 }}
                                            />

                                            {/* Modal actions in form */}
                                            <ModalActions
                                                onClose={ handleClose }
                                                onConfirm={ handleSubmit }
                                            />
                                        </View>
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