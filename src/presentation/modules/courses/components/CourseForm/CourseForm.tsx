import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFormik } from 'formik';
import { useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Components */
import { Button, FormField, useUI } from '@ui';

/* Hooks */
import { useCourses } from '../../hooks';
import { useStatus } from '@shared';

/* Schemas */
import { courseFormSchema } from './schemas';

/* Interfaces */
import { CourseFormValues } from '../../interfaces';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This component is responsible for rendering the fields to create
 * or edit a course.
 *
 * @return {JSX.Element} The course form component.
 */
export const CourseForm = (): JSX.Element => {
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { isCourseLoading, selectedCourse }, saveCourse, updateCourse } = useCourses();
    const { setErrorForm } = useStatus();
    const { state: { activeFormField, recordedAudio }, setActiveFormField } = useUI();

    /**
     * If the selectedCourse.id is an empty string, then save the formValues, otherwise update the
     * formValues.
     *
     * @param {CourseFormValues} formValues - CourseFormValues
     * @return {void} This function does not return any value.
     */
    const handleSaveOrUpdate = (formValues: CourseFormValues): void => {
        (selectedCourse.id === '')
            ? saveCourse(formValues)
            : updateCourse(formValues);
    }

    const { errors, handleChange, handleSubmit, isValid, setFieldValue, values } = useFormik({
        initialValues: {
            personName: selectedCourse.personName,
            personAbout: selectedCourse.personAbout,
            personAddress: selectedCourse.personAddress,
            publication: selectedCourse.publication
        },
        onSubmit: handleSaveOrUpdate,
        validateOnMount: true,
        validationSchema: courseFormSchema
    });

    /**
     * Handles the press event by submitting the form if it is valid,
     * otherwise sets the form errors.
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

            {/* Person name field */}
            <FormField
                leftIcon={
                    <Ionicons
                        color={ colors.icon }
                        name="person-outline"
                        size={ fontSizes.icon }
                    />
                }
                label="Nombre del estudiante:"
                onBlur={ () => setActiveFormField('') }
                onChangeText={ handleChange('personName') }
                onFocus={ () => setActiveFormField('personName') }
                placeholder="Ingrese el nombre"
                value={ values.personName }
            />

            {/* Person about field */}
            <FormField
                label="Información del estudiante:"
                multiline
                numberOfLines={ 10 }
                onBlur={ () => setActiveFormField('') }
                onChangeText={ handleChange('personAbout') }
                onFocus={ () => setActiveFormField('personAbout') }
                placeholder="Ingrese datos sobre la persona, temas de interés, preferencias, aspectos importantes, etc..."
                value={ values.personAbout }
            />

            {/* Person address field */}
            <FormField
                label="Dirección:"
                multiline
                numberOfLines={ 4 }
                onBlur={ () => setActiveFormField('') }
                onChangeText={ handleChange('personAddress') }
                onFocus={ () => setActiveFormField('personAddress') }
                placeholder="Ingrese la dirección"
                value={ values.personAddress }
            />

            {/* Publication field */}
            <FormField
                leftIcon={
                    <Ionicons
                        color={ colors.icon }
                        name="book-outline"
                        size={ fontSizes.icon }
                    />
                }
                label="Publicación de estudio:"
                onBlur={ () => setActiveFormField('') }
                onChangeText={ handleChange('publication') }
                onFocus={ () => setActiveFormField('publication') }
                placeholder="Ingrese la publicación"
                style={{ marginBottom: margins.xl }}
                value={ values.publication }
            />

            {/* Submit button */}
            <Button
                disabled={ isCourseLoading }
                icon={ (isCourseLoading) && (
                    <ActivityIndicator
                        color={ colors.contentHeader }
                        size={ fontSizes.icon }
                    />
                ) }
                onPress={ handlePress }
                text={ (selectedCourse.id !== '') ? 'Actualizar' : 'Guardar' }
            />
        </View>
    );
}