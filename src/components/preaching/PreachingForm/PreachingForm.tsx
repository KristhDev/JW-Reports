import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Formik } from 'formik';
import { object, date, number } from 'yup';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, DatetimeField, FormField } from '../../ui';

/* Hooks */
import { usePreaching, useStatus, useTheme } from '../../../hooks';

/* Interfaces */
import { PreachingFormValues } from '../../../interfaces/preaching';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This component is responsible for rendering the fields to create
 * or edit a preaching.
 *
 * @returns {JSX.Element} The preaching form component.
 */
export const PreachingForm = (): JSX.Element => {
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();
    const { state: { isPreachingLoading, seletedPreaching }, savePreaching, updatePreaching } = usePreaching();

    /* Validation schema for preaching */
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

    /**
     * If the selected preaching has an id, then update the preaching, otherwise save the preaching.
     *
     * @param {PreachingFormValues} formValues - PreachingFormValues
     * @return {void} This function does not return anything.
     */
    const handleSaveOrUpdate = (formValues: PreachingFormValues): void => {
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
                <View style={{ ...themeStyles.formContainer, paddingBottom: 40 }}>

                    {/* Day field */}
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

                    {/* Publications field */}
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

                    {/* Videos field */}
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

                    {/* Revisits field */}
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

                    {/* Init hour field */}
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

                    {/* Final hour field */}
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
                        style={{ marginBottom: 40 }}
                    />

                    {/* Submit button */}
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
                    />
                </View>
            ) }
        </Formik>
    );
}