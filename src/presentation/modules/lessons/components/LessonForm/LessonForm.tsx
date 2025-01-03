import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useFormik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Modules */
import { useLessons } from '@lessons';
import { useStatus } from '@shared';
import { Button, DatetimeField, FormCalendar, FormField, useUI } from '@ui';

/* Schemas */
import { lessonFormSchema } from './schemas';

/* Interfaces */
import { LessonFormValues } from '../../interfaces';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This component is responsible for rendering the fields to create
 * or edit a lesson.
 *
 * @returns {JSX.Element} The lesson form component.
 */
export const LessonForm = (): JSX.Element => {
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { isLessonLoading, selectedLesson }, saveLesson, updateLesson } = useLessons();
    const { setErrorForm } = useStatus();
    const { state: { activeFormField, recordedAudio, userInterface }, setActiveFormField } = useUI();

    /**
     * If the selectedLesson.id is an empty string, then saveLesson, otherwise updateLesson.
     *
     * @param {LessonFormValues} formValues - LessonFormValues
     * @param {() => void} resetForm - Function to reset the form
     * @return {Promise<void>} This function does not return any value.
     */
    const handleSaveOrUpdate = async (formValues: LessonFormValues, resetForm: () => void): Promise<void> => {
        if (selectedLesson.id === '') {
            await saveLesson(formValues);
            resetForm();
        }
        else updateLesson(formValues);
    }

    const { errors, handleChange, handleSubmit, setFieldValue, isValid, values } = useFormik({
        initialValues: {
            description: selectedLesson.description,
            nextLesson: new Date(selectedLesson.nextLesson)
        },
        onSubmit: (values, { resetForm }) => handleSaveOrUpdate(values, resetForm),
        validateOnMount: true,
        validationSchema: lessonFormSchema
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

    useEffect(() => {
        if (recordedAudio.trim().length === 0 || activeFormField.length === 0) return;
        setFieldValue(activeFormField, recordedAudio, true);
    }, [ recordedAudio ]);

    return (
        <View style={{ ...themeStyles.formContainer, paddingBottom: margins.xl }}>

            {/* Description field */}
            <FormField
                editable={ !isLessonLoading }
                label="¿Qué verán la próxima clase?"
                multiline
                numberOfLines={ 9 }
                onFocus={ () => setActiveFormField('description') }
                placeholder="Ingrese el tema que se estudiará en la siguiente clase"
                onChangeText={ handleChange('description') }
                value={ values.description }
            />

            {/* Next lesson field */}
            { (userInterface.oldDatetimePicker) ? (
                <DatetimeField
                    disabled={ isLessonLoading }
                    icon={
                        <Ionicons
                            color={ colors.contentHeader }
                            name="calendar-outline"
                            size={ fontSizes.icon }
                        />
                    }
                    inputDateFormat="DD/MM/YYYY"
                    label="Próxima clase:"
                    modalTitle="Próxima clase"
                    mode="date"
                    placeholder="Seleccione el día"
                    style={{ marginBottom: margins.xl }}
                    onChangeDate={ (date) => setFieldValue('nextLesson', Time.toDate(date)) }
                    value={ values.nextLesson.toISOString() }
                />
            ) : (
                <FormCalendar
                    editable={ !isLessonLoading }
                    icon={
                        <Ionicons
                            color={ colors.contentHeader }
                            name="calendar-outline"
                            size={ fontSizes.icon }
                        />
                    }
                    inputDateFormat="DD/MM/YYYY"
                    label="Próxima clase:"
                    onChangeDate={ (date) => setFieldValue('nextLesson', Time.toDate(date)) }
                    style={{ marginBottom: margins.xl }}
                    value={ values.nextLesson.toISOString() }
                />
            ) }

            {/* Submit button */}
            <Button
                disabled={ isLessonLoading }
                icon={
                    (isLessonLoading) && (
                        <ActivityIndicator
                            color={ colors.contentHeader }
                            size={ fontSizes.icon }
                        />
                    )
                }
                onPress={ handlePress }
                text={ (selectedLesson.id !== '') ? 'Actualizar' : 'Guardar' }
            />

            <View style={{ flex: 1 }} />
        </View>
    );
}