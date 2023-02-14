import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { object, ref, string } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, EyeBtn, FormField } from '../../ui';

/* Hooks */
import { useAuth, useStatus, useTheme } from '../../../hooks';

/**
 * This component is responsible for rendering the fields to change the credentials
 * of an authenticated user (email and password).
 */
export const CredentialsForm = () => {
    const [ loadingEmail, setLoadingEmail ] = useState<boolean>(false);
    const [ loadingPassword, setLoadingPassword ] = useState<boolean>(false);
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState<boolean>(false);
    const { top } = useSafeAreaInsets();

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
            .oneOf([ ref('password'), null ], 'Las contraseñas no coinciden.')
            .required('La confirmación de la contraseña es requerida.'),
    });

    /**
     * The function takes an object with a property called email, and returns a function that takes no
     * arguments and returns nothing.
     * @param values - { email: string }
     */
    const handleUpdateEmail = (values: { email: string }) => {
        setLoadingEmail(true);
        updateEmail(values, () => setLoadingEmail(false));
    }

    /**
     * handleUpdatePassword is a function that takes two arguments, values and resetForm, and returns
     * a function that takes no arguments and returns a promise that calls resetForm.
     * @param values - { password: string, confirmPassword: string }
     * @param resetForm - () => void
     */
    const handleUpdatePassword = (values: { password: string, confirmPassword: string }, resetForm: () => void) => {
        setLoadingPassword(true);
        updatePassword({ password: values.password }, () => setLoadingPassword(false))
            .then(resetForm);
    }

    return (
        <View style={{ paddingVertical: top }}>
            <Formik
                initialValues={{ email: user.email }}
                onSubmit={ handleUpdateEmail }
                validateOnMount
                validationSchema={ emailFormSchema }
            >
                { ({ errors, handleSubmit, isValid }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', paddingBottom: top }}>

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
                onSubmit={ (values, { resetForm }) => handleUpdatePassword(values, resetForm) }
                validateOnMount
                validationSchema={ passwordFormSchema }
            >
                { ({ errors, handleSubmit, isValid }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', paddingBottom: top }}>

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
                            touchableStyle={{ paddingHorizontal: 20, marginTop: top }}
                        />
                    </View>
                ) }
            </Formik>
        </View>
    );
}