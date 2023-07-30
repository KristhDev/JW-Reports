import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Formik } from 'formik';
import { date, object, string } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, DatetimeField, FormField } from '../../ui';

/* Hooks */
import { useCourses, useStatus, useTheme } from '../../../hooks';

/* Interfaces */
import { LessonFormValues } from '../../../interfaces/courses';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This component is responsible for rendering the fields to create
 * or edit a lesson.
 *
 * @returns {JSX.Element} The lesson form component.
 */
export const LessonForm = (): JSX.Element => {
    const { state: { isLessonLoading, selectedLesson }, saveLesson, updateLesson } = useCourses();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

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

    /* Validation schema for lesson */
    const lessonFormSchema = object().shape({
        description: string()
            .min(10, 'El contenido de la clase debe tener al menos 10 caracteres.')
            .required('El contenido de la clase es requerido.'),
        next_lesson: date()
            .required('La fecha de la próxima clase no puede estar vacía.'),
    });

    return (
        <Formik
            initialValues={{
                description: selectedLesson.description,
                next_lesson: new Date(selectedLesson.next_lesson)
            }}
            onSubmit={ (values, { resetForm }) => handleSaveOrUpdate(values, resetForm) }
            validateOnMount
            validationSchema={ lessonFormSchema }
        >
            { ({ handleSubmit, errors, isValid }) => (
                <View style={{ ...themeStyles.formContainer, paddingBottom: 40 }}>

                    {/* Description field */}
                    <FormField
                        label="¿Qué verán la próxima clase?"
                        multiline
                        name="description"
                        numberOfLines={ 10 }
                        placeholder="Ingrese el tema que se estudiará en la siguiente clase"
                    />

                    {/* Next lesson field */}
                    <DatetimeField
                        icon={
                            <Icon
                                color={ colors.contentHeader }
                                name="calendar-outline"
                                size={ 25 }
                            />
                        }
                        inputDateFormat="DD/MM/YYYY"
                        label="Próxima clase:"
                        modalTitle="Próxima clase"
                        mode="date"
                        name="next_lesson"
                        placeholder="Seleccione el día"
                        style={{ marginBottom: 40 }}
                    />

                    <View style={{ flex: 1 }} />

                    {/* Submit button */}
                    <Button
                        disabled={ isLessonLoading }
                        icon={
                            (isLessonLoading) && (
                                <ActivityIndicator
                                    color={ colors.contentHeader }
                                    size={ 25 }
                                    style={{ marginLeft: 10 }}
                                />
                            )
                        }
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                        text={ (selectedLesson.id !== '') ? 'Actualizar' : 'Guardar' }
                    />
                </View>
            ) }
        </Formik>
    );
}