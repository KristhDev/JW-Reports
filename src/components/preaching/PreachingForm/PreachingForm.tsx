import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import { object, date, number } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

import { useStatus, useTheme } from '../../../hooks';

import { Button, DatetimeField, FormField } from '../../ui';

export const PreachingForm = () => {
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    const preachingFormSchema = object().shape({
        day: date()
            .required('El día no puede estar vacío'),
        init_hour: date()
            .required('La hora inicial no puede estar vacía'),
        final_hour: date()
            .required('La hora final no puede estar vacía'),
        posts: number()
            .min(0, 'El número de publicaciones no puede ser negativo'),
        videos: number()
            .min(0, 'El número de videos no puede ser negativo'),
        revisits: number()
            .min(0, 'El número de revisitas no puede ser negativo'),
    });

    return (
        <Formik
            initialValues={{
                day: new Date(),
                init_hour: new Date(),
                final_hour: new Date(),
                posts: 0,
                videos: 0,
                revisits: 0
            }}
            onSubmit={ () => {} }
            validationSchema={ preachingFormSchema }
            validateOnMount
        >
            { ({ handleSubmit, errors, isValid }) => (
                <View style={{ alignItems: 'center', paddingTop: 30, paddingBottom: 40 }}>
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
                        name="posts"
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
                                name="calendar-outline"
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
                                name="calendar-outline"
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
                        text="Guardar"
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                        touchableStyle={{ marginTop: 30 }}
                    />
                </View>
            ) }
        </Formik>
    );
}