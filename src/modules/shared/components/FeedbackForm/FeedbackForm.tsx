import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Formik } from 'formik';
import { useStyles } from 'react-native-unistyles';

import { Button, FormField } from '@ui';

import { useStatus } from '../../hooks';

import { feedbackFormSchema } from './schemas';

import { themeStylesheet } from '@theme';

export const FeedbackForm = (): JSX.Element => {
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { setErrorForm } = useStatus();

    return (
        <Formik
            initialValues={{ message: '' }}
            onSubmit={ () => {} }
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