import React, { useState, FC } from 'react';
import { KeyboardAvoidingView, View, Text, ActivityIndicator, ScrollView, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { date, object, string } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

/* Screens */
import { Modal } from '../../ui';

/* Components */
import { DatetimeField, FormField } from '../../../components/ui';
import { ModalActions } from './ModalActions';

/* Hooks */
import { useRevisits, useStatus, useTheme } from '../../../hooks';

/* Interfaces */
import { ModalProps } from '../../../interfaces';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This modal is responsible for grouping the components to
 * reschedule a revisit.
 * @param {ModalProps} { isOpen: boolean, onClose: () => void }
 */
const RevisitModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    const [ completeMsg, setCompleteMsg ] = useState<string>('');
    const [ revisitPerson, setRevisitPerson ] = useState<boolean>(false);

    const { top } = useSafeAreaInsets();
    const { width } = useWindowDimensions();

    const { state: { selectedRevisit, isRevisitLoading }, completeRevisit, saveRevisit } = useRevisits();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    const modalTitle = (selectedRevisit.done)
        ? `¿Quieres volver a visitar a ${ selectedRevisit.personName }?`
        : '¿Está seguro de marcar esta revisitada como visitada?';

    /* Validation schema for revisit */
    const revisitFormSchema = object().shape({
        about: string()
            .min(10, 'La información de la persona debe tener al menos 10 caracteres.')
            .required('La información de la persona es requerida.'),
        next_visit: date()
            .required('La fecha de la próxima visita no puede estar vacía'),
    });

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
            <KeyboardAvoidingView
                behavior="padding"
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{
                        alignItems: 'center',
                        flexGrow: 1,
                        justifyContent: 'center',
                        paddingVertical: top,
                    }}
                    overScrollMode="never"
                    showsVerticalScrollIndicator={ false }
                >
                    { (!isRevisitLoading) ? (
                        <View
                            style={{
                                ...themeStyles.modalContainer,
                                backgroundColor: colors.modal,
                                width: width - 16,
                            }}
                        >

                            {/* Complete message */}
                            { (completeMsg !== '') && (
                                <Text
                                    style={{
                                        ...themeStyles.modalText,
                                        color: colors.modalText,
                                        marginBottom: 40
                                    }}
                                    testID="revisit-modal-complete-msg"
                                >
                                    { completeMsg }
                                </Text>
                            ) }

                            {/* Modal title and actions */}
                            { (!revisitPerson) ? (
                                <>
                                    <Text
                                        style={{
                                            ...themeStyles.modalText,
                                            color: colors.modalText,
                                            marginBottom: 0
                                        }}
                                        testID="revisit-modal-title"
                                    >
                                        { modalTitle }
                                    </Text>

                                    <ModalActions
                                        onClose={ handleClose }
                                        onConfirm={ handleConfirm }
                                        revisitPerson={ revisitPerson }
                                    />
                                </>
                            ) : (
                                <>

                                    {/* Modal title in form */}
                                    <Text
                                        style={{
                                            ...themeStyles.modalText,
                                            color: colors.modalText,
                                            marginBottom: 40
                                        }}
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
                                                            size={ 25 }
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
                                                    onClose={ handleClose }
                                                    onConfirm={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                                                    revisitPerson={ revisitPerson }
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
                            size={ 50 }
                            testID="revisit-modal-loading"
                        />
                    ) }
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    );
}

export default RevisitModal;