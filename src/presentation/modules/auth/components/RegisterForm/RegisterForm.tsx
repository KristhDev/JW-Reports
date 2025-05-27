import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useFormik } from 'formik';
import { useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Config */
import { placeholdersService } from '@config/di';

/* Components */
import { Button, EyeBtn, FormField, Link } from '@ui/components';

/* Hooks */
import { useAuth } from '../../hooks';
import { useAsyncAction, useToaster, useTranslation } from '@ui/hooks';

/* Schemas */
import { generateRegisterFormSchema } from './schemas';

/* Theme */
import { themeStylesheet } from '@theme/styles';

/**
 * This component is responsible for rendering the fields so that a user
 * can register in the app.
 *
 * @return {JSX.Element} The rendered form component.
 */
export const RegisterForm = (): JSX.Element => {
    const authPlaceholders = placeholdersService.authPlaceholders;

    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState<boolean>(false);

    const router = useRouter();
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { signUp } = useAuth();
    const { showFormError } = useToaster();
    const { translate } = useTranslation();
    const { isLoading, excuteAsyncAction } = useAsyncAction(signUp);

    const { errors, handleChange, handleSubmit, isValid, values } = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: (values, { resetForm }) => excuteAsyncAction(values).then(() => resetForm()),
        validateOnMount: true,
        validationSchema: generateRegisterFormSchema()
    });

    /**
     * Handles the press event of the register button by submitting the form
     * if it is valid or showing the errors if it is not.
     *
     * @return {void} This function does not return anything.
     */
    const handlePress = (): void => {
        if (isValid) handleSubmit();
        else showFormError(errors);
    }

    return (
        <View style={ themeStyles.formContainer }>

            {/* Name field */}
            <FormField
                autoCapitalize="none"
                editable={ !isLoading }
                leftIcon={
                    <Ionicons
                        color={ colors.icon }
                        name="person-outline"
                        size={ fontSizes.icon }
                    />
                }
                label={ translate('forms.labels.name') }
                onChangeText={ handleChange('name') }
                placeholder={ authPlaceholders.NAME }
                value={ values.name }
            />

            {/* Surname field */}
            <FormField
                autoCapitalize="none"
                editable={ !isLoading }
                leftIcon={
                    <Ionicons
                        color={ colors.icon }
                        name="people-outline"
                        size={ fontSizes.icon }
                    />
                }
                label={ translate('forms.labels.surname') }
                onChangeText={ handleChange('surname') }
                placeholder={ authPlaceholders.SURNAME }
                value={ values.surname }
            />

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
                value={ values.password }
            />

            {/* Confirm password field */}
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
                        onToggle={ setShowConfirmPassword }
                        value={ showConfirmPassword }
                    />
                }
                label={ translate('forms.labels.confirmPassword') }
                onChangeText={ handleChange('confirmPassword') }
                placeholder={ authPlaceholders.CONFIRM_PASSWORD }
                secureTextEntry={ !showConfirmPassword }
                value={ values.confirmPassword }
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
                pressableStyle={{ marginTop: (margins.lg - 2) }}
                text={ translate('forms.actions.auth.signUp') }
            />

            {/* Sign in link */}
            <View style={ themeStyles.btnLink }>
                <Text style={ themeStyles.formText }>
                    { translate('forms.links.signIn.ask') }
                </Text>

                <Link
                    onPress={ () => router.back() }
                    testID="register-form-sign-in"
                >
                    { translate('forms.links.signIn.action') }
                </Link>
            </View>
        </View>
    );
}