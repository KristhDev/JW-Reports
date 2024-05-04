import React, { FC, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

/* Screens */
import { FormField, Modal, ModalProps,  } from '../../../ui';

/* Components */
import { ModalActions } from './ModalActions';

/* Hooks */
import { useCourses } from '../../hooks';
import { useRevisits } from '../../../revisits';
import { useStatus } from '../../../shared';

/* Theme */
import { styles as themeStylesheet } from '../../../theme';

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
    const { styles: themeStyles, theme: { colors, margins } } = useStyles(themeStylesheet);

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
                                    <Text style={{ ...themeStyles.modalText, marginBottom: margins.md }}>
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
                    ) }
                </View>
            ) : (
                <ActivityIndicator
                    color={ colors.button }
                    size={ 50 }
                />
            ) }
        </Modal>
    );
}

export default PassToCourseModal;