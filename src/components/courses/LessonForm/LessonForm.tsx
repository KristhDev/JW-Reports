import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Formik } from 'formik';
import { date, object, string } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button, DatetimeField, FormField } from '../../ui';

import { useCourses, useStatus, useTheme } from '../../../hooks';

import { LessonFormValues } from './interfaces';

import { styles as themeStyles } from '../../../theme';

export const LessonForm = () => {
    const { state: { isLessonLoading, selectedLesson }, saveLesson, updateLesson } = useCourses();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    const handleSaveOrUpdate = (formValues: LessonFormValues) => {
        (selectedLesson.id === '')
            ? saveLesson(formValues)
            : updateLesson(formValues);
    }

    const lessonFormSchema = object().shape({
        description: string()
            .min(2, 'El nombre de la persona debe tener al menoss 2 caracteres.')
            .required('El nombre de la persona es requerido.'),
        next_lesson: date()
            .required('La fecha de la próxima clase no puede estar vacía.'),
    });

    return (
        <Formik
            initialValues={{
                description: selectedLesson.description,
                next_lesson: new Date(selectedLesson.next_lesson)
            }}
            onSubmit={ handleSaveOrUpdate }
            validateOnMount
            validationSchema={ lessonFormSchema }
        >
            { ({ handleSubmit, errors, isValid }) => (
                <View style={{ ...themeStyles.formContainer, paddingTop: 30, paddingBottom: 40 }}>
                    <FormField
                        label="¿Qué verán la próxima clase?"
                        multiline
                        name="description"
                        numberOfLines={ 10 }
                        placeholder="Ingrese el tema que se estudiarán en la siguiente clase"
                    />

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
                    />

                    <View style={{ flex: 1 }} />

                    <Button
                        disabled={ isLessonLoading }
                        icon={
                            (isLessonLoading) && (
                                <ActivityIndicator
                                    color={ colors.contentHeader }
                                    size="small"
                                    style={{ marginLeft: 10 }}
                                />
                            )
                        }
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                        text={ (selectedLesson.id !== '') ? 'Actualizar' : 'Guardar' }
                        touchableStyle={{ marginTop: 30 }}
                    />
                </View>
            ) }
        </Formik>
    );
}