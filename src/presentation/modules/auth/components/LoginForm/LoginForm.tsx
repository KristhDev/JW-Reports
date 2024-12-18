import React, { useState } from 'react';
import { View, Text, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Components */
import { AuthStackNavigationType, Button, EyeBtn, FormField, Link } from '@ui';

/* Hooks */
import { useAuth } from '../../hooks';
import { useStatus } from '@shared';

/* Schemas */
import { loginFormSchema } from './schemas';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * Renders a login form component.
 *
 * @return {JSX.Element} The login form component.
 */
export const LoginForm = (): JSX.Element => {
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const { width } = useWindowDimensions();

    const navigation = useNavigation<AuthStackNavigationType>();
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { isAuthLoading }, signIn } = useAuth();
    const { setErrorForm } = useStatus();

    const { errors, handleChange, handleSubmit, isValid, values } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: signIn,
        validateOnMount: true,
        validationSchema: loginFormSchema
    });

    /**
     * Handles the press event of the login button by submitting the form
     * if it is valid or showing the errors if it is not.
     *
     * @return {void} This function does not return anything.
     */
    const handlePress = (): void => {
        if (isValid) handleSubmit();
        else setErrorForm(errors);
    }

    return (
        <View style={{ ...themeStyles.formContainer, flex: 0, marginBottom: margins.xl }}>

            <View style={{ height: width / 4 }} />

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
                style={{ marginBottom: margins.xl }}
                value={ values.password }
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
                text="Ingresar"
            />

            {/* Sign up link */}
            <View style={ themeStyles.btnLink }>
                <Text style={ themeStyles.formText }>
                    ¿No tienes cuenta?
                </Text>

                <Link
                    onPress={ () => navigation.navigate('RegisterScreen') }
                    testID="login-form-sign-up"
                >
                    Crea una aquí
                </Link>
            </View>

            {/* Forgot password link */}
            <View style={{ ...themeStyles.btnLink, marginTop: margins.sm }}>
                <Link
                    onPress={ () => navigation.navigate('ForgotPasswordScreen') }
                    testID="login-form-forgor-pass"
                >
                    Olvide mi contraseña
                </Link>
            </View>
        </View>
    );
}