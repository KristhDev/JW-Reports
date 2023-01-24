import React, { useState } from 'react';
import { Formik } from 'formik';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { object, ref, string } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

import { View, ActivityIndicator } from 'react-native';

import { Button, EyeBtn, FormField } from '../../ui';

import { useAuth, useStatus, useTheme } from '../../../hooks';

export const CredentialsForm = () => {
    const [ loadingEmail, setLoadingEmail ] = useState<boolean>(false);
    const [ loadingPassword, setLoadingPassword ] = useState<boolean>(false);
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState<boolean>(false);
    const { top } = useSafeAreaInsets();

    const { state: { user, isAuthLoading }, updateEmail } = useAuth();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    const emailFormSchema = object().shape({
        email: string()
            .email('Correo electrónico inválido.')
            .notOneOf([ user.email ], 'Para actualizar tu correo debes cambiarlo.')
            .required('El correo electrónico es requerido.')
    });

    const passwordFormSchema = object().shape({
        password: string()
            .min(6, 'La nueva contraseña debe tener al menos 6 caracteres.')
            .required('La nueva contraseña no puede estar vacia.'),
        confirmPassword: string()
            .oneOf([ ref('password'), null ], 'Las contraseñas no coinciden.')
            .required('La confirmación de la contraseña es requerida.'),
    });

    const handleUpdateEmail = (values: { email: string }) => {
        setLoadingEmail(true);
        updateEmail(values, () => setLoadingEmail(false));
    }

    const handleUpdatePassword = (values: { password: string, confirmPassword: string }) => {
        setLoadingPassword(true);
        console.log(values);
    }

    return (
        <View style={{ paddingVertical: top }}>
            <Formik
                initialValues={{
                    email: user.email
                }}
                onSubmit={ handleUpdateEmail }
                validateOnMount
                validationSchema={ emailFormSchema }
            >
                { ({ errors, handleSubmit, isValid }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', paddingBottom: top }}>
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

                        <Button
                            disabled={ isAuthLoading && loadingEmail }
                            icon={
                                (isAuthLoading && loadingEmail) && (
                                    <ActivityIndicator
                                        color={ colors.contentHeader }
                                        size="small"
                                        style={{ marginLeft: 10 }}
                                    />
                                )
                            }
                            onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors)  }
                            text="Cambiar correo"
                            touchableStyle={{ paddingHorizontal: 20, marginTop: top }}
                        />
                    </View>
                ) }
            </Formik>

            <Formik
                initialValues={{
                    password: '',
                    confirmPassword: ''
                }}
                onSubmit={ handleUpdatePassword }
                validateOnMount
                validationSchema={ passwordFormSchema }
            >
                { ({ errors, handleSubmit, isValid }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', paddingBottom: top }}>
                        <FormField
                            autoCapitalize="none"
                            icon={
                                <EyeBtn
                                    onToggle={ setShowPassword }
                                    value={ showPassword }
                                />
                            }
                            label="Nueva contraseña:"
                            name="password"
                            placeholder="Ingrese su contraseña"
                            secureTextEntry={ !showPassword }
                        />

                        <FormField
                            autoCapitalize="none"
                            icon={
                                <EyeBtn
                                    onToggle={ setShowConfirmPassword }
                                    value={ showConfirmPassword }
                                />
                            }
                            label="Confirmar contraseña:"
                            name="confirmPassword"
                            placeholder="Confirme su contraseña"
                            secureTextEntry={ !showConfirmPassword }
                        />

                        <Button
                            disabled={ isAuthLoading && loadingPassword }
                            icon={
                                (isAuthLoading && loadingPassword) && (
                                    <ActivityIndicator
                                        color={ colors.contentHeader }
                                        size="small"
                                        style={{ marginLeft: 10 }}
                                    />
                                )
                            }
                            onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors)  }
                            text="Cambiar contraseña"
                            touchableStyle={{ paddingHorizontal: 20, marginTop: top }}
                        />
                    </View>
                ) }
            </Formik>
        </View>
    );
}