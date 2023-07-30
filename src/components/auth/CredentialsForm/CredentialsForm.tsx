import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { object, ref, string } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, EyeBtn, FormField } from '../../ui';

/* Hooks */
import { useAuth, useStatus, useTheme } from '../../../hooks';

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

    const { state: { user, isAuthLoading }, updateEmail, updatePassword } = useAuth();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    /* Validation schema for new email */
    const emailFormSchema = object().shape({
        email: string()
            .email('Correo electrónico inválido.')
            .notOneOf([ user.email ], 'Para actualizar tu correo debes cambiarlo.')
            .required('El correo electrónico es requerido.')
    });

    /* Validation schema for new password */
    const passwordFormSchema = object().shape({
        password: string()
            .min(6, 'La nueva contraseña debe tener al menos 6 caracteres.')
            .required('La nueva contraseña no puede estar vacía.'),
        confirmPassword: string()
            .oneOf([ ref('password'), undefined ], 'Las contraseñas no coinciden.')
            .required('La confirmación de la contraseña es requerida.'),
    });

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

    return (
        <View>
            <Formik
                initialValues={{ email: user.email }}
                onSubmit={ handleUpdateEmail }
                validateOnMount
                validationSchema={ emailFormSchema }
            >
                { ({ errors, handleSubmit, isValid }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start' }}>

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
                            touchableStyle={{ marginBottom: 40 }}
                        />
                    </View>
                ) }
            </Formik>

            <Formik
                initialValues={{
                    password: '',
                    confirmPassword: ''
                }}
                onSubmit={ (values, { resetForm }) => handleUpdatePassword(values, resetForm) }
                validateOnMount
                validationSchema={ passwordFormSchema }
            >
                { ({ errors, handleSubmit, isValid }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start' }}>

                        {/* New password field */}
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

                        {/* Confirm password field */}
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
                            style={{ marginBottom: 40 }}
                        />

                        {/* Submit button */}
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
                            touchableStyle={{ marginBottom: 40 }}
                        />
                    </View>
                ) }
            </Formik>
        </View>
    );
}