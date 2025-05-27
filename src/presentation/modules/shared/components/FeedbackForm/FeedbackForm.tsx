import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFormik } from 'formik';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { Button, FormField } from '@ui/components';

/* Hooks */
import { useEmail } from '../../hooks';
import { useToaster, useTranslation } from '@ui/hooks';

/* Interfaces */
import { FormActions } from '../../interfaces';

/* Schemas */
import { generateFeedbackFormSchema } from './schemas';

/* Styles */
import { themeStylesheet } from '@theme/styles';

/**
 * This component is responsible for rendering the fields to send a feedback
 * and also handles the logic to send the email.
 *
 * @returns {JSX.Element} The rendered form component.
 */
export const FeedbackForm = (): JSX.Element => {
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { sendFeedbackEmail } = useEmail();
    const { showFormError } = useToaster();
    const { translate } = useTranslation();

    /**
     * Handles the send feedback email functionality.
     *
     * @param {string} message - The message to send in the email.
     * @param {{ resetForm: () => void, setSubmitting: (isSubmitting: boolean) => void }} formActions - The actions to call when the email is sent.
     * @return {void} This function does not return any value.
     */
    const handleSendMessage = (message: string, { resetForm, setSubmitting }: FormActions): void => {
        sendFeedbackEmail(message, {
            onFinish: resetForm,
            onSuccess: () => setSubmitting && setSubmitting(false)
        });
    }

    const { errors, handleChange, handleSubmit, isSubmitting, isValid, values } = useFormik({
        initialValues: { message: '' },
        onSubmit: ({ message }, { resetForm, setSubmitting }) => handleSendMessage(message, { resetForm, setSubmitting }),
        validateOnMount: true,
        validationSchema: generateFeedbackFormSchema()
    });

    /**
     * Handles the press event of the send button by submitting the form
     * if it is valid or showing the errors if it is not.
     *
     * @return {void} This function does not return anything.
     */
    const handlePress = (): void => {
        if (isValid) handleSubmit();
        else showFormError(errors, { toastStyle: { bottom: margins.xs } });
    }

    return (
        <View style={{ ...themeStyles.formContainer, flex: 0 }}>
            <FormField
                controlStyle={{ paddingVertical: margins.xs + 2 }}
                editable={ !isSubmitting }
                inputStyle={{ minHeight: margins.sm * 10 }}
                label={ translate('forms.labels.shared.typeMessage') }
                multiline
                numberOfLines={ 10 }
                onChangeText={ handleChange('message') }
                style={{ marginBottom: margins.xl }}
                value={ values.message }
            />

            <Button
                disabled={ isSubmitting }
                icon={ (isSubmitting) && (
                    <ActivityIndicator
                        color={ colors.contentHeader }
                        size={ fontSizes.icon }
                    />
                ) }
                onPress={ handlePress }
                text={ translate('forms.actions.send') }
            />
        </View>
    );
}