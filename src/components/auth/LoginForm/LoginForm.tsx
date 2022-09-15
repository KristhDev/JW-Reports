import React, { useState } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button, EyeBtn, FormField } from '../../ui';

import { useTheme } from '../../../hooks';

import styles from './styles';

export const LoginForm = () => {
    const [ showPassword, setShowPassword ] = useState<boolean>(false);

    const { navigate } = useNavigation();
    const { width } = useWindowDimensions();

    const { state: { colors } } = useTheme();

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={ () => {} }
        >
            { ({ handleSubmit }) => (
                <View style={ styles.loginForm }>
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

                    <Button
                        onPress={ handleSubmit }
                        text="Ingresar"
                        touchableStyle={{ paddingHorizontal: 20, marginTop: 30 }}
                    />

                    <View style={{ ...styles.btnLink, width: width * 0.9 }}>
                            <Text
                                style={{
                                    ...styles.formText,
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
                                        ...styles.formLink,
                                        color: colors.linkText
                                    }}
                                >
                                    Crea una aquí
                                </Text>
                            </TouchableOpacity>
                        </View>
                </View>
            ) }
        </Formik>
    );
}