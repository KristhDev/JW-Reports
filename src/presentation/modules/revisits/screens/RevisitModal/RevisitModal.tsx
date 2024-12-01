import React, { useState, FC } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useFormik } from 'formik';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Modules */
import { themeStylesheet } from '@theme';
import { DatetimeField, FormCalendar, FormField, Modal, ModalActions, ModalProps, useUI } from '@ui';

/* Hooks */
import { useRevisits } from '../../hooks';
import { useStatus } from '@shared';

/* Scahemas */
import { newRevisitFormSchema } from './schemas';

/**
 * This modal is responsible for grouping the components to
 * reschedule a revisit.
 *
 * @param {ModalProps} { isOpen: boolean, onClose: () => void }
 * @returns {JSX.Element} Rendered component to show modal
 */
const RevisitModal: FC<ModalProps> = ({ isOpen, onClose }): JSX.Element => {
    const [ completeMsg, setCompleteMsg ] = useState<string>('');
    const [ revisitPerson, setRevisitPerson ] = useState<boolean>(false);

    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { selectedRevisit, isRevisitLoading }, completeRevisit, saveRevisit } = useRevisits();
    const { setErrorForm } = useStatus();
    const { state: { userInterface } } = useUI();

    const modalTitle = (selectedRevisit.done)
        ? `¿Quieres volver a visitar a ${ selectedRevisit.personName }?`
        : '¿Está seguro de marcar esta revisitada como visitada?';

    const confirmTextButton = (revisitPerson)
        ? 'GUARDAR'
        : (selectedRevisit.done)
            ? 'ACEPTAR'
            : 'MARCAR';

    /**
     * If the selectedRevisit.done is false, then call completeRevisit, otherwise if
     * selectedRevisit.done is true and values.next_visit is false, then setRevisitPerson to true,
     * otherwise if values.next_visit is true, then setRevisitPerson to false and call saveRevisit.
     * @param {{ about: string, nextVisit: Date }} values - { about: string, next_visit: Date }
     */
    const handleConfirm = async (values?: { about: string, nextVisit: Date }) => {
        if (!selectedRevisit.done) {
            const msg = await completeRevisit(onClose);
            setCompleteMsg(msg);
        }
        else if (selectedRevisit.done && !values?.nextVisit) {
            setRevisitPerson(true);
        }
        else if (values?.nextVisit) {
            setRevisitPerson(false);
            saveRevisit({
                revisitValues: {
                    ...values,
                    address: selectedRevisit.address,
                    personName: selectedRevisit.personName
                },
                image: null,
                back: false,
                onFinish: onClose
            });
        }
    }

    const { errors, handleChange, handleSubmit, setFieldValue, isValid, values } = useFormik({
        initialValues: {
            about: selectedRevisit.about,
            nextVisit: new Date()
        },
        onSubmit: handleConfirm,
        validateOnMount: true,
        validationSchema: newRevisitFormSchema
    });

    /**
     * When the user clicks the close button, the modal will close and the revisitPerson state will be
     * set to false.
     */
    const handleClose = () => {
        setRevisitPerson(false);
        onClose();
    }

    /**
     * Handles the press event of the save button by submitting the form
     * if it is valid or showing the errors if it is not.
     *
     * @return {void} This function does not return anything.
     */
    const handlePress = (): void => {
        if (isValid) handleSubmit();
        else setErrorForm(errors);
    }

    return (
        <Modal isOpen={ isOpen }>
            { (!isRevisitLoading) ? (
                <View style={ themeStyles.modalContainer }>

                    {/* Complete message */}
                    { (completeMsg !== '') && (
                        <Text
                            style={{ ...themeStyles.modalText, marginBottom: margins.xl }}
                            testID="revisit-modal-complete-msg"
                        >
                            { completeMsg }
                        </Text>
                    ) }

                    {/* Modal title and actions */}
                    { (!revisitPerson) ? (
                        <>
                            <Text
                                style={{ ...themeStyles.modalText, marginBottom: 0 }}
                                testID="revisit-modal-title"
                            >
                                { modalTitle }
                            </Text>

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
                        <>

                            {/* Modal title in form */}
                            <Text
                                style={{ ...themeStyles.modalText, marginBottom: margins.xl }}
                                testID="revisit-modal-title"
                            >
                                Por favor verifica los siguientes datos.
                            </Text>

                            <View style={{ alignItems: 'center' }}>

                                {/* About field */}
                                <FormField
                                    controlStyle={{ paddingVertical: margins.xs + 2 }}
                                    editable={ !isRevisitLoading }
                                    inputStyle={{ minHeight: margins.sm * 10 }}
                                    label="Información actual:"
                                    multiline
                                    numberOfLines={ 10 }
                                    onChangeText={ handleChange('about') }
                                    placeholder="Ingrese datos sobre la persona, tema de conversación, aspectos importantes, etc..."
                                    value={ values.about }
                                />

                                {/* Next visit field */}
                                { (userInterface.oldDatetimePicker) ? (
                                    <DatetimeField
                                        disabled={ isRevisitLoading }
                                        icon={
                                            <Ionicons
                                                color={ colors.contentHeader }
                                                name="calendar-outline"
                                                size={ fontSizes.icon }
                                            />
                                        }
                                        inputDateFormat="DD/MM/YYYY"
                                        label="Próxima visita:"
                                        modalTitle="Próxima visita"
                                        mode="date"
                                        onChangeDate={ (date: string) => setFieldValue('nextVisit', Time.toDate(date)) }
                                        placeholder="Seleccione el día"
                                        style={{ marginBottom: 0 }}
                                        value={ values.nextVisit.toString() }
                                    />
                                ) : (
                                    <FormCalendar
                                        editable={ !isRevisitLoading }
                                        icon={
                                            <Ionicons
                                                color={ colors.contentHeader }
                                                name="calendar-outline"
                                                size={ fontSizes.icon }
                                            />
                                        }
                                        inputDateFormat="DD/MM/YYYY"
                                        label="Próxima visita:"
                                        onChangeDate={ (date: string) => setFieldValue('nextVisit', Time.toDate(date)) }
                                        style={{ marginBottom: 0 }}
                                        value={ values.nextVisit.toString() }
                                    />
                                ) }

                                {/* Modal actions */}
                                <ModalActions
                                    cancelButtonText="CANCELAR"
                                    confirmTextButton={ confirmTextButton }
                                    onCancel={ handleClose }
                                    onConfirm={ handlePress }
                                    showCancelButton
                                    showConfirmButton
                                />
                            </View>
                        </>
                    ) }
                </View>
            ) : (
                <ActivityIndicator
                    color={ colors.button }
                    size={ fontSizes.xxl }
                    testID="revisit-modal-loading"
                />
            ) }
        </Modal>
    );
}

export default RevisitModal;