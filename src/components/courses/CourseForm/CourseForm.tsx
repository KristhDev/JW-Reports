import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Formik } from 'formik';
import { object, string } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button, FormField } from '../../ui';

import { useCourses, useStatus, useTheme } from '../../../hooks';

import { CourseFormValues } from './interfaces';

import { styles as themeStyles } from '../../../theme';

export const CourseForm = () => {
    const { state: { isCourseLoading, selectedCourse }, saveCourse, updateCourse } = useCourses();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    const handleSaveOrUpdate = (formValues: CourseFormValues) => {
        (selectedCourse.id === '')
            ? saveCourse(formValues)
            : updateCourse(formValues);
    }

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
            .min(5, 'La publicación debe estudio tener al menos 5 caracteres.')
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
                <View style={{ ...themeStyles.formContainer, paddingTop: 30, paddingBottom: 40 }}>
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

                    <FormField
                        label="Información del estudiante:"
                        multiline
                        name="person_about"
                        numberOfLines={ 10 }
                        placeholder="Ingrese datos sobre la persona, temas de interés, preferencias, aspectos importantes, etc..."
                    />

                    <FormField
                        label="Dirección:"
                        multiline
                        name="person_address"
                        numberOfLines={ 4 }
                        placeholder="Ingrese la dirección"
                    />

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
                    />

                    <Button
                        disabled={ isCourseLoading }
                        icon={
                            (isCourseLoading) && (
                                <ActivityIndicator
                                    color={ colors.contentHeader }
                                    size="small"
                                    style={{ marginLeft: 10 }}
                                />
                            )
                        }
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                        text={ (selectedCourse.id !== '') ? 'Actualizar' : 'Guardar' }
                        touchableStyle={{ marginTop: 30 }}
                    />
                </View>
            ) }
        </Formik>
    );
}