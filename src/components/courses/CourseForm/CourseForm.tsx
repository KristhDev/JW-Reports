import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Formik } from 'formik';
import { object, string } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, FormField } from '../../ui';

/* Hooks */
import { useCourses, useStatus, useTheme } from '../../../hooks';

/* Interfaces */
import { CourseFormValues } from '../../../interfaces/courses';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This component is responsible for rendering the fields to create
 * or edit a course.
 *
 * @return {JSX.Element} The course form component.
 */
export const CourseForm = (): JSX.Element => {
    const { state: { isCourseLoading, selectedCourse }, saveCourse, updateCourse } = useCourses();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

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

    /* Validation schema for course */
    const courseFormSchema = object().shape({
        person_name: string()
            .min(2, 'El nombre de la persona debe tener al menoss 2 caracteres.')
            .required('El nombre de la persona es requerido.'),
        person_about: string()
            .min(10, 'La información de la persona debe tener al menos 10 caracteres.')
            .required('La información de la persona es requerida.'),
        person_address: string()
            .min(10, 'La dirección debe tener al menos 10 caracteres.')
            .required('La dirección es requerida.'),
        publication: string()
            .min(5, 'La publicación de estudio debe tener al menos 5 caracteres.')
            .required('La publicación de estudio no puede estar vacía'),
    });

    return (
        <Formik
            initialValues={{
                person_name: selectedCourse.person_name,
                person_about: selectedCourse.person_about,
                person_address: selectedCourse.person_address,
                publication: selectedCourse.publication
            }}
            onSubmit={ handleSaveOrUpdate }
            validateOnMount
            validationSchema={ courseFormSchema }
        >
            { ({ handleSubmit, errors, isValid }) => (
                <View style={{ ...themeStyles.formContainer, paddingBottom: 40 }}>

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
                        name="person_name"
                        placeholder="Ingrese el nombre"
                    />

                    {/* Person about field */}
                    <FormField
                        label="Información del estudiante:"
                        multiline
                        name="person_about"
                        numberOfLines={ 10 }
                        placeholder="Ingrese datos sobre la persona, temas de interés, preferencias, aspectos importantes, etc..."
                    />

                    {/* Person address field */}
                    <FormField
                        label="Dirección:"
                        multiline
                        name="person_address"
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
                        style={{ marginBottom: 40 }}
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