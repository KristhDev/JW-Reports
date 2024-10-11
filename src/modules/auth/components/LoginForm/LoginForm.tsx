import React, { useState } from 'react';
import { View, Text, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, EyeBtn, FormField, Link } from '../../../ui';

/* Hooks */
import { useAuth } from '../../hooks';
import { useStatus } from '../../../shared';

/* Schemas */
import { loginFormSchema } from './schemas';

/* Theme */
import { themeStylesheet } from '../../../theme';

/**
 * Renders a login form component.
 *
 * @return {JSX.Element} The login form component.
 */
export const LoginForm = (): JSX.Element => {
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const { width } = useWindowDimensions();

    const navigation = useNavigation();
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { isAuthLoading }, signIn } = useAuth();
    const { setErrorForm } = useStatus();

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={ signIn }
            validationSchema={ loginFormSchema }
            validateOnMount
        >
            { ({ handleSubmit, isValid, errors }) => (
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
                        name="email"
                        placeholder="Ingrese su correo"
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
                        name="password"
                        placeholder="Ingrese su contraseña"
                        secureTextEntry={ !showPassword }
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
                        text="Ingresar"
                    />

                    {/* Sign up link */}
                    <View style={ themeStyles.btnLink }>
                        <Text style={ themeStyles.formText }>
                            ¿No tienes cuenta?
                        </Text>

                        <Link
                            onPress={ () => navigation.navigate('RegisterScreen' as never) }
                            testID="login-form-sign-up"
                        >
                            Crea una aquí
                        </Link>
                    </View>

                    {/* Forgot password link */}
                    <View style={{ ...themeStyles.btnLink, marginTop: margins.sm }}>
                        <Link
                            onPress={ () => navigation.navigate('ForgotPasswordScreen' as never) }
                            testID="login-form-forgor-pass"
                        >
                            Olvide mi contraseña
                        </Link>
                    </View>
                </View>
            ) }
        </Formik>
    );
}