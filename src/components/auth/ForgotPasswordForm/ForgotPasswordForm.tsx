import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { object, string } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button, FormField } from '../../ui';

import { useAuth, useStatus, useTheme } from '../../../hooks';

import { styles as themeStyles } from '../../../theme';

export const ForgotPasswordForm = () => {
    const { navigate } = useNavigation();
    const { width } = useWindowDimensions();

    const { state: { isAuthLoading }, resetPassword } = useAuth();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    const forgotPasswordFormSchema = object().shape({
        email: string()
            .email('Correo electrónico inválido.')
            .required('El correo electrónico es requerido.')
    });

    const handleResetPassword = (values: { email: string }, resetForm: ()  => void) => {
        resetPassword(values);
        resetForm();
    }

    return (
        <Formik
            initialValues={{ email: '' }}
            onSubmit={ (values, { resetForm }) => handleResetPassword(values, resetForm) }
            validationSchema={ forgotPasswordFormSchema }
            validateOnMount
        >
            { ({ handleSubmit, isValid, errors }) => (
                <View style={ themeStyles.formContainer }>
                    <View style={{ ...themeStyles.btnLink, marginBottom: 30, marginTop: 60, width: width * 0.9 }}>
                        <Text
                            style={{
                                ...themeStyles.formText,
                                color: colors.titleText,
                                fontSize: 18
                            }}
                        >
                            Ingresa tu correo electrónico para restablecer tu contraseña y recuperar tu cuenta.
                        </Text>
                    </View>

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
                        text="Restablecer contraseña"
                        touchableStyle={{ paddingHorizontal: 20, marginTop: 30 }}
                    />

                    <View style={{ ...themeStyles.btnLink, marginBottom: 100, width: width * 0.9 }}>
                        <TouchableOpacity
                            activeOpacity={ 0.75 }
                            onPress={ () => navigate('LoginScreen' as never) }
                        >
                            <Text
                                style={{
                                    ...themeStyles.formLink,
                                    color: colors.linkText
                                }}
                            >
                                Ingresar con mi cuenta
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1 }} />
                </View>
            ) }
        </Formik>
    );
}