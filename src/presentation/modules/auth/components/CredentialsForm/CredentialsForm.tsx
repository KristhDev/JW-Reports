import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useFormik } from 'formik';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Config */
import { placeholdersService } from '@config/di';

/* Components */
import { Button, EyeBtn, FormField } from '@ui/components';

/* Hooks */
import { useAuth } from '../../hooks';
import { useStatus } from '@shared/hooks';
import { useAsyncAction, useTranslation } from '@ui/hooks';

/* Schemas */
import { generateEmailFormSchema, generatePasswordFormSchema } from './schemas';

/**
 * The function takes no arguments and returns a component that renders a form
 * for updating user credentials.
 *
 * @return {JSX.Element} The rendered form component.
 */
export const CredentialsForm = (): JSX.Element => {
    const authPlaceholders = placeholdersService.authPlaceholders;

    const [ showPassword, setShowPassword ] = useState<boolean>(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState<boolean>(false);

    const { theme: { colors, fontSizes, margins } } = useStyles();

    const { state: { user }, updateEmail, updatePassword } = useAuth();
    const { isLoading: isLoadingUpdateEmail, excuteAsyncAction: excuteAsyncUpdateEmail } = useAsyncAction(updateEmail);
    const { isLoading: isLoadingUpdatePassword, excuteAsyncAction: excuteAsyncUpdatePassword } = useAsyncAction(updatePassword);
    const { setErrorForm } = useStatus();
    const { translate } = useTranslation();

    const formikUpdateEmail = useFormik({
        initialValues: { email: user.email },
        onSubmit: excuteAsyncUpdateEmail,
        validateOnMount: true,
        validationSchema: generateEmailFormSchema(user.email)
    });

    const formikUpdatePassword = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        onSubmit: (values, { resetForm }) => updatePassword(values).then(() => resetForm()),
        validateOnMount: true,
        validationSchema: generatePasswordFormSchema()
    });

    /**
     * Handles submitting the form for updating the user's email.
     *
     * If the form is valid, calls the handleSubmit function from the formik
     * object. Otherwise, sets the error form from the formik object.
     *
     * @return {void} This function does not return anything.
     */
    const handleSubmitUpdateEmail = (): void => {
        if (formikUpdateEmail.isValid) formikUpdateEmail.handleSubmit();
        else setErrorForm(formikUpdateEmail.errors);
    }

    /**
     * Handles submitting the form for updating the user's password.
     *
     * If the form is valid, calls the handleSubmit function from the formik
     * object. Otherwise, sets the error form from the formik object.
     *
     * @return {void} This function does not return anything.
     */
    const handleSubmitUpdatePassword = (): void => {
        if (formikUpdatePassword.isValid) formikUpdatePassword.handleSubmit();
        else setErrorForm(formikUpdatePassword.errors);
    }

    return (
        <View>
            <View style={{ alignItems: 'center', justifyContent: 'flex-start' }}>

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
                    label={ translate('forms.labels.email') }
                    onChangeText={ formikUpdateEmail.handleChange('email') }
                    placeholder={ authPlaceholders.EMAIL }
                    style={{ marginBottom: margins.xl }}
                    value={ formikUpdateEmail.values.email }
                />

                {/* Submit button */}
                <Button
                    disabled={ isLoadingUpdateEmail }
                    icon={ (isLoadingUpdateEmail) && (
                        <ActivityIndicator
                            color={ colors.contentHeader }
                            size={ fontSizes.icon }
                        />
                    ) }
                    onPress={ handleSubmitUpdateEmail }
                    pressableStyle={{ marginBottom: margins.xl }}
                    text={ translate('forms.actions.auth.changeEmail') }
                />
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'flex-start' }}>

                {/* New password field */}
                <FormField
                    autoCapitalize="none"
                    editable={ !isLoadingUpdatePassword }
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
                    onChangeText={ formikUpdatePassword.handleChange('password') }
                    placeholder={ authPlaceholders.PASSWORD }
                    secureTextEntry={ !showPassword }
                    value={ formikUpdatePassword.values.password }
                />

                {/* Confirm password field */}
                <FormField
                    autoCapitalize="none"
                    editable={ !isLoadingUpdatePassword }
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
                    onChangeText={ formikUpdatePassword.handleChange('confirmPassword') }
                    placeholder={ authPlaceholders.CONFIRM_NEW_PASSWORD }
                    secureTextEntry={ !showConfirmPassword }
                    style={{ marginBottom: margins.xl }}
                    value={ formikUpdatePassword.values.confirmPassword }
                />

                {/* Submit button */}
                <Button
                    disabled={ isLoadingUpdatePassword }
                    icon={ (isLoadingUpdatePassword) && (
                        <ActivityIndicator
                            color={ colors.contentHeader }
                            size={ fontSizes.icon }
                        />
                    ) }
                    onPress={ handleSubmitUpdatePassword }
                    pressableStyle={{ marginBottom: margins.xl }}
                    text={ translate('forms.actions.auth.changePassword') }
                />
            </View>
        </View>
    );
}