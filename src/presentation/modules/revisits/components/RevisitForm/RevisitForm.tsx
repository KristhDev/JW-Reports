import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Image } from 'react-native-image-crop-picker';
import { useStyles } from 'react-native-unistyles';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Modules */
import { useRevisits } from '../../hooks';
import { useStatus } from '@shared';
import { Button, DatetimeField, FormCalendar, FormField, FormImage, useUI } from '@ui';

/* Schemas */
import { revisitFormSchema } from './schemas';

/* Interfaces */
import { RevisitFormValues } from '../../interfaces';

/* Theme */
import { themeStylesheet } from '@theme';

const defaultRevisit = require('@assets/revisit-default.jpg');

/**
 * This component is responsible for rendering the fields to create
 * or edit a revisit.
 *
 * @return {JSX.Element} Rendered component form to create or edit a revisit
 */
export const RevisitForm = (): JSX.Element => {
    const [ image, setImage ] = useState<Image | null>(null);

    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { selectedRevisit, isRevisitLoading }, saveRevisit, updateRevisit } = useRevisits();
    const { setErrorForm } = useStatus();
    const { state: { userInterface } } = useUI();

    /**
     * Handles the save or update of a revisit based on the selected revisit ID.
     *
     * @param {RevisitFormValues} revisitValues - The values of the revisit to save or update.
     * @return {void} This function does not return anything.
     */
    const handleSaveOrUpdate = (revisitValues: RevisitFormValues): void => {
        (selectedRevisit.id === '')
            ? saveRevisit({ revisitValues, image })
            : updateRevisit(revisitValues, image);
    }

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
                        editable={ !isRevisitLoading }
                        leftIcon={
                            <Ionicons
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
                        editable={ !isRevisitLoading }
                        label="Información de la persona:"
                        multiline
                        name="about"
                        numberOfLines={ 10 }
                        placeholder="Ingrese datos sobre la persona, tema de conversación, aspectos importantes, etc..."
                    />

                    {/* Address field */}
                    <FormField
                        editable={ !isRevisitLoading }
                        label="Dirección:"
                        multiline
                        name="address"
                        numberOfLines={ 4 }
                        placeholder="Ingrese la dirección"
                    />

                    {/* Photo field */}
                    <FormImage
                        defaultImage={ defaultRevisit }
                        disabled={ isRevisitLoading }
                        imageUrl={ selectedRevisit.photo }
                        label="Foto:"
                        onSelectImage={ setImage }
                        showCameraButton
                        showGalleryButton
                    />

                    {/* Next visit field */}
                    { (userInterface.oldDatetimePicker) ? (
                        <DatetimeField
                            disabled={ isRevisitLoading }
                            icon={
                                <Ionicons
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
                    ) : (
                        <FormCalendar
                            editable={ !isRevisitLoading }
                            icon={
                                <Ionicons
                                    color={ colors.contentHeader }
                                    name="calendar-outline"
                                    size={ fontSizes.icon }
                                />
                            }
                            inputDateFormat="DD/MM/YYYY"
                            label="Próxima visita:"
                            name="nextVisit"
                            style={{ marginBottom: margins.xl }}
                        />
                    ) }

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