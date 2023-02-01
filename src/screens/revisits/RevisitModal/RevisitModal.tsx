import React, { useState, FC } from 'react';
import { KeyboardAvoidingView, View, Text, ActivityIndicator, ScrollView, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { date, object, string } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

import { Modal } from '../../ui';

import { DatetimeField, FormField } from '../../../components/ui';
import { ModalActions } from './ModalActions';

import { useRevisits, useStatus, useTheme } from '../../../hooks';

import { ModalProps } from '../../../interfaces/ui';

import { styles as themeStyles } from '../../../theme';

const RevisitModal: FC<ModalProps> = ({ isOpen, onClose }) => {
    const [ completeMsg, setCompleteMsg ] = useState<string>('');
    const [ revisitPerson, setRevisitPerson ] = useState<boolean>(false);

    const { top } = useSafeAreaInsets();
    const { width } = useWindowDimensions();

    const { state: { selectedRevisit, isRevisitLoading }, completeRevisit, saveRevisit } = useRevisits();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    const modalTitle = (selectedRevisit.done)
        ? `¿Quieres volver a visitar a ${ selectedRevisit.person_name }?`
        : '¿Está seguro de marcar esta revisitada como visitada?';

    const revisitFormSchema = object().shape({
        about: string()
            .min(10, 'La información de la persona debe tener al menos 10 caracteres.')
            .required('La información de la persona es requerida.'),
        next_visit: date()
            .required('La fecha de la próxima visita no puede estar vacía'),
    });

    const handleConfirm = async (values?: { about: string, next_visit: Date }) => {
        if (!selectedRevisit.done) {
            const msg = await completeRevisit(onClose);
            setCompleteMsg(msg);
        }
        else if (selectedRevisit.done && !values?.next_visit) {
            setRevisitPerson(true);
        }
        else if (values?.next_visit) {
            setRevisitPerson(false);
            saveRevisit({
                revisitValues: {
                    ...values,
                    address: selectedRevisit.address,
                    person_name: selectedRevisit.person_name
                },
                back: false,
                imageUri: selectedRevisit.photo,
                onFinish: onClose
            });
        }
    }

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
                {
                    (!isRevisitLoading) ? (
                        <View
                            style={{
                                ...themeStyles.modalContainer,
                                backgroundColor: colors.modal,
                                width: width * 0.87,
                            }}
                        >
                            {
                                (completeMsg !== '') && (
                                    <Text
                                        style={{
                                            ...themeStyles.modalText,
                                            color: colors.modalText
                                        }}
                                    >
                                        { completeMsg }
                                    </Text>
                                )
                            }

                            {
                                (!revisitPerson) ? (
                                    <>
                                        <Text
                                            style={{
                                                ...themeStyles.modalText,
                                                color: colors.modalText
                                            }}
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
                                        <Text
                                            style={{
                                                ...themeStyles.modalText,
                                                color: colors.modalText
                                            }}
                                        >
                                            Por favor verifica los siguientes datos.
                                        </Text>

                                        <Formik
                                            initialValues={{
                                                about: selectedRevisit.about,
                                                next_visit: new Date()
                                            }}
                                            onSubmit={ handleConfirm }
                                            validateOnMount
                                            validationSchema={ revisitFormSchema }
                                        >
                                            { ({ handleSubmit, isValid, errors }) => (
                                                <View style={{ alignItems: 'center' }}>
                                                    <FormField
                                                        label="Información actual:"
                                                        multiline
                                                        name="about"
                                                        numberOfLines={ 10 }
                                                        placeholder="Ingrese datos sobre la persona, tema de conversación, aspectos importantes, etc..."
                                                        style={{ width: '100%' }}
                                                    />

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
                                                        name="next_visit"
                                                        placeholder="Seleccione el día"
                                                        style={{ width: '100%' }}
                                                    />

                                                    <ModalActions
                                                        onClose={ handleClose }
                                                        onConfirm={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                                                        revisitPerson={ revisitPerson }
                                                    />
                                                </View>
                                            ) }
                                        </Formik>
                                    </>
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
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    );
}

export default RevisitModal;