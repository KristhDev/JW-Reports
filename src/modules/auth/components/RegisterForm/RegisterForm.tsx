import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { useStyles } from 'react-native-unistyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, EyeBtn, FormField, Link } from '../../../ui/components';

/* Hooks */
import { useAuth } from '../../hooks';
import { useStatus } from '../../../shared';

/* Schemas */
import { registerFormSchema } from './schemas';

/* Theme */
import { themeStylesheet } from '../../../theme';

/**
 * This component is responsible for rendering the fields so that a user
 * can register in the app.
 *
 * @return {JSX.Element} The rendered form component.
 */
export const RegisterForm = (): JSX.Element => {
    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState<boolean>(false);

    const navigation = useNavigation();
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { isAuthLoading }, signUp } = useAuth();
    const { setErrorForm } = useStatus();

    return (
        <Formik
            initialValues={{
                name: '',
                surname: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}
            onSubmit={ (values, { resetForm }) => signUp(values, resetForm) }
            validateOnMount
            validationSchema={ registerFormSchema }
        >
            { ({ handleSubmit, isValid, errors }) => (
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
                        name="name"
                        placeholder="Ingrese su nombre"
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
                        name="surname"
                        placeholder="Ingrese su apellido"
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
                        name="confirmPassword"
                        placeholder="Confirme su contraseña"
                        secureTextEntry={ !showConfirmPassword }
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
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                        pressableStyle={{ marginTop: (margins.lg - 2) }}
                        text="Crear cuenta"
                    />

                    {/* Sign in link */}
                    <View style={ themeStyles.btnLink }>
                        <Text style={ themeStyles.formText }>
                            ¿Ya tienes cuenta?
                        </Text>

                        <Link
                            onPress={ () => navigation.navigate('LoginScreen' as never) }
                            testID="register-form-sign-in"
                        >
                            Ingresa aquí
                        </Link>
                    </View>
                </View>
            ) }
        </Formik>
    );
}