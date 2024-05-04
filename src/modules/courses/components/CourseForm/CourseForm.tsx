import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, FormField } from '../../../ui';

/* Hooks */
import { useCourses } from '../../hooks';
import { useStatus } from '../../../shared';

/* Schemas */
import { courseFormSchema } from './schemas';

/* Interfaces */
import { CourseFormValues } from '../../interfaces';

/* Theme */
import { styles as themeStylesheet } from '../../../theme';

/**
 * This component is responsible for rendering the fields to create
 * or edit a course.
 *
 * @return {JSX.Element} The course form component.
 */
export const CourseForm = (): JSX.Element => {
    const { state: { isCourseLoading, selectedCourse }, saveCourse, updateCourse } = useCourses();
    const { setErrorForm } = useStatus();
    const { styles: themeStyles, theme: { colors, margins } } = useStyles(themeStylesheet);

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

    return (
        <Formik
            initialValues={{
                personName: selectedCourse.personName,
                personAbout: selectedCourse.personAbout,
                personAddress: selectedCourse.personAddress,
                publication: selectedCourse.publication
            }}
            onSubmit={ handleSaveOrUpdate }
            validateOnMount
            validationSchema={ courseFormSchema }
        >
            { ({ handleSubmit, errors, isValid }) => (
                <View style={{ ...themeStyles.formContainer, paddingBottom: margins.lg }}>

                    {/* Person name field */}
                    <FormField
                        icon={
                            <Icon
                                color={ colors.icon }
                                name="person-outline"
                                size={ 25 }
                            />
                        }
                        label="Nombre del estudiante:"
                        name="personName"
                        placeholder="Ingrese el nombre"
                    />

                    {/* Person about field */}
                    <FormField
                        label="Información del estudiante:"
                        multiline
                        name="personAbout"
                        numberOfLines={ 10 }
                        placeholder="Ingrese datos sobre la persona, temas de interés, preferencias, aspectos importantes, etc..."
                    />

                    {/* Person address field */}
                    <FormField
                        label="Dirección:"
                        multiline
                        name="personAddress"
                        numberOfLines={ 4 }
                        placeholder="Ingrese la dirección"
                    />

                    {/* Publication field */}
                    <FormField
                        icon={
                            <Icon
                                color={ colors.icon }
                                name="book-outline"
                                size={ 25 }
                            />
                        }
                        label="Publicación de estudio:"
                        name="publication"
                        placeholder="Ingrese la publicación"
                        style={{ marginBottom: margins.lg }}
                    />

                    {/* Submit button */}
                    <Button
                        disabled={ isCourseLoading }
                        icon={
                            (isCourseLoading) && (
                                <ActivityIndicator
                                    color={ colors.contentHeader }
                                    size={ 25 }
                                    style={{ marginLeft: 10 }}
                                />
                            )
                        }
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                        text={ (selectedCourse.id !== '') ? 'Actualizar' : 'Guardar' }
                    />
                </View>
            ) }
        </Formik>
    );
}