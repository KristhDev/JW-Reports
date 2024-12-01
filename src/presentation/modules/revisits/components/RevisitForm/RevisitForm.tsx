import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useFormik } from 'formik';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Models */
import { ImageModel } from '@domain/models';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

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
export const RevisitForm: FC = (): JSX.Element => {
    const [ image, setImage ] = useState<ImageModel | null>(null);

    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { selectedRevisit, isRevisitLoading }, saveRevisit, updateRevisit } = useRevisits();
    const { setErrorForm } = useStatus();
    const { state: { activeFormField, recordedAudio, userInterface }, setActiveFormField } = useUI();

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

    const { errors, handleChange, handleSubmit, setFieldValue, isValid, values } = useFormik({
        initialValues: {
            personName: selectedRevisit.personName,
            about: selectedRevisit.about,
            address: selectedRevisit.address,
            nextVisit: new Date(selectedRevisit.nextVisit)
        },
        onSubmit: handleSaveOrUpdate,
        validateOnMount: true,
        validationSchema: revisitFormSchema
    });

    /**
     * Handles the press event of the save button by submitting the form
     * if it is valid or showing the errors if it is not.
     *
     * @return {void} This function does not return anything.
     */
    const handlePress = (): void => {
        if (isValid) handleSubmit();
        else setErrorForm(errors);
    }

    useEffect(() => {
        if (recordedAudio.trim().length === 0 || activeFormField.length === 0) return;
        setFieldValue(activeFormField, recordedAudio, true);
    }, [ recordedAudio ]);

    return (
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
                onBlur={ () => setActiveFormField('') }
                onChangeText={ handleChange('personName') }
                onFocus={ () => setActiveFormField('personName') }
                placeholder="Ingrese el nombre"
                value={ values.personName }
            />

            {/* About field */}
            <FormField
                controlStyle={{ paddingVertical: margins.xs + 2 }}
                editable={ !isRevisitLoading }
                inputStyle={{ minHeight: margins.sm * 9 }}
                label="Información de la persona:"
                multiline
                numberOfLines={ 9 }
                onBlur={ () => setActiveFormField('') }
                onChangeText={ handleChange('about') }
                onFocus={ () => setActiveFormField('about') }
                placeholder="Ingrese datos sobre la persona, tema de conversación, aspectos importantes, etc..."
                value={ values.about }
            />

            {/* Address field */}
            <FormField
                controlStyle={{ paddingVertical: margins.xs + 2 }}
                editable={ !isRevisitLoading }
                inputStyle={{ minHeight: margins.sm * 6 }}
                label="Dirección:"
                multiline
                numberOfLines={ 3 }
                onBlur={ () => setActiveFormField('') }
                onChangeText={ handleChange('address') }
                onFocus={ () => setActiveFormField('address') }
                placeholder="Ingrese la dirección"
                value={ values.address }
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
                    onChangeDate={ (date: string) => setFieldValue('nextVisit', Time.toDate(date)) }
                    placeholder="Seleccione el día"
                    style={{ marginBottom: margins.xl }}
                    value={ values.nextVisit.toString() }
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
                    onChangeDate={ (date: string) => setFieldValue('nextVisit', Time.toDate(date)) }
                    style={{ marginBottom: margins.xl }}
                    value={ values.nextVisit.toString() }
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
                onPress={ handlePress }
                text={ (selectedRevisit.id !== '') ? 'Actualizar' : 'Guardar' }
            />
        </View>
    );
}