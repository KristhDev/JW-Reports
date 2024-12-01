import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFormik } from 'formik';
import { useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Components */
import { Button, DatetimeField, FormCalendar, FormTime, useUI } from '@ui';

/* Hooks */
import { usePreaching } from '../../hooks';
import { useStatus } from '@shared';

/* Schemas */
import { preachingFormSchema } from './schemas';

/* Interfaces */
import { PreachingFormValues } from '../../interfaces';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This component is responsible for rendering the fields to create
 * or edit a preaching.
 *
 * @returns {JSX.Element} The preaching form component.
 */
export const PreachingForm = (): JSX.Element => {
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { isPreachingLoading, seletedPreaching }, savePreaching, updatePreaching } = usePreaching();
    const { setErrorForm } = useStatus();
    const { state: { userInterface } } = useUI();

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

    const { errors, handleSubmit, isValid, setFieldValue, values } = useFormik({
        initialValues: {
            day: new Date(seletedPreaching.day),
            initHour: new Date(seletedPreaching.initHour),
            finalHour: new Date(seletedPreaching.finalHour)
        },
        onSubmit: handleSaveOrUpdate,
        validateOnMount: true,
        validationSchema: preachingFormSchema
    });

    /**
     * Handles the press event of the save button by submitting the form
     * if it is valid or showing the errors if it is not.
     *
     * @return {void} This function does not return anything.
     */
    const handlePress = (): void => {
        if (isValid) handleSubmit();
        else setErrorForm(errors);
    }

    return (
        <View style={{ ...themeStyles.formContainer, justifyContent: 'flex-start', paddingBottom: margins.xl }}>

            {/* Day field */}
            { userInterface.oldDatetimePicker ? (
                <DatetimeField
                    disabled={ isPreachingLoading }
                    icon={
                        <Ionicons
                            color={ colors.contentHeader }
                            name="calendar-outline"
                            size={ fontSizes.icon }
                        />
                    }
                    inputDateFormat="DD"
                    label="Día de predicación:"
                    modalTitle="Día de predicación"
                    mode="date"
                    onChangeDate={ (date) => setFieldValue('day', Time.toDate(date)) }
                    placeholder="Seleccione el día"
                    value={ values.day.toString() }
                />
            ) : (
                <FormCalendar
                    editable={ !isPreachingLoading }
                    icon={
                        <Ionicons
                            color={ colors.contentHeader }
                            name="calendar-outline"
                            size={ fontSizes.icon }
                        />
                    }
                    inputDateFormat="DD"
                    label="Día de predicación:"
                    onChangeDate={ (date) => setFieldValue('day', Time.toDate(date)) }
                    value={ values.day.toString() }
                />
            ) }

            {/* Init hour field */}
            { (userInterface.oldDatetimePicker) ? (
                <DatetimeField
                    disabled={ isPreachingLoading }
                    icon={
                        <Ionicons
                            color={ colors.contentHeader }
                            name="time-outline"
                            size={ fontSizes.icon }
                        />
                    }
                    inputDateFormat="HH:mm"
                    label="Hora de inicio:"
                    modalTitle="Hora de inicio"
                    mode="time"
                    onChangeDate={ (date) => setFieldValue('initHour', Time.toDate(date)) }
                    placeholder="Seleccione la hora"
                    value={ values.initHour.toString() }
                />
            ) : (
                <FormTime
                    editable={ !isPreachingLoading }
                    icon={
                        <Ionicons
                            color={ colors.contentHeader }
                            name="time-outline"
                            size={ fontSizes.icon }
                        />
                    }
                    inputDateFormat="HH:mm"
                    label="Hora de inicio:"
                    onChangeTime={ (date) => setFieldValue('initHour', Time.toDate(date)) }
                    value={ values.initHour.toString() }
                />
            ) }

            {/* Final hour field */}
            { userInterface.oldDatetimePicker ? (
                <DatetimeField
                    disabled={ isPreachingLoading }
                    icon={
                        <Ionicons
                            color={ colors.contentHeader }
                            name="time-outline"
                            size={ fontSizes.icon }
                        />
                    }
                    inputDateFormat="HH:mm"
                    label="Hora de fin:"
                    modalTitle="Hora de fin"
                    mode="time"
                    onChangeDate={ (date) => setFieldValue('finalHour', Time.toDate(date)) }
                    placeholder="Seleccione la hora"
                    style={{ marginBottom: margins.xl }}
                    value={ values.finalHour.toString() }
                />
            ) : (
                <FormTime
                    editable={ !isPreachingLoading }
                    icon={
                        <Ionicons
                            color={ colors.contentHeader }
                            name="time-outline"
                            size={ fontSizes.icon }
                        />
                    }
                    inputDateFormat="HH:mm"
                    label="Hora de fin:"
                    onChangeTime={ (date) => setFieldValue('finalHour', Time.toDate(date)) }
                    style={{ marginBottom: margins.xl }}
                    value={ values.finalHour.toString() }
                />
            ) }

            {/* Submit button */}
            <Button
                disabled={ isPreachingLoading }
                icon={ (isPreachingLoading) && (
                    <ActivityIndicator
                        color={ colors.contentHeader }
                        size={ fontSizes.icon }
                    />
                ) }
                onPress={ handlePress }
                text={ (seletedPreaching.id !== '') ? 'Actualizar' : 'Guardar' }
            />
        </View>
    );
}
