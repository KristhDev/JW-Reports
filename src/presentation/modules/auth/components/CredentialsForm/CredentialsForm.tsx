import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useFormik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, EyeBtn, FormField } from '@ui';

/* Hooks */
import { useAuth } from '../../hooks';
import { useStatus } from '@shared';

/* Schemas */
import { emailFormSchema, passwordFormSchema } from './schemas';

/**
 * The function takes no arguments and returns a component that renders a form
 * for updating user credentials.
 *
 * @return {JSX.Element} The rendered form component.
 */
export const CredentialsForm = (): JSX.Element => {
    const [ loadingEmail, setLoadingEmail ] = useState<boolean>(false);
    const [ loadingPassword, setLoadingPassword ] = useState<boolean>(false);
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState<boolean>(false);

    const { theme: { colors, fontSizes, margins } } = useStyles();

    const { state: { user, isAuthLoading }, updateEmail, updatePassword } = useAuth();
    const { setErrorForm } = useStatus();

    /**
     * Handles updating the email.
     *
     * @param {Object} values - The values object containing the email to be updated.
     * @param {string} values.email - The new email.
     * @return {void} This function does not return anything.
     */
    const handleUpdateEmail = (values: { email: string }): void => {
        setLoadingEmail(true);
        updateEmail(values, () => setLoadingEmail(false));
    }

    /**
     * Updates the password with the provided values and resets the form.
     *
     * @param {Object} values - An object containing the password and confirmPassword.
     * @param {Function} resetForm - A function to reset the form.
     * @return {void} This function does not return anything.
     */
    const handleUpdatePassword = (values: { password: string, confirmPassword: string }, resetForm: () => void): void => {
        setLoadingPassword(true);
        updatePassword({ password: values.password }, () => setLoadingPassword(false))
            .then(resetForm);
    }

    const formikUpdateEmail = useFormik({
        initialValues: { email: user.email },
        onSubmit: handleUpdateEmail,
        validateOnMount: true,
        validationSchema: emailFormSchema(user.email)
    });

    const formikUpdatePassword = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        onSubmit: (values, { resetForm }) => handleUpdatePassword(values, resetForm),
        validateOnMount: true,
        validationSchema: passwordFormSchema
    });

    /**
     * Handles submitting the form for updating the user's email.
     *
     * If the form is valid, calls the handleSubmit function from the formik
     * object. Otherwise, sets the error form from the formik object.
     *
     * @return {void} This function does not return anything.
     */
    const handleSubmitUpdateEmail = (): void => {
        if (formikUpdateEmail.isValid) formikUpdateEmail.handleSubmit();
        else setErrorForm(formikUpdateEmail.errors);
    }

    /**
     * Handles submitting the form for updating the user's password.
     *
     * If the form is valid, calls the handleSubmit function from the formik
     * object. Otherwise, sets the error form from the formik object.
     *
     * @return {void} This function does not return anything.
     */
    const handleSubmitUpdatePassword = (): void => {
        if (formikUpdatePassword.isValid) formikUpdatePassword.handleSubmit();
        else setErrorForm(formikUpdatePassword.errors);
    }

    return (
        <View>
            <View style={{ alignItems: 'center', justifyContent: 'flex-start' }}>

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
                    onChangeText={ formikUpdateEmail.handleChange('email') }
                    placeholder="Ingrese su correo"
                    style={{ marginBottom: margins.xl }}
                    value={ formikUpdateEmail.values.email }
                />

                {/* Submit button */}
                <Button
                    disabled={ isAuthLoading && loadingEmail }
                    icon={ (isAuthLoading && loadingEmail) && (
                        <ActivityIndicator
                            color={ colors.contentHeader }
                            size={ fontSizes.icon }
                        />
                    ) }
                    onPress={ handleSubmitUpdateEmail }
                    pressableStyle={{ marginBottom: margins.xl }}
                    text="Cambiar correo"
                />
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'flex-start' }}>

                {/* New password field */}
                <FormField
                    autoCapitalize="none"
                    leftIcon={
                        <Ionicons
                            color={ colors.icon }
                            name="key-outline"
                            size={ fontSizes.icon }
                        />
                    }
                    rightIcon={
                        <EyeBtn
                            onToggle={ setShowPassword }
                            value={ showPassword }
                        />
                    }
                    label="Nueva contraseña:"
                    onChangeText={ formikUpdatePassword.handleChange('password') }
                    placeholder="Ingrese su contraseña"
                    secureTextEntry={ !showPassword }
                    value={ formikUpdatePassword.values.password }
                />

                {/* Confirm password field */}
                <FormField
                    autoCapitalize="none"
                    leftIcon={
                        <Ionicons
                            color={ colors.icon }
                            name="key-outline"
                            size={ fontSizes.icon }
                        />
                    }
                    rightIcon={
                        <EyeBtn
                            onToggle={ setShowConfirmPassword }
                            value={ showConfirmPassword }
                        />
                    }
                    label="Confirmar contraseña:"
                    onChangeText={ formikUpdatePassword.handleChange('confirmPassword') }
                    placeholder="Confirme su contraseña"
                    secureTextEntry={ !showConfirmPassword }
                    style={{ marginBottom: margins.xl }}
                    value={ formikUpdatePassword.values.confirmPassword }
                />

                {/* Submit button */}
                <Button
                    disabled={ isAuthLoading && loadingPassword }
                    icon={ (isAuthLoading && loadingPassword) && (
                        <ActivityIndicator
                            color={ colors.contentHeader }
                            size={ fontSizes.icon }
                        />
                    ) }
                    onPress={ handleSubmitUpdatePassword }
                    pressableStyle={{ marginBottom: margins.xl }}
                    text="Cambiar contraseña"
                />
            </View>
        </View>
    );
}