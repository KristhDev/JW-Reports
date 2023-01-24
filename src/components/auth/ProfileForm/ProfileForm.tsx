import React from 'react';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

import { View, ActivityIndicator } from 'react-native';

import { Button, FormField, FormSelect } from '../../ui';

import { useAuth, useStatus, useTheme } from '../../../hooks';

import { styles as themeStyles } from '../../../theme';

export const ProfileForm = () => {
    const { state: { user, isAuthLoading } } = useAuth();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    return (
        <Formik
            initialValues={{
                name: user.name,
                surname: user.surname,
                email: user.email,
                precursor: user.precursor
            }}
            onSubmit={ () => {} }
            validateOnMount
        >
            { ({ errors, handleSubmit, isValid }) => (
                <View style={ themeStyles.formContainer }>
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

                    <FormField
                        autoCapitalize="none"
                        icon={
                            <Icon
                                color={ colors.icon }
                                name="mail-outline"
                                size={ 25 }
                            />
                        }
                        keyboardType="email-address"
                        label="Correo:"
                        name="email"
                        placeholder="Ingrese su correo"
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
                        touchableStyle={{ paddingHorizontal: 20, marginTop: 30 }}
                    />
                </View>
            ) }
        </Formik>
    );
}