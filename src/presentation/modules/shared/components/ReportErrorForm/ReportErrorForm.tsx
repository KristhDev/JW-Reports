import React, { useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Image } from 'react-native-image-crop-picker';
import { Formik } from 'formik';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { Button, FormField, FormImage, FormImageRef } from '@ui';

/* Hooks */
import { useEmail, useStatus } from '../../hooks';

/* Schemas */
import { reportErrorFormSchema } from './schemas';

/* Interfaces */
import { FormActions } from '../../interfaces';

/* Utils */
import { reportErrorDefaultImgs } from '../../utils';

/* Styles */
import { useTheme, themeStylesheet } from '@theme';

/**
 * This component is responsible for rendering the form to report an error.
 *
 * @return {JSX.Element} The rendered form component.
 */
export const ReportErrorForm = (): JSX.Element => {
    const formImageRef = useRef<FormImageRef>(null);
    const [ image, setImage ] = useState<Image | null>(null);

    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { sendReportErrorEmail } = useEmail();
    const { setErrorForm } = useStatus();
    const { state: { theme } } = useTheme();

    /**
     * Handles the send report error email functionality.
     *
     * @param {string} message - The message to send in the email.
     * @param {{ resetForm: () => void, setSubmitting: (isSubmitting: boolean) => void }} formActions - The actions to call when the email is sent.
     * @return {void} This function does not return any value.
     */
    const handleSendReportErrorEmail = (message: string, { resetForm, setSubmitting }: FormActions): void => {
        sendReportErrorEmail({ message, image }, {
            onFinish: () => setSubmitting && setSubmitting(false),
            onSuccess: (): void => {
                resetForm && resetForm();
                setImage(null);
                formImageRef.current?.clearImage();
            }
        });
    }

    return (
        <Formik
            initialValues={{ message: '' }}
            onSubmit={ ({ message }, { resetForm, setSubmitting }) => handleSendReportErrorEmail(message, { resetForm, setSubmitting }) }
            validateOnMount
            validationSchema={ reportErrorFormSchema }
        >
            { ({ errors, handleSubmit, isSubmitting, isValid }) => (
                <View style={{ ...themeStyles.formContainer, flex: 0 }}>
                    <FormField
                        editable={ !isSubmitting }
                        label="Describa el error:"
                        multiline
                        name="message"
                        numberOfLines={ 8 }
                    />

                    <FormImage
                        defaultImage={ reportErrorDefaultImgs[theme] }
                        disabled={ isSubmitting }
                        galleryButtonText="Añadir imagen"
                        label="Adjunte una imagen (opcional):"
                        onSelectImage={ setImage }
                        ref={ formImageRef }
                        showGalleryButton
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