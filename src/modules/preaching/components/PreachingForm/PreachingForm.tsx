import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
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
import { styles as themeStylesheet } from '../../../theme';

/**
 * This component is responsible for rendering the fields to create
 * or edit a preaching.
 *
 * @returns {JSX.Element} The preaching form component.
 */
export const PreachingForm = (): JSX.Element => {
    const { setErrorForm } = useStatus();
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);
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
                <View style={{ ...themeStyles.formContainer, justifyContent: 'flex-start', paddingBottom: margins.xl }}>

                    {/* Day field */}
                    <DatetimeField
                        icon={
                            <Icon
                                color={ colors.contentHeader }
                                name="calendar-outline"
                                size={ fontSizes.icon }
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
                                size={ fontSizes.icon }
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
                                size={ fontSizes.icon }
                            />
                        }
                        inputDateFormat="HH:mm"
                        label="Hora de fin:"
                        modalTitle="Hora de fin"
                        mode="time"
                        name="finalHour"
                        placeholder="Seleccione la hora"
                        style={{ marginBottom: margins.xl }}
                    />

                    {/* Submit button */}
                    <Button
                        disabled={ isPreachingLoading }
                        icon={ (isPreachingLoading) && (
                            <ActivityIndicator
                                color={ colors.contentHeader }
                                size={ fontSizes.icon }
                            />
                        ) }
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                        text={ (seletedPreaching.id !== '') ? 'Actualizar' : 'Guardar' }
                    />
                </View>
            ) }
        </Formik>
    );
}
