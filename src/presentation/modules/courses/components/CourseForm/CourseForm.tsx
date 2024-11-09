import React, { useEffect, useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Formik, FormikProps } from 'formik';
import { useStyles } from 'react-native-unistyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
    const formRef = useRef<FormikProps<CourseFormValues>>(null);
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

    useEffect(() => {
        if (recordedAudio.trim().length === 0 || activeFormField.length === 0) return;
        formRef?.current?.setFieldValue(activeFormField, recordedAudio, true);
    }, [ recordedAudio ]);

    return (
        <Formik
            initialValues={{
                personName: selectedCourse.personName,
                personAbout: selectedCourse.personAbout,
                personAddress: selectedCourse.personAddress,
                publication: selectedCourse.publication
            }}
            innerRef={ formRef }
            onSubmit={ handleSaveOrUpdate }
            validateOnMount
            validationSchema={ courseFormSchema }
        >
            { ({ handleSubmit, errors, isValid }) => (
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
                        name="personName"
                        onBlur={ () => setActiveFormField('') }
                        onFocus={ () => setActiveFormField('personName') }
                        placeholder="Ingrese el nombre"
                    />

                    {/* Person about field */}
                    <FormField
                        label="Información del estudiante:"
                        multiline
                        name="personAbout"
                        numberOfLines={ 10 }
                        onBlur={ () => setActiveFormField('') }
                        onFocus={ () => setActiveFormField('personAbout') }
                        placeholder="Ingrese datos sobre la persona, temas de interés, preferencias, aspectos importantes, etc..."
                    />

                    {/* Person address field */}
                    <FormField
                        label="Dirección:"
                        multiline
                        name="personAddress"
                        numberOfLines={ 4 }
                        onBlur={ () => setActiveFormField('') }
                        onFocus={ () => setActiveFormField('personAddress') }
                        placeholder="Ingrese la dirección"
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
                        name="publication"
                        onBlur={ () => setActiveFormField('') }
                        onFocus={ () => setActiveFormField('publication') }
                        placeholder="Ingrese la publicación"
                        style={{ marginBottom: margins.xl }}
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
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                        text={ (selectedCourse.id !== '') ? 'Actualizar' : 'Guardar' }
                    />
                </View>
            ) }
        </Formik>
    );
}