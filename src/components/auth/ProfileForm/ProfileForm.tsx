import React from 'react';
import { Formik } from 'formik';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { object, string } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

import { View, ActivityIndicator } from 'react-native';

import { Button, FormField, FormSelect } from '../../ui';

import { useAuth, useStatus, useTheme } from '../../../hooks';

import { styles as themeStyles } from '../../../theme';

export const ProfileForm = () => {
    const { top } = useSafeAreaInsets();

    const { state: { user, isAuthLoading } } = useAuth();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    const profileFormSchema = object().shape({
        name: string()
            .min(2, 'El nombre debe tener al menos 2 caracteres.')
            .required('El nombre es requerido.'),
        surname: string()
            .min(2, 'Los apellidos deben tener al menos 2 caracteres.')
            .required('Los apellidos son requeridos.'),
        precursor: string()
            .oneOf([ 'ninguno', 'auxiliar', 'regular', 'e' ], 'Por favor seleccione una opción de precursor')
            .required('El campo precursor es requerido')
    });

    return (
        <Formik
            initialValues={{
                name: user.name,
                surname: user.surname,
                precursor: user.precursor
            }}
            onSubmit={ (values) => console.log(values) }
            validateOnMount
            validationSchema={ profileFormSchema }
        >
            { ({ errors, handleSubmit, isValid }) => (
                <View style={{ ...themeStyles.formContainer, justifyContent: 'flex-start', paddingTop: 20 }}>
                    <FormField
                        autoCapitalize="none"
                        icon={
                            <Icon
                                color={ colors.icon }
                                name="person-outline"
                                size={ 25 }
                            />
                        }
                        label="Nombre:"
                        name="name"
                        placeholder="Ingrese su nombre"
                    />

                    <FormField
                        autoCapitalize="none"
                        icon={
                            <Icon
                                color={ colors.icon }
                                name="people-outline"
                                size={ 25 }
                            />
                        }
                        label="Apellidos:"
                        name="surname"
                        placeholder="Ingrese su apellido"
                    />

                    <FormSelect
                        name="precursor"
                        label="Precursor:"
                        items={[
                            { label: 'Ninguno', value: 'ninguno' },
                            { label: 'Auxiliar', value: 'auxiliar' },
                            { label: 'Regular', value: 'regular' },
                            { label: 'Especial', value: 'especial' }
                        ]}
                        placeholder="Seleccione una opción"
                    />

                    <View style={{ flex: 1 }} />

                    <Button
                        disabled={ isAuthLoading }
                        icon={
                            (isAuthLoading) && (
                                <ActivityIndicator
                                    color={ colors.contentHeader }
                                    size="small"
                                    style={{ marginLeft: 10 }}
                                />
                            )
                        }
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors)  }
                        text="Guardar"
                        touchableStyle={{ paddingHorizontal: 20, marginVertical: top }}
                    />
                </View>
            ) }
        </Formik>
    );
}