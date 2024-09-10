import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Image } from 'react-native-image-crop-picker';
import { Formik } from 'formik';
import { useStyles } from 'react-native-unistyles';

import { Button, FormField, FormImage } from '@ui';

import { useStatus } from '../../hooks';

import { reportErrorFormSchema } from './schemas';

import { useTheme, themeStylesheet } from '@theme';

import { reportErrorDefaultImgs } from '../../utils';

export const ReportErrorForm = (): JSX.Element => {
    const [ image, setImage ] = useState<Image | null>(null);

    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { setErrorForm } = useStatus();
    const { state: { theme } } = useTheme();

    return (
        <Formik
            initialValues={{ message: '' }}
            onSubmit={ () => {} }
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