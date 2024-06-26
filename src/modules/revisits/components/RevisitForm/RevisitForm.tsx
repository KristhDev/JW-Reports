import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View, useWindowDimensions } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, DatetimeField, FormField } from '../../../ui';

/* Hooks */
import { useRevisits } from '../../hooks';
import { useImage, useStatus } from '../../../shared';

/* Schemas */
import { revisitFormSchema } from './schemas';

/* Interfaces */
import { RevisitFormValues } from '../../interfaces';

/* Theme */
import { styles as themeStylesheet } from '../../../theme';

const defaultRevisit = require('../../../../assets/revisit-default.jpg');

/**
 * This component is responsible for rendering the fields to create
 * or edit a revisit.
 *
 * @return {JSX.Element} Rendered component form to create or edit a revisit
 */
export const RevisitForm = (): JSX.Element => {
    const [ imageHeight, setImageHeight ] = useState<number>(0);
    const [ imageUri, setImageUri ] = useState<string>('https://local-image.com/images.jpg');
    const { width: windowWidth } = useWindowDimensions();

    const { image, takeImageToGallery, takePhoto } = useImage();
    const { state: { selectedRevisit, isRevisitLoading }, saveRevisit, updateRevisit } = useRevisits();
    const { setErrorForm } = useStatus();
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    /**
     * If the selectedRevisit.id is an empty string, then saveRevisit is called with the revisitValues
     * and image. If the selectedRevisit.id is not an empty string, then updateRevisit is called with
     * the revisitValues and image.
     *
     * @param {RevisitFormValues} revisitValues - RevisitFormValues
     * @return {void} This function returns nothing.
     */
    const handleSaveOrUpdate = (revisitValues: RevisitFormValues): void => {
        (selectedRevisit.id === '')
            ? saveRevisit({ revisitValues, image: isChangeImage() ? image : undefined })
            : updateRevisit(revisitValues, isChangeImage() ? image : undefined);
    }

    /**
     * If selectedRevisit.photo is not null, return true if selectedRevisit.photo is not equal to
     * imageUri, otherwise return true if the uri of the defaultRevisit image is not equal to imageUri.
     *
     * @return {boolean} true if the uri of the defaultRevisit image is not equal to imageUri
     */
    const isChangeImage = (): boolean => {
        if (selectedRevisit?.photo) return selectedRevisit.photo !== imageUri;

        const { uri } = Image.resolveAssetSource(defaultRevisit);
        return uri !== imageUri;
    }

    /**
     * Effect to set imageHeight and imageUri when the component is
     * mounted taking the default image or the revisit photo
     */
    useEffect(() => {
        if (!selectedRevisit?.photo) {
            const { height, width, uri } = Image.resolveAssetSource(defaultRevisit);
            const h = windowWidth / width * height;
            setImageHeight(h);
            setImageUri(uri);
        }
        else {
            Image.getSize(selectedRevisit.photo, (width, height) => {
                const h = windowWidth / width * height;
                setImageHeight(h);
                setImageUri(selectedRevisit.photo!);
            });
        }
    }, []);

    /**
     * Effect to set imageHeight and imageUri every time
     * image changes value
     */
    useEffect(() => {
        if (image?.path) {
            const h = windowWidth / (image?.width || windowWidth) * (image?.height || 200);
            setImageHeight(h);
            setImageUri(image.path);
        }
    }, [ image ]);

    return (
        <Formik
            initialValues={{
                personName: selectedRevisit.personName,
                about: selectedRevisit.about,
                address: selectedRevisit.address,
                nextVisit: new Date(selectedRevisit.nextVisit)
            }}
            onSubmit={ handleSaveOrUpdate }
            validateOnMount
            validationSchema={ revisitFormSchema }
        >
            { ({ handleSubmit, errors, isValid }) => (
                <View style={{ ...themeStyles.formContainer, paddingBottom: margins.xl }}>

                    {/* Person name field */}
                    <FormField
                        icon={
                            <Icon
                                color={ colors.icon }
                                name="person-outline"
                                size={ fontSizes.icon }
                            />
                        }
                        label="Nombre de la persona:"
                        name="personName"
                        placeholder="Ingrese el nombre"
                    />

                    {/* About field */}
                    <FormField
                        label="Información de la persona:"
                        multiline
                        name="about"
                        numberOfLines={ 10 }
                        placeholder="Ingrese datos sobre la persona, tema de conversación, aspectos importantes, etc..."
                    />

                    {/* Address field */}
                    <FormField
                        label="Dirección:"
                        multiline
                        name="address"
                        numberOfLines={ 4 }
                        placeholder="Ingrese la dirección"
                    />

                    {/* Photo field */}
                    <View style={ themeStyles.formField }>
                        <Text style={ themeStyles.formLabel }>
                            Foto
                        </Text>

                        {/* Default image or revisit photo */}
                        <Image
                            source={{ uri: imageUri }}
                            style={{ borderRadius: 5, height: imageHeight, width: '100%' }}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: margins.sm }}>

                            {/* Gallery button */}
                            <Button
                                containerStyle={{ minWidth: 0 }}
                                icon={
                                    <Icon
                                        color={ colors.contentHeader }
                                        name="image-outline"
                                        size={ fontSizes.icon }
                                    />
                                }
                                onPress={ takeImageToGallery }
                                text="Galería"
                            />

                            {/* Camera button */}
                            <Button
                                containerStyle={{ minWidth: 0 }}
                                icon={
                                    <Icon
                                        color={ colors.contentHeader }
                                        name="camera-outline"
                                        size={ fontSizes.icon }
                                    />
                                }
                                onPress={ takePhoto }
                                text="Cámara"
                            />
                        </View>
                    </View>

                    {/* Next visit field */}
                    <DatetimeField
                        icon={
                            <Icon
                                color={ colors.contentHeader }
                                name="calendar-outline"
                                size={ fontSizes.icon }
                            />
                        }
                        inputDateFormat="DD/MM/YYYY"
                        label="Próxima visita:"
                        modalTitle="Próxima visita"
                        mode="date"
                        name="nextVisit"
                        placeholder="Seleccione el día"
                        style={{ marginBottom: margins.xl }}
                    />

                    {/* Submit button */}
                    <Button
                        disabled={ isRevisitLoading }
                        icon={ (isRevisitLoading) && (
                            <ActivityIndicator
                                color={ colors.contentHeader }
                                size={ fontSizes.icon }
                            />
                        ) }
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                        text={ (selectedRevisit.id !== '') ? 'Actualizar' : 'Guardar' }
                    />
                </View>
            ) }
        </Formik>
    );
}