import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { object, string } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, FormField } from '../../ui';

/* Hooks */
import { useAuth, useStatus, useTheme } from '../../../hooks';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This component is responsible for rendering the fields to request a user's
 * password reset to recover their account.
 *
 * @return {JSX.Element} The rendered form component.
 */
export const ForgotPasswordForm = (): JSX.Element => {
    const { navigate } = useNavigation();

    const { state: { isAuthLoading }, resetPassword } = useAuth();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    /* Validation schema to forgot password */
    const forgotPasswordFormSchema = object().shape({
        email: string()
            .email('Correo electrónico inválido.')
            .required('El correo electrónico es requerido.')
    });


    /**
     * Handles the reset password functionality.
     *
     * @param {Object} values - An object containing the email value.
     * @param {Function} resetForm - A function to reset the form.
     * @return {void} This function does not return any value.
     */
    const handleResetPassword = (values: { email: string }, resetForm: ()  => void): void => {
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
                    <View style={{ ...themeStyles.btnLink, marginTop: 0, marginBottom: 40 }}>
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

                    {/* Email field */}
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
                        style={{ marginBottom: 40 }}
                    />

                    {/* Submit button */}
                    <Button
                        disabled={ isAuthLoading }
                        icon={
                            (isAuthLoading) && (
                                <ActivityIndicator
                                    color={ colors.contentHeader }
                                    size={ 25 }
                                    style={{ marginLeft: 10 }}
                                />
                            )
                        }
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors)  }
                        text="Restablecer contraseña"
                    />

                    {/* Sign in link */}
                    <View style={{ ...themeStyles.btnLink, marginBottom: 100 }}>
                        <TouchableOpacity
                            activeOpacity={ 0.75 }
                            onPress={ () => navigate('LoginScreen' as never) }
                            testID="forgot-pass-form-sign-in"
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