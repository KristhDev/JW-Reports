import React, { useState } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button, EyeBtn, FormField } from '../../ui';

import { useTheme } from '../../../hooks';

import styles from './styles';

export const RegisterForm = () => {
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState<boolean>(false);

    const { navigate } = useNavigation();
    const { width } = useWindowDimensions();

    const { state: { colors } } = useTheme();

    return (
        <Formik
            initialValues={{
                name: '',
                surname: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            onSubmit={ () => {} }
        >
            { ({ handleSubmit }) => (
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
                        label="Apellido:"
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
                        onPress={ handleSubmit }
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