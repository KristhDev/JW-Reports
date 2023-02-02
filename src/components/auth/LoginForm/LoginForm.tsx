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
 * This component is responsible for rendering the fields so that a user
 * can log in with their account
 */
export const LoginForm = () => {
    const [ showPassword, setShowPassword ] = useState<boolean>(false);

    const { navigate } = useNavigation();
    const { width } = useWindowDimensions();

    const { state: { isAuthLoading }, login } = useAuth();
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
            onSubmit={ login }
            validationSchema={ loginFormSchema }
            validateOnMount
        >
            { ({ handleSubmit, isValid, errors }) => (
                <View style={ themeStyles.formContainer }>

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
                    />

                    {/* Submit button */}
                    <Button
                        disabled={ isAuthLoading }
                        icon={
                            (isAuthLoading) && (
                                <ActivityIndicator
                                    color={ colors.contentHeader }
                                    size="small"
                                    style={{ marginLeft: 10 }}
                                />
                            )
                        }
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors)  }
                        text="Ingresar"
                        touchableStyle={{ paddingHorizontal: 20, marginTop: 30 }}
                    />

                    {/* Sign up link */}
                    <View style={{ ...themeStyles.btnLink, width: width * 0.9 }}>
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
                    <View style={{ ...themeStyles.btnLink, marginTop: 10, width: width * 0.9 }}>
                        <TouchableOpacity
                            activeOpacity={ 0.75 }
                            onPress={ () => navigate('ForgotPasswordScreen' as never) }
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