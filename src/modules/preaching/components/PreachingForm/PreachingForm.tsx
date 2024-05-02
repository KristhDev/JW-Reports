import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, DatetimeField } from '../../../ui/components';

/* Hooks */
import { usePreaching } from '../../hooks';
import { useStatus } from '../../../shared';

/* Schemas */
import { preachingFormSchema } from './schemas';

/* Interfaces */
import { PreachingFormValues } from '../../interfaces';

/* Theme */
import { styles as themeStyles, useTheme } from '../../../theme';

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
                initHour: new Date(seletedPreaching.initHour),
                finalHour: new Date(seletedPreaching.finalHour)
            }}
            onSubmit={ handleSaveOrUpdate }
            validationSchema={ preachingFormSchema }
            validateOnMount
        >
            { ({ handleSubmit, errors, isValid }) => (
                <View style={{ ...themeStyles.formContainer, justifyContent: 'flex-start', paddingBottom: 40 }}>

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
                        name="initHour"
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
                        name="finalHour"
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
                                    size={ 25 }
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
