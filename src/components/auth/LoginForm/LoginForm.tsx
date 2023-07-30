import React, { useState } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { object, string } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, EyeBtn, FormField } from '../../ui';

/* Hooks */
import { useAuth, useStatus, useTheme } from '../../../hooks';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * Renders a login form component.
 *
 * @return {JSX.Element} The login form component.
 */
export const LoginForm = (): JSX.Element => {
    const [ showPassword, setShowPassword ] = useState<boolean>(false);

    const { navigate } = useNavigation();
    const { width } = useWindowDimensions();

    const { state: { isAuthLoading }, signIn } = useAuth();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    /* Validation schema for login values (email and password) */
    const loginFormSchema = object().shape({
        email: string()
            .email('Correo electrónico inválido.')
            .required('El correo electrónico es requerido.'),
        password: string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres.')
            .required('La contraseña es requerida.')
    });

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
                <View style={{ ...themeStyles.formContainer, flex: 0, marginBottom: 40 }}>

                    <View style={{ height: width / 4 }} />

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

                    {/* Password field */}
                    <FormField
                        autoCapitalize="none"
                        icon={
                            <EyeBtn
                                onToggle={ setShowPassword }
                                value={ showPassword }
                            />
                        }
                        label="Contraseña:"
                        name="password"
                        placeholder="Ingrese su contraseña"
                        secureTextEntry={ !showPassword }
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
                        text="Ingresar"
                    />

                    {/* Sign up link */}
                    <View style={ themeStyles.btnLink }>
                        <Text
                            style={{
                                ...themeStyles.formText,
                                color: colors.titleText
                            }}
                        >
                            ¿No tienes cuenta?
                        </Text>

                        <TouchableOpacity
                            activeOpacity={ 0.75 }
                            onPress={ () => navigate('RegisterScreen' as never) }
                            testID="login-form-sign-up"
                        >
                            <Text
                                style={{
                                    ...themeStyles.formLink,
                                    color: colors.linkText
                                }}
                            >
                                Crea una aquí
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Forgot password link */}
                    <View style={{ ...themeStyles.btnLink, marginTop: 16 }}>
                        <TouchableOpacity
                            activeOpacity={ 0.75 }
                            onPress={ () => navigate('ForgotPasswordScreen' as never) }
                            testID="login-form-forgor-pass"
                        >
                            <Text
                                style={{
                                    ...themeStyles.formLink,
                                    color: colors.linkText
                                }}
                            >
                                Olvide mi contraseña
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) }
        </Formik>
    );
}