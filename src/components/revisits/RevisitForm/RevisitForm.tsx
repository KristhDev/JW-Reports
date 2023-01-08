import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Formik } from 'formik';
import { date, object, string } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button, DatetimeField, FormField } from '../../ui';

import { useRevisits, useStatus, useTheme } from '../../../hooks';

import { RevisitFormValues } from './interfaces';

import themeStyles from '../../../theme/styles';

export const RevisitForm = () => {
    const { state: { seletedRevisit, isRevisitLoading }, saveRevisit } = useRevisits();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    const handleSaveOrUpdate = (formValues: RevisitFormValues) => {
        (seletedRevisit.id === '')
            ? saveRevisit(formValues)
            : () => { }
    }

    const revisitFormSchema = object().shape({
        person_name: string()
            .min(2, 'El nombre de la persona debe tener al menos 2 caracteres.')
            .required('El nombre de la persona es requerido.'),
        about: string()
            .min(10, 'La información de la persona debe tener al meno 10 caracteres.')
            .required('La información de la persona es requerida.'),
        address: string()
            .min(10, 'La dirección debe tener al meno 10 caracteres.')
            .required('La dirección es requerida.'),
        next_visit: date()
            .required('La fecha de la próxima visita no puede estar vacía'),
    });

    return (
        <Formik
            initialValues={{
                person_name: seletedRevisit.person_name,
                about: seletedRevisit.about,
                address: seletedRevisit.address,
                next_visit: new Date(seletedRevisit.next_visit)
            }}
            onSubmit={ handleSaveOrUpdate }
            validateOnMount
            validationSchema={ revisitFormSchema }
        >
            { ({ handleSubmit, errors, isValid }) => (
                <View style={{ ...themeStyles.formContainer, paddingTop: 30, paddingBottom: 40 }}>
                    <FormField
                        icon={
                            <Icon
                                color={ colors.icon }
                                name="person-outline"
                                size={ 25 }
                            />
                        }
                        label="Nombre de la persona:"
                        name="person_name"
                        placeholder="Ingrese el nombre"
                    />

                    <FormField
                        multiline
                        numberOfLines={ 10 }
                        label="Información de la persona:"
                        name="about"
                        placeholder="Ingrese datos sobre la persona, tema de conversación, aspectos importantes, etc..."
                    />

                    <FormField
                        multiline
                        numberOfLines={ 4 }
                        label="Dirección:"
                        name="address"
                        placeholder="Ingrese la dirección"
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
                    />

                    <Button
                        disabled={ isRevisitLoading }
                        icon={
                            (isRevisitLoading) && (
                                <ActivityIndicator
                                    color={ colors.contentHeader }
                                    size="small"
                                    style={{ marginLeft: 10 }}
                                />
                            )
                        }
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                        text={ (seletedRevisit.id !== '') ? 'Actualizar' : 'Guardar' }
                        touchableStyle={{ marginTop: 30 }}
                    />
                </View>
            ) }
        </Formik>
    );
}