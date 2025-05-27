import React, { useState } from 'react';
import { View, Text, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Config */
import { placeholdersService } from '@config/di';

/* Components */
import { Button, EyeBtn, FormField, Link } from '@ui/components';

/* Hooks */
import { useAuth } from '../../hooks';
import { useAsyncAction, useToaster, useTranslation } from '@ui/hooks';

/* Schemas */
import { generateLoginFormSchema } from './schemas';

/* Theme */
import { themeStylesheet } from '@theme/styles';

/**
 * Renders a login form component.
 *
 * @return {JSX.Element} The login form component.
 */
export const LoginForm = (): JSX.Element => {
    const authPlaceholders = placeholdersService.authPlaceholders;

    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const { width } = useWindowDimensions();

    const router = useRouter();
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { signIn } = useAuth();
    const { showFormError } = useToaster();
    const { translate } = useTranslation();
    const { isLoading, excuteAsyncAction } = useAsyncAction(signIn);

    const { errors, handleChange, handleSubmit, isValid, values } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: excuteAsyncAction,
        validateOnMount: true,
        validationSchema: generateLoginFormSchema()
    });

    /**
     * Handles the press event of the login button by submitting the form
     * if it is valid or showing the errors if it is not.
     *
     * @return {void} This function does not return anything.
     */
    const handlePress = (): void => {
        if (isValid) handleSubmit();
        else showFormError(errors);
    }

    return (
        <View style={{ ...themeStyles.formContainer, flex: 0, marginBottom: margins.xl }}>

            <View style={{ height: width / 4 }} />

            {/* Email field */}
            <FormField
                autoCapitalize="none"
                editable={ !isLoading }
                leftIcon={
                    <Ionicons
                        color={ colors.icon }
                        name="mail-outline"
                        size={ fontSizes.icon }
                    />
                }
                keyboardType="email-address"
                label={ translate('forms.labels.email') }
                onChangeText={ handleChange('email') }
                placeholder={ authPlaceholders.EMAIL }
                value={ values.email }
            />

            {/* Password field */}
            <FormField
                autoCapitalize="none"
                editable={ !isLoading }
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
                label={ translate('forms.labels.password') }
                onChangeText={ handleChange('password') }
                placeholder={ authPlaceholders.PASSWORD }
                secureTextEntry={ !showPassword }
                style={{ marginBottom: margins.xl }}
                value={ values.password }
            />

            {/* Submit button */}
            <Button
                disabled={ isLoading }
                icon={ (isLoading) && (
                    <ActivityIndicator
                        color={ colors.contentHeader }
                        size={ fontSizes.icon }
                    />
                ) }
                onPress={ handlePress }
                text={ translate('forms.actions.auth.signIn') }
            />

            {/* Sign up link */}
            <View style={ themeStyles.btnLink }>
                <Text style={ themeStyles.formText }>
                    { translate('forms.links.createAccount.ask') }
                </Text>

                <Link
                    onPress={ () => router.navigate('/auth/register') }
                    testID="login-form-sign-up"
                >
                    { translate('forms.links.createAccount.action') }
                </Link>
            </View>

            {/* Forgot password link */}
            <View style={{ ...themeStyles.btnLink, marginTop: margins.sm }}>
                <Link
                    onPress={ () => router.navigate('/auth/forgot-password') }
                    testID="login-form-forgor-pass"
                >
                    { translate('forms.links.forgotPassword') }
                </Link>
            </View>
        </View>
    );
}