import React, { useState, FC } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

import { Modal } from '../../ui';

import { DatetimeField } from '../../../components/ui';
import { ModalActions } from './ModalActions';

import { useRevisits, useTheme } from '../../../hooks';

import { RevisitModalProps } from './interfaces';

import themeStyles from '../../../theme/styles';

const RevisitModal: FC<RevisitModalProps> = ({ isOpen, onClose }) => {
    const [ completeMsg, setCompleteMsg ] = useState<string>('');
    const [ revisitPerson, setRevisitPerson ] = useState<boolean>(false);

    const { state: { selectedRevisit, isRevisitLoading }, completeRevisit, saveRevisit } = useRevisits();
    const { state: { colors } } = useTheme();

    const modalTitle = (selectedRevisit.done)
        ? `¿Quieres volver a visitar a ${ selectedRevisit.person_name }?`
        : '¿Estás seguro de marcar está revistada como visitada?';

    const handleConfirm = async (values?: { next_visit: Date }) => {
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
                ...values,
                about: selectedRevisit.about,
                address: selectedRevisit.address,
                person_name: selectedRevisit.person_name
            }, selectedRevisit.photo, undefined, false, onClose);
        }
    }

    const handleClose = () => {
        setRevisitPerson(false);
        onClose();
    }

    return (
        <Modal isOpen={ isOpen }>
            {
                (!isRevisitLoading) ? (
                    <View
                        style={{
                            ...themeStyles.modalContainer,
                            backgroundColor: colors.modal
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
                                        Por favor seleciona el día de la próxima vista.
                                    </Text>

                                    <Formik
                                        initialValues={{ next_visit: new Date() }}
                                        onSubmit={ handleConfirm }
                                    >
                                        { ({ handleSubmit }) => (
                                            <View style={{ alignItems: 'center' }}>
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
                                                    onConfirm={ handleSubmit }
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
        </Modal>
    );
}

export default RevisitModal;