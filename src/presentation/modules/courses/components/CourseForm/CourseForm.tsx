import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFormik } from 'formik';
import { useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';
import Ionicons from '@expo/vector-icons/Ionicons';

/* Config */
import { placeholdersService } from '@config/di';

/* Components */
import { MicrophoneBtn } from '@shared/components';
import { Button, FormField } from '@ui/components';

/* Hooks */
import { useCourses } from '../../hooks';
import { useVoiceRecorder } from '@shared/hooks';
import { useToaster, useTranslation, useUI } from '@ui/hooks';

/* Schemas */
import { generateCourseFormSchema } from './schemas';

/* Interfaces */
import { CourseFormValues } from '../../interfaces';

/* Theme */
import { themeStylesheet } from '@theme/styles';

/**
 * This component is responsible for rendering the fields to create
 * or edit a course.
 *
 * @return {JSX.Element} The course form component.
 */
export const CourseForm = (): JSX.Element => {
    const coursesPlaceholders = placeholdersService.coursesPlaceholders;

    const router = useRouter();
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { isCourseLoading, selectedCourse }, saveCourse, updateCourse } = useCourses();
    const { hasRecord, isRecording, record, recordFormField } = useVoiceRecorder();
    const { showFormError } = useToaster();
    const { translate } = useTranslation();
    const { state: { activeFormField }, hasActiveFormField } = useUI();

    const buttonText = (selectedCourse.id === '') 
        ? translate('forms.actions.save')
        : translate('forms.actions.update');

    /**
     * If the selectedCourse.id is an empty string, then save the formValues, otherwise update the
     * formValues.
     *
     * @param {CourseFormValues} formValues - CourseFormValues
     * @return {void} This function does not return any value.
     */
    const handleSaveOrUpdate = (formValues: CourseFormValues): void => {
        if (selectedCourse.id === '') saveCourse(formValues, { onSuccess: router.back });
        else updateCourse(formValues, { onSuccess: router.back });
    }

    const { errors, handleChange, handleSubmit, isValid, setFieldValue, values } = useFormik({
        initialValues: {
            personName: selectedCourse.personName,
            personAbout: selectedCourse.personAbout,
            personAddress: selectedCourse.personAddress,
            publication: selectedCourse.publication
        },
        onSubmit: handleSaveOrUpdate,
        validateOnMount: true,
        validationSchema: generateCourseFormSchema()
    });

    /**
     * Handles the press event by submitting the form if it is valid,
     * otherwise sets the form errors.
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
                label={ translate('forms.labels.student') }
                leftIcon={
                    <Ionicons
                        color={ colors.icon }
                        name="person-outline"
                        size={ fontSizes.icon }
                    />
                }
                onChangeText={ handleChange('personName') }
                placeholder={ coursesPlaceholders.PERSON_NAME }
                rightIcon={
                    <MicrophoneBtn 
                        disabled={ isCourseLoading || isRecording }
                        isRecording={ isRecording && activeFormField === 'personName' }
                        onPress={ () => recordFormField('personName') }
                    />
                }
                value={ values.personName }
            />

            {/* Person about field */}
            <FormField
                controlStyle={{ alignItems: 'flex-end', paddingVertical: margins.xs + 2 }}
                inputStyle={{ minHeight: margins.sm * 10  }}
                label={ translate('forms.labels.studentInfo') }
                multiline
                numberOfLines={ 10 }
                onChangeText={ handleChange('personAbout') }
                placeholder={ coursesPlaceholders.PERSON_ABOUT }
                rightIcon={
                    <MicrophoneBtn 
                        disabled={ isCourseLoading || isRecording }
                        isRecording={ isRecording && activeFormField === 'personAbout' }
                        onPress={ () => recordFormField('personAbout') }
                    />
                }
                value={ values.personAbout }
            />

            {/* Person address field */}
            <FormField
                controlStyle={{ alignItems: 'flex-end', paddingVertical: margins.xs + 2 }}
                inputStyle={{ minHeight: margins.sm * 5  }}
                label={ translate('forms.labels.address') }
                multiline
                numberOfLines={ 4 }
                onChangeText={ handleChange('personAddress') }
                placeholder={ coursesPlaceholders.PERSON_ADDRESS }
                rightIcon={
                    <MicrophoneBtn 
                        disabled={ isCourseLoading || isRecording }
                        isRecording={ isRecording && activeFormField === 'personAddress' }
                        onPress={ () => recordFormField('personAddress') }
                    />
                }
                value={ values.personAddress }
            />

            {/* Publication field */}
            <FormField
                leftIcon={
                    <Ionicons
                        color={ colors.icon }
                        name="book-outline"
                        size={ fontSizes.icon }
                    />
                }
                label={ translate('forms.labels.studyPublication') }
                onChangeText={ handleChange('publication') }
                placeholder={ coursesPlaceholders.PUBLICATION }
                style={{ marginBottom: margins.xl }}
                rightIcon={
                    <MicrophoneBtn 
                        disabled={ isCourseLoading || isRecording }
                        isRecording={ isRecording && activeFormField === 'publication' }
                        onPress={ () => recordFormField('publication') }
                    />
                }
                value={ values.publication }
            />

            {/* Submit button */}
            <Button
                disabled={ isCourseLoading }
                icon={ (isCourseLoading) && (
                    <ActivityIndicator
                        color={ colors.contentHeader }
                        size={ fontSizes.icon }
                    />
                ) }
                onPress={ handlePress }
                text={ buttonText }
            />
        </View>
    );
}