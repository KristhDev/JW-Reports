import React, { useState } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { object, ref, string } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button, EyeBtn, FormField } from '../../ui';

import { useAuth, useStatus, useTheme } from '../../../hooks';

import styles from './styles';

export const RegisterForm = () => {
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState<boolean>(false);

    const { navigate } = useNavigation();
    const { width } = useWindowDimensions();

    const { state: { isAuthLoading }, register } = useAuth();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    const registerFormSchema = object().shape({
        name: string()
            .min(2, 'El nombre debe tener al menos 2 caracteres.')
            .required('El nombre es requerido.'),
        surnames: string()
            .min(2, 'Los apellidos deben tener al menos 2 caracteres.')
            .required('Los apellidos son requeridos.'),
        email: string()
            .email('Correo electrónico inválido.')
            .required('El correo electrónico es requerido.'),
        password: string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres.')
            .required('La contraseña es requerida.'),
        confirmPassword: string()
            .oneOf([ ref('password'), null ], 'Las contraseñas no coinciden.')
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
            onSubmit={ (values) => register({ ...values }) }
            validateOnMount
            validationSchema={ registerFormSchema }
        >
            { ({ handleSubmit, isValid, errors }) => (
                <View style={ styles.registerForm }>
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
                        secureTextEntry={ !showPassword }
                    />

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

                    <View style={{ ...styles.btnLink, width: width * 0.9 }}>
                        <Text
                            style={{
                                ...styles.formText,
                                color: colors.titleText
                            }}
                        >
                            ¿Ya tienes cuenta?
                        </Text>

                        <TouchableOpacity
                            activeOpacity={ 0.75 }
                            onPress={ () => navigate('LoginScreen' as never) }
                        >
                            <Text
                                style={{
                                    ...styles.formLink,
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