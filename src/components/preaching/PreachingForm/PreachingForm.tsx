import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Formik } from 'formik';
import { object, date, number } from 'yup';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button, DatetimeField, FormField } from '../../ui';

import { usePreaching, useStatus, useTheme } from '../../../hooks';

import { PreachingFormValues } from './interfaces';

import { styles as themeStyles } from '../../../theme';

export const PreachingForm = () => {
    const {
        state: {
            isPreachingLoading,
            seletedPreaching
        },
        savePreaching,
        updatePreaching
    } = usePreaching();

    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    const preachingFormSchema = object().shape({
        day: date()
            .required('El día no puede estar vacío.'),
        init_hour: date()
            .required('La hora inicial no puede estar vacía.')
            .test('date-min', 'La hora inicial no puede ser mayor que la hora final.', (value, { parent }) => {
                return dayjs(value).isBefore(dayjs(parent.final_hour));
            }),
        final_hour: date()
            .required('La hora final no puede estar vacía.'),
        publications: number()
            .min(0, 'El número de publicaciones no puede ser negativo.'),
        videos: number()
            .min(0, 'El número de videos no puede ser negativo.'),
        revisits: number()
            .min(0, 'El número de revisitas no puede ser negativo.'),
    });

    const handleSaveOrUpdate = (formValues: PreachingFormValues) => {
        (seletedPreaching.id === '')
            ? savePreaching(formValues)
            : updatePreaching(formValues);
    }

    return (
        <Formik
            initialValues={{
                day: new Date(seletedPreaching.day),
                init_hour: new Date(seletedPreaching.init_hour),
                final_hour: new Date(seletedPreaching.final_hour),
                publications: seletedPreaching.publications,
                videos: seletedPreaching.videos,
                revisits: seletedPreaching.revisits
            }}
            onSubmit={ handleSaveOrUpdate }
            validationSchema={ preachingFormSchema }
            validateOnMount
        >
            { ({ handleSubmit, errors, isValid }) => (
                <View style={{ ...themeStyles.formContainer, paddingTop: 30, paddingBottom: 40 }}>
                    <DatetimeField
                        icon={
                            <Icon
                                color={ colors.contentHeader }
                                name="calendar-outline"
                                size={ 25 }
                            />
                        }
                        inputDateFormat="DD"
                        label="Día de predicación:"
                        modalTitle="Día de predicación"
                        mode="date"
                        name="day"
                        placeholder="Seleccione el día"
                    />

                    <FormField
                        icon={
                            <Icon
                                color={ colors.icon }
                                name="reader-outline"
                                size={ 25 }
                            />
                        }
                        keyboardType="numeric"
                        label="Publicaciones:"
                        name="publications"
                        placeholder="Número de publicaciones"
                    />

                    <FormField
                        icon={
                            <Icon
                                color={ colors.icon }
                                name="videocam-outline"
                                size={ 25 }
                            />
                        }
                        keyboardType="numeric"
                        label="Videos:"
                        name="videos"
                        placeholder="Número de videos"
                    />

                    <FormField
                        icon={
                            <Icon
                                color={ colors.icon }
                                name="people-outline"
                                size={ 25 }
                            />
                        }
                        keyboardType="numeric"
                        label="Revisitas:"
                        name="revisits"
                        placeholder="Número de revisitas"
                    />

                    <DatetimeField
                        icon={
                            <Icon
                                color={ colors.contentHeader }
                                name="time-outline"
                                size={ 25 }
                            />
                        }
                        inputDateFormat="HH:mm"
                        label="Hora de inicio:"
                        modalTitle="Hora de inicio"
                        mode="time"
                        name="init_hour"
                        placeholder="Seleccione la hora"
                    />

                    <DatetimeField
                        icon={
                            <Icon
                                color={ colors.contentHeader }
                                name="time-outline"
                                size={ 25 }
                            />
                        }
                        inputDateFormat="HH:mm"
                        label="Hora de fin:"
                        modalTitle="Hora de fin"
                        mode="time"
                        name="final_hour"
                        placeholder="Seleccione la hora"
                    />

                    <Button
                        disabled={ isPreachingLoading }
                        icon={
                            (isPreachingLoading) && (
                                <ActivityIndicator
                                    color={ colors.contentHeader }
                                    size="small"
                                    style={{ marginLeft: 10 }}
                                />
                            )
                        }
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                        text={ (seletedPreaching.id !== '') ? 'Actualizar' : 'Guardar' }
                        touchableStyle={{ marginTop: 30 }}
                    />
                </View>
            ) }
        </Formik>
    );
}