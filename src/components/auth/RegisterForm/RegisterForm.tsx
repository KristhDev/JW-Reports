import React, { useState } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { object, ref, string } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, EyeBtn, FormField } from '../../ui';

/* Hooks */
import { useAuth, useStatus, useTheme } from '../../../hooks';

/* Theme */
import { styles as themeStyles } from '../../../theme';

/**
 * This component is responsible for rendering the fields so that a user
 * can register in the app.
 *
 * @return {JSX.Element} The rendered form component.
 */
export const RegisterForm = (): JSX.Element => {
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState<boolean>(false);

    const { navigate } = useNavigation();
    const { width } = useWindowDimensions();

    const { state: { isAuthLoading }, signUp } = useAuth();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    /* Validation schema for register values */
    const registerFormSchema = object().shape({
        name: string()
            .min(2, 'El nombre debe tener al menos 2 caracteres.')
            .required('El nombre es requerido.'),
        surname: string()
            .min(2, 'Los apellidos deben tener al menos 2 caracteres.')
            .required('Los apellidos son requeridos.'),
        email: string()
            .email('Correo electrónico inválido.')
            .required('El correo electrónico es requerido.'),
        password: string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres.')
            .required('La contraseña es requerida.'),
        confirmPassword: string()
            .oneOf([ ref('password'), undefined ], 'Las contraseñas no coinciden.')
            .required('La confirmación de la contraseña es requerida.'),
    });

    return (
        <Formik
            initialValues={{
                name: '',
                surname: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            onSubmit={ signUp }
            validateOnMount
            validationSchema={ registerFormSchema }
        >
            { ({ handleSubmit, isValid, errors }) => (
                <View style={ themeStyles.formContainer }>

                    {/* Name field */}
                    <FormField
                        autoCapitalize="none"
                        icon={
                            <Icon
                                color={ colors.icon }
                                name="person-outline"
                                size={ 25 }
                            />
                        }
                        label="Nombre:"
                        name="name"
                        placeholder="Ingrese su nombre"
                    />

                    {/* Surname field */}
                    <FormField
                        autoCapitalize="none"
                        icon={
                            <Icon
                                color={ colors.icon }
                                name="people-outline"
                                size={ 25 }
                            />
                        }
                        label="Apellidos:"
                        name="surname"
                        placeholder="Ingrese su apellido"
                    />

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
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                        text="Crear cuenta"
                        touchableStyle={{ marginTop: 30 }}
                    />

                    {/* Sign in link */}
                    <View style={{ ...themeStyles.btnLink, width: width * 0.9 }}>
                        <Text
                            style={{
                                ...themeStyles.formText,
                                color: colors.titleText
                            }}
                        >
                            ¿Ya tienes cuenta?
                        </Text>

                        <TouchableOpacity
                            activeOpacity={ 0.75 }
                            onPress={ () => navigate('LoginScreen' as never) }
                            testID="register-form-sign-in"
                        >
                            <Text
                                style={{
                                    ...themeStyles.formLink,
                                    color: colors.linkText
                                }}
                            >
                                Ingresa aquí
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) }
        </Formik>
    );
}