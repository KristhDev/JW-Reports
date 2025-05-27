import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';
import { useFormik } from 'formik';
import Ionicons from '@expo/vector-icons/Ionicons';

/* DI */
import { timeAdapter, placeholdersService, messagesService } from '@config/di';

/* Models */
import { ImageModel } from '@domain/models';

/* Components */
import { MicrophoneBtn } from '@shared/components';
import { Button, DatetimeField, FormCalendar, FormField, FormImage } from '@ui/components';

/* Hooks */
import { useRevisits } from '../../hooks';
import { useVoiceRecorder } from '@shared/hooks';
import { useToaster, useTranslation, useUI } from '@ui/hooks';

/* Schemas */
import { generateRevisitFormSchema } from './schemas';

/* Interfaces */
import { RevisitFormValues } from '../../interfaces';

/* Theme */
import { themeStylesheet } from '@theme/styles';

const defaultRevisit = require('@assets/revisit-default.jpg');

/**
 * This component is responsible for rendering the fields to create
 * or edit a revisit.
 *
 * @return {JSX.Element} Rendered component form to create or edit a revisit
 */
export const RevisitForm: FC = (): JSX.Element => {
    const revisitsMessages = messagesService.revisitsMessages;
    const revisitsPlaceholders = placeholdersService.revisitsPlaceholders;

    const [ image, setImage ] = useState<ImageModel | null>(null);

    const router = useRouter();
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { selectedRevisit, isRevisitLoading }, saveRevisit, updateRevisit } = useRevisits();
    const { translate } = useTranslation();
    const { showFormError } = useToaster();
    const { isRecording, record, hasRecord, recordFormField } = useVoiceRecorder();
    const { state: { activeFormField, userInterface }, hasActiveFormField } = useUI();

    const btnText = selectedRevisit.id === '' ? translate('forms.actions.save') : translate('forms.actions.update');

    /**
     * Handles the save or update of a revisit based on the selected revisit ID.
     *
     * @param {RevisitFormValues} revisitValues - The values of the revisit to save or update.
     * @return {void} This function does not return anything.
     */
    const handleSaveOrUpdate = (revisitValues: RevisitFormValues): void => {
        const values = { ...revisitValues, image }

        if (selectedRevisit.id === '') {
            saveRevisit({
                revisitValues: values,
                successMessage: revisitsMessages.ADDED_SUCCESS,
                onSuccess: router.back
            });
        }
        else updateRevisit({ revisitValues: values, onSuccess: router.back });
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
        validationSchema: generateRevisitFormSchema()
    });

    /**
     * Handles the press event of the save button by submitting the form
     * if it is valid or showing the errors if it is not.
     *
     * @return {void} This function does not return anything.
     */
    const handlePress = (): void => {
        if (isValid) handleSubmit();
        else showFormError(errors);
    }

    useEffect(() => {
        if (!hasRecord || !hasActiveFormField) return;
        setFieldValue(activeFormField, record, true);
    }, [ activeFormField, hasActiveFormField, hasRecord, record, setFieldValue ]);

    return (
        <View style={{ ...themeStyles.formContainer, paddingBottom: margins.xl }}>

            {/* Person name field */}
            <FormField
                editable={ !isRevisitLoading }
                label={ translate('forms.labels.personName') }
                leftIcon={
                    <Ionicons
                        color={ colors.icon }
                        name="person-outline"
                        size={ fontSizes.icon }
                    />
                }
                onChangeText={ handleChange('personName') }
                placeholder={ revisitsPlaceholders.PERSON_NAME }
                rightIcon={
                    <MicrophoneBtn 
                        disabled={ isRevisitLoading || isRecording }
                        isRecording={ isRecording && activeFormField === 'personName' }
                        onPress={ () => recordFormField('personName') }
                    />
                }
                value={ values.personName }
            />

            {/* About field */}
            <FormField
                controlStyle={{ paddingVertical: margins.xs + 2, alignItems: 'flex-end' }}
                editable={ !isRevisitLoading }
                inputStyle={{ minHeight: margins.sm * 9 }}
                label={ translate('forms.labels.personAbout') }
                multiline
                numberOfLines={ 7 }
                onChangeText={ handleChange('about') }
                placeholder={ revisitsPlaceholders.ABOUT }
                rightIcon={
                    <MicrophoneBtn 
                        disabled={ isRevisitLoading || isRecording }
                        isRecording={ isRecording && activeFormField === 'about' }
                        onPress={ () => recordFormField('about') }
                    />
                }
                value={ values.about }
            />

            {/* Address field */}
            <FormField
                controlStyle={{ paddingVertical: margins.xs + 2, alignItems: 'flex-end' }}
                editable={ !isRevisitLoading }
                inputStyle={{ minHeight: margins.sm * 6 }}
                label={ translate('forms.labels.address') }
                multiline
                numberOfLines={ 3 }
                onChangeText={ handleChange('address') }
                placeholder={ revisitsPlaceholders.ADDRESS }
                rightIcon={
                    <MicrophoneBtn 
                        disabled={ isRevisitLoading || isRecording }
                        isRecording={ isRecording && activeFormField === 'address' }
                        onPress={ () => recordFormField('address') }
                    />
                }
                value={ values.address }
            />

            {/* Photo field */}
            <FormImage
                defaultImage={ defaultRevisit }
                disabled={ isRevisitLoading }
                imageUrl={ selectedRevisit.photo }
                label={ translate('forms.labels.photo') }
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
                    label={ translate('forms.labels.nextVisit') }
                    mode="date"
                    onChangeDate={ (date: string) => setFieldValue('nextVisit', timeAdapter.toDate(date)) }
                    placeholder={ revisitsPlaceholders.NEXT_VISIT }
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
                    label={ translate('forms.labels.nextVisit') }
                    onChangeDate={ (date: string) => setFieldValue('nextVisit', timeAdapter.toDate(date)) }
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
                text={ btnText }
            />
        </View>
    );
}