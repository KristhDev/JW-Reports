import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Components */
import { AuthStackNavigationType, Button, FormField, Link } from '@ui';

/* Hooks */
import { useStatus } from '@shared';
import { useAuth } from '../../hooks';

/* Schemas */
import { forgotPasswordFormSchema } from './schemas';

/* Interfaces */
import { EmailData } from '../../interfaces';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This component is responsible for rendering the fields to request a user's
 * password reset to recover their account.
 *
 * @return {JSX.Element} The rendered form component.
 */
export const ForgotPasswordForm = (): JSX.Element => {
    const navigation = useNavigation<AuthStackNavigationType>();
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

    const { errors, handleChange, handleSubmit, isValid, values } = useFormik({
        initialValues: { email: '' },
        onSubmit: (values, { resetForm }) => handleResetPassword(values, resetForm),
        validateOnMount: true,
        validationSchema: forgotPasswordFormSchema
    });

    /**
     * Handles the press event of the reset password button by submitting the form
     * if it is valid or showing the errors if it is not.
     *
     * @return {void} This function does not return anything.
     */
    const handlePress = (): void => {
        if (isValid) handleSubmit();
        else setErrorForm(errors);
    }

    return (
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
                onChangeText={ handleChange('email') }
                placeholder="Ingrese su correo"
                style={{ marginBottom: margins.xl }}
                value={  values.email }
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
                onPress={ handlePress }
                text="Restablecer contraseña"
            />

            {/* Sign in link */}
            <View style={{ ...themeStyles.btnLink, marginBottom: margins.sm * 6 }}>
                <Link
                    onPress={ () => navigation.navigate('LoginScreen') }
                    testID="forgot-pass-form-sign-in"
                >
                    Ingresar con mi cuenta
                </Link>
            </View>

            <View style={{ flex: 1 }} />
        </View>
    );
}