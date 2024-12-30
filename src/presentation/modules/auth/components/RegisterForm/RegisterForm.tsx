import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { useStyles } from 'react-native-unistyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Components */
import { AuthStackNavigationType, Button, EyeBtn, FormField, Link } from '@ui';

/* Hooks */
import { useAuth } from '../../hooks';
import { useStatus } from '@shared';

/* Schemas */
import { registerFormSchema } from './schemas';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This component is responsible for rendering the fields so that a user
 * can register in the app.
 *
 * @return {JSX.Element} The rendered form component.
 */
export const RegisterForm = (): JSX.Element => {
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState<boolean>(false);

    const navigation = useNavigation<AuthStackNavigationType>();
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { isAuthLoading }, signUp } = useAuth();
    const { setErrorForm } = useStatus();

    const { errors, handleChange, handleSubmit, isValid, values } = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: (values, { resetForm }) => signUp(values, resetForm),
        validateOnMount: true,
        validationSchema: registerFormSchema
    });

    /**
     * Handles the press event of the register button by submitting the form
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

            {/* Name field */}
            <FormField
                autoCapitalize="none"
                leftIcon={
                    <Ionicons
                        color={ colors.icon }
                        name="person-outline"
                        size={ fontSizes.icon }
                    />
                }
                label="Nombre:"
                onChangeText={ handleChange('name') }
                placeholder="Ingrese su nombre"
                value={ values.name }
            />

            {/* Surname field */}
            <FormField
                autoCapitalize="none"
                leftIcon={
                    <Ionicons
                        color={ colors.icon }
                        name="people-outline"
                        size={ fontSizes.icon }
                    />
                }
                label="Apellidos:"
                onChangeText={ handleChange('surname') }
                placeholder="Ingrese su apellido"
                value={ values.surname }
            />

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
                value={ values.email }
            />

            {/* Password field */}
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
                label="Contraseña:"
                onChangeText={ handleChange('password') }
                placeholder="Ingrese su contraseña"
                secureTextEntry={ !showPassword }
                value={ values.password }
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
                onChangeText={ handleChange('confirmPassword') }
                placeholder="Confirme su contraseña"
                secureTextEntry={ !showConfirmPassword }
                value={ values.confirmPassword }
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
                pressableStyle={{ marginTop: (margins.lg - 2) }}
                text="Crear cuenta"
            />

            {/* Sign in link */}
            <View style={ themeStyles.btnLink }>
                <Text style={ themeStyles.formText }>
                    ¿Ya tienes cuenta?
                </Text>

                <Link
                    onPress={ () => navigation.popTo('LoginScreen') }
                    testID="register-form-sign-in"
                >
                    Ingresa aquí
                </Link>
            </View>
        </View>
    );
}