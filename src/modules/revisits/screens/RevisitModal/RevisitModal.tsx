import React, { useState, FC } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

/* Modules */
import { DatetimeField, FormField, Modal, ModalActions, ModalProps } from '../../../ui';
import { styles as themeStylesheet } from '../../../theme';

/* Hooks */
import { useRevisits } from '../../hooks';
import { useStatus } from '../../../shared';

/* Scahemas */
import { revisitFormSchema } from './schemas';

/**
 * This modal is responsible for grouping the components to
 * reschedule a revisit.
 * @param {ModalProps} { isOpen: boolean, onClose: () => void }
 */
const RevisitModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    const [ completeMsg, setCompleteMsg ] = useState<string>('');
    const [ revisitPerson, setRevisitPerson ] = useState<boolean>(false);

    const { state: { selectedRevisit, isRevisitLoading }, completeRevisit, saveRevisit } = useRevisits();
    const { setErrorForm } = useStatus();
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

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
                back: false,
                onFinish: onClose
            });
        }
    }

    /**
     * When the user clicks the close button, the modal will close and the revisitPerson state will be
     * set to false.
     */
    const handleClose = () => {
        setRevisitPerson(false);
        onClose();
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

                            <Formik
                                initialValues={{
                                    about: selectedRevisit.about,
                                    nextVisit: new Date()
                                }}
                                onSubmit={ handleConfirm }
                                validateOnMount
                                validationSchema={ revisitFormSchema }
                            >
                                { ({ handleSubmit, isValid, errors }) => (
                                    <View style={{ alignItems: 'center' }}>

                                        {/* About field */}
                                        <FormField
                                            label="Información actual:"
                                            multiline
                                            name="about"
                                            numberOfLines={ 10 }
                                            placeholder="Ingrese datos sobre la persona, tema de conversación, aspectos importantes, etc..."
                                        />

                                        {/* Next visit field */}
                                        <DatetimeField
                                            icon={
                                                <Icon
                                                    color={ colors.contentHeader }
                                                    name="calendar-outline"
                                                    size={ fontSizes.icon }
                                                />
                                            }
                                            inputDateFormat="DD/MM/YYYY"
                                            label="Próxima visita:"
                                            modalTitle="Próxima visita"
                                            mode="date"
                                            name="nextVisit"
                                            placeholder="Seleccione el día"
                                            style={{ marginBottom: 0 }}
                                        />

                                        {/* Modal actions */}
                                        <ModalActions
                                            cancelButtonText="CANCELAR"
                                            confirmTextButton={ confirmTextButton }
                                            onCancel={ handleClose }
                                            onConfirm={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                                            showCancelButton
                                            showConfirmButton
                                        />
                                    </View>
                                ) }
                            </Formik>
                        </>
                    ) }
                </View>
            ) : (
                <ActivityIndicator
                    color={ colors.button }
                    size={ (fontSizes.xxl + 2) }
                    testID="revisit-modal-loading"
                />
            ) }
        </Modal>
    );
}

export default RevisitModal;