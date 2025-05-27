import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useFormik } from 'formik';
import { useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Config */
import { timeAdapter, placeholdersService } from '@config/di';

/* Components */
import { Button, DatetimeField, FormCalendar, FormTime } from '@ui/components';

/* Hooks */
import { usePreaching } from '../../hooks';
import { useAsyncAction, useToaster, useTranslation, useUI } from '@ui/hooks';

/* Schemas */
import { generatePreachingFormSchema } from './schemas';

/* Interfaces */
import { PreachingFormValues } from '../../interfaces';

/* Theme */
import { themeStylesheet } from '@theme/styles';

/**
 * This component is responsible for rendering the fields to create
 * or edit a preaching.
 *
 * @returns {JSX.Element} The preaching form component.
 */
export const PreachingForm = (): JSX.Element => {
    const preachingPlaceholders = placeholdersService.preachingPlaceholders;

    const router = useRouter();
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { seletedPreaching }, savePreaching, updatePreaching } = usePreaching();
    const { showFormError } = useToaster();
    const { translate } = useTranslation();
    const { state: { userInterface } } = useUI();

    /**
     * If the selected preaching has an id, then update the preaching, otherwise save the preaching.
     *
     * @param {PreachingFormValues} formValues - PreachingFormValues
     * @return {void} This function does not return anything.
     */
    const handleSaveOrUpdate = async (formValues: PreachingFormValues): Promise<void> => {
        const action = (seletedPreaching.id === '') 
            ? savePreaching(formValues, { onSuccess: router.back }) 
            : updatePreaching(formValues, { onSuccess: router.back });

        await Promise.resolve(action)
    }

    const { isLoading: isPreachingLoading, excuteAsyncAction } = useAsyncAction(handleSaveOrUpdate);

    const buttonText = (seletedPreaching.id !== '') 
        ? translate('forms.actions.update') 
        : translate('forms.actions.save');

    const { errors, handleSubmit, isValid, setFieldValue, values } = useFormik({
        initialValues: {
            day: new Date(seletedPreaching.day),
            initHour: new Date(seletedPreaching.initHour),
            finalHour: new Date(seletedPreaching.finalHour)
        },
        onSubmit: excuteAsyncAction,
        validateOnMount: true,
        validationSchema: generatePreachingFormSchema()
    });

    /**
     * Handles the press event of the save button by submitting the form
     * if it is valid or showing the errors if it is not.
     *
     * @return {void} This function does not return anything.
     */
    const handlePress = (): void => {
        if (isValid) handleSubmit();
        else showFormError(errors, { toastStyle: { bottom: (margins.lg * 2) + margins.xs } });
    }

    return (
        <View style={{ ...themeStyles.formContainer, justifyContent: 'flex-start', paddingBottom: margins.xl }}>

            {/* Day field */}
            { userInterface.oldDatetimePicker ? (
                <DatetimeField
                    disabled={ isPreachingLoading }
                    icon={
                        <Ionicons
                            color={ colors.contentHeader }
                            name="calendar-outline"
                            size={ fontSizes.icon }
                        />
                    }
                    inputDateFormat="DD"
                    label={ translate('forms.labels.preaching.preachingDay') }
                    mode="date"
                    onChangeDate={ (date) => setFieldValue('day', timeAdapter.toDate(date)) }
                    placeholder={ preachingPlaceholders.DAY }
                    value={ values.day.toString() }
                />
            ) : (
                <FormCalendar
                    editable={ !isPreachingLoading }
                    icon={
                        <Ionicons
                            color={ colors.contentHeader }
                            name="calendar-outline"
                            size={ fontSizes.icon }
                        />
                    }
                    inputDateFormat="DD"
                    label={ translate('forms.labels.preaching.preachingDay') }
                    onChangeDate={ (date) => setFieldValue('day', timeAdapter.toDate(date)) }
                    value={ values.day.toString() }
                />
            ) }

            {/* Init hour field */}
            { (userInterface.oldDatetimePicker) ? (
                <DatetimeField
                    disabled={ isPreachingLoading }
                    icon={
                        <Ionicons
                            color={ colors.contentHeader }
                            name="time-outline"
                            size={ fontSizes.icon }
                        />
                    }
                    inputDateFormat="HH:mm"
                    label={ translate('forms.labels.preaching.initHour') }
                    mode="time"
                    onChangeDate={ (date) => setFieldValue('initHour', timeAdapter.toDate(date)) }
                    placeholder={ preachingPlaceholders.HOUR }
                    value={ values.initHour.toString() }
                />
            ) : (
                <FormTime
                    editable={ !isPreachingLoading }
                    icon={
                        <Ionicons
                            color={ colors.contentHeader }
                            name="time-outline"
                            size={ fontSizes.icon }
                        />
                    }
                    inputDateFormat="HH:mm"
                    label={ translate('forms.labels.preaching.initHour') }
                    onChangeTime={ (date) => setFieldValue('initHour', timeAdapter.toDate(date)) }
                    value={ values.initHour.toString() }
                />
            ) }

            {/* Final hour field */}
            { userInterface.oldDatetimePicker ? (
                <DatetimeField
                    disabled={ isPreachingLoading }
                    icon={
                        <Ionicons
                            color={ colors.contentHeader }
                            name="time-outline"
                            size={ fontSizes.icon }
                        />
                    }
                    inputDateFormat="HH:mm"
                    label={ translate('forms.labels.preaching.finalHour') }
                    mode="time"
                    onChangeDate={ (date) => setFieldValue('finalHour', timeAdapter.toDate(date)) }
                    placeholder={ preachingPlaceholders.HOUR }
                    style={{ marginBottom: margins.xl }}
                    value={ values.finalHour.toString() }
                />
            ) : (
                <FormTime
                    editable={ !isPreachingLoading }
                    icon={
                        <Ionicons
                            color={ colors.contentHeader }
                            name="time-outline"
                            size={ fontSizes.icon }
                        />
                    }
                    inputDateFormat="HH:mm"
                    label={ translate('forms.labels.preaching.finalHour') }
                    onChangeTime={ (date) => setFieldValue('finalHour', timeAdapter.toDate(date)) }
                    style={{ marginBottom: margins.xl }}
                    value={ values.finalHour.toString() }
                />
            ) }

            {/* Submit button */}
            <Button
                disabled={ isPreachingLoading }
                icon={ (isPreachingLoading) && (
                    <ActivityIndicator
                        color={ colors.contentHeader }
                        size={ fontSizes.icon }
                    />
                ) }
                onPress={ handlePress }
                text={ buttonText  }
            />
        </View>
    );
}
