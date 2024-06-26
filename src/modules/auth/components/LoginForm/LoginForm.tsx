import React, { useState } from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, EyeBtn, FormField } from '../../../ui';

/* Hooks */
import { useAuth } from '../../hooks';
import { useStatus } from '../../../shared';

/* Schemas */
import { loginFormSchema } from './schemas';

/* Theme */
import { styles as themeStylesheet } from '../../../theme';

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
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

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
                        icon={
                            <Icon
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

                        <TouchableOpacity
                            activeOpacity={ 0.75 }
                            onPress={ () => navigate('RegisterScreen' as never) }
                            testID="login-form-sign-up"
                        >
                            <Text style={ themeStyles.formLink }>
                                Crea una aquí
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Forgot password link */}
                    <View style={{ ...themeStyles.btnLink, marginTop: margins.sm }}>
                        <TouchableOpacity
                            activeOpacity={ 0.75 }
                            onPress={ () => navigate('ForgotPasswordScreen' as never) }
                            testID="login-form-forgor-pass"
                        >
                            <Text style={ themeStyles.formLink }>
                                Olvide mi contraseña
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) }
        </Formik>
    );
}