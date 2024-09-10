import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Formik } from 'formik';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { Button, FormField } from '@ui';

/* Hooks */
import { useEmail, useStatus } from '../../hooks';

/* Schemas */
import { feedbackFormSchema } from './schemas';

/* Styles */
import { themeStylesheet } from '@theme';

/**
 * This component is responsible for rendering the fields to send a feedback
 * and also handles the logic to send the email.
 *
 * @returns {JSX.Element} The rendered form component.
 */
export const FeedbackForm = (): JSX.Element => {
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { sendFeedbackEmail } = useEmail();
    const { setErrorForm } = useStatus();

    return (
        <Formik
            initialValues={{ message: '' }}
            onSubmit={ (values, { resetForm }) => sendFeedbackEmail(values.message, resetForm) }
            validateOnMount
            validationSchema={ feedbackFormSchema }
        >
            { ({ errors, handleSubmit, isSubmitting, isValid }) => (
                <View style={{ ...themeStyles.formContainer, flex: 0 }}>
                    <FormField
                        editable={ !isSubmitting }
                        label="Escriba su mensaje:"
                        multiline
                        name="message"
                        numberOfLines={ 10 }
                        style={{ marginBottom: margins.xl }}
                    />

                    <Button
                        disabled={ isSubmitting }
                        icon={ (isSubmitting) && (
                            <ActivityIndicator
                                color={ colors.contentHeader }
                                size={ fontSizes.icon }
                            />
                        ) }
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                        text="Enviar"
                    />
                </View>
            ) }
        </Formik>
    );
}