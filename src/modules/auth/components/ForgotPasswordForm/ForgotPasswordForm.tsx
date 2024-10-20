import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, FormField, Link } from '../../../ui';

/* Hooks */
import { useStatus } from '../../../shared';
import { useAuth } from '../../hooks';

/* Schemas */
import { forgotPasswordFormSchema } from './schemas';

/* Interfaces */
import { EmailData } from '../../interfaces';

/* Theme */
import { themeStylesheet } from '../../../theme';

/**
 * This component is responsible for rendering the fields to request a user's
 * password reset to recover their account.
 *
 * @return {JSX.Element} The rendered form component.
 */
export const ForgotPasswordForm = (): JSX.Element => {
    const navigation = useNavigation();
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { isAuthLoading }, resetPassword } = useAuth();
    const { setErrorForm } = useStatus();

    /**
     * Handles the reset password functionality.
     *
     * @param {Object} values - An object containing the email value.
     * @param {Function} resetForm - A function to reset the form.
     * @return {void} This function does not return any value.
     */
    const handleResetPassword = (values: EmailData, resetForm: ()  => void): void => {
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
                    <View style={{ ...themeStyles.btnLink, marginTop: 0, marginBottom: margins.xl }}>
                        <Text style={{ ...themeStyles.formText, fontSize: (fontSizes.sm + 2) }}>
                            Ingrese su correo electrónico para restablecer su contraseña y recuperar la cuenta.
                        </Text>
                    </View>

                    {/* Email field */}
                    <FormField
                        autoCapitalize="none"
                        leftIcon={
                            <Ionicons
                                color={ colors.icon }
                                name="mail-outline"
                                size={ fontSizes.icon }
                            />
                        }
                        keyboardType="email-address"
                        label="Correo:"
                        name="email"
                        placeholder="Ingrese su correo"
                        style={{ marginBottom: margins.xl }}
                    />

                    {/* Submit button */}
                    <Button
                        disabled={ isAuthLoading }
                        icon={ (isAuthLoading) && (
                            <ActivityIndicator
                                color={ colors.contentHeader }
                                size={ fontSizes.icon }
                            />
                        ) }
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors)  }
                        text="Restablecer contraseña"
                    />

                    {/* Sign in link */}
                    <View style={{ ...themeStyles.btnLink, marginBottom: margins.sm * 6 }}>
                        <Link
                            onPress={ () => navigation.navigate('LoginScreen' as never) }
                            testID="forgot-pass-form-sign-in"
                        >
                            Ingresar con mi cuenta
                        </Link>
                    </View>

                    <View style={{ flex: 1 }} />
                </View>
            ) }
        </Formik>
    );
}