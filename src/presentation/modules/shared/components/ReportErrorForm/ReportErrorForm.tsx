import React, { useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFormik } from 'formik';
import { useStyles } from 'react-native-unistyles';

/* Models */
import { ImageModel } from '@domain/models';

/* Components */
import { Button, FormField, FormImage, FormImageRef } from '@ui/components';

/* Hooks */
import { useEmail, useStatus } from '../../hooks';
import { useTheme } from '@theme/hooks';
import { useTranslation } from '@ui/hooks';

/* Schemas */
import { generateReportErrorFormSchema } from './schemas';

/* Interfaces */
import { FormActions } from '../../interfaces';

/* Utils */
import { reportErrorDefaultImgs } from '../../utils';

/* Styles */
import { themeStylesheet } from '@theme/styles';

/**
 * This component is responsible for rendering the form to report an error.
 *
 * @return {JSX.Element} The rendered form component.
 */
export const ReportErrorForm = (): JSX.Element => {
    const formImageRef = useRef<FormImageRef>(null);
    const [ image, setImage ] = useState<ImageModel | null>(null);

    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { sendReportErrorEmail } = useEmail();
    const { setErrorForm } = useStatus();
    const { state: { theme } } = useTheme();
    const { translate } = useTranslation();

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

    const { errors, handleChange, handleSubmit, isSubmitting, isValid, values } = useFormik({
        initialValues: { message: '' },
        onSubmit: ({ message }, { resetForm, setSubmitting }) => handleSendReportErrorEmail(message, { resetForm, setSubmitting }),
        validateOnMount: true,
        validationSchema: generateReportErrorFormSchema()
    });

    /**
     * Handles the press event by submitting the form if it is valid,
     * otherwise sets the form errors.
     *
     * @return {void} This function does not return anything.
     */
    const handlePress = (): void => {
        if (isValid) handleSubmit();
        else setErrorForm(errors);
    }

    return (
        <View style={{ ...themeStyles.formContainer, flex: 0 }}>
            <FormField
                controlStyle={{ paddingVertical: margins.xs + 2 }}
                editable={ !isSubmitting }
                inputStyle={{ minHeight: margins.sm * 8 }}
                label={ translate('forms.labels.shared.describeError') }
                multiline
                numberOfLines={ 8 }
                onChangeText={ handleChange('message') }
                value={ values.message }
            />

            <FormImage
                defaultImage={ reportErrorDefaultImgs[theme] }
                disabled={ isSubmitting }
                galleryButtonText={ translate('forms.actions.addImage') }
                label={ translate('forms.labels.shared.addImage') }
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
                onPress={ handlePress }
                text={ translate('forms.actions.send') }
            />
        </View>
    );
}