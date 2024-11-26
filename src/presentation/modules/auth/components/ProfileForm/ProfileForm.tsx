import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFormik } from 'formik';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

/* Constants */
import { HOURS_REQUIREMENTS, PRECURSORS_OPTIONS } from '@application/constants';

/* Components */
import { Button, Checkbox, FormField, FormSelect } from '@ui';

/* Hooks */
import { useStatus } from '@shared';
import { useAuth } from '../../hooks';

/* Schemas */
import { profileFormSchema } from './schemas';

/* Theme */
import { themeStylesheet } from '@theme';

/**
 * This component is responsible for rendering the fields so that an
 * authenticated user can update their profile data.
 *
 * @return {JSX.Element} The rendered form component.
 */
export const ProfileForm = (): JSX.Element => {
    const { top } = useSafeAreaInsets();
    const { styles: themeStyles, theme: { colors, fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { user, isAuthLoading }, updateProfile } = useAuth();
    const { setErrorForm } = useStatus();

    const [ editHoursRequirement, setEditHoursRequirement ] = useState<boolean>(
        !Object.values(HOURS_REQUIREMENTS).includes(user?.hoursRequirement || 0)
    );

    const { errors, handleChange, handleSubmit, isValid, setFieldValue, values } = useFormik({
        initialValues: {
            name: user.name,
            surname: user.surname,
            precursor: user.precursor,
            hoursRequirement: user?.hoursRequirement || 0,
            hoursLDC: user?.hoursLDC || false
        },
        onSubmit: updateProfile,
        validateOnMount: true,
        validationSchema: profileFormSchema
    });

    /**
     * Handles selecting a value from the hours requirement dropdown, setting the hoursRequirement
     * form value to the value of the selected option, and setting the editHoursRequirement state
     * to false.
     *
     * @param {string} value - the value of the selected option
     * @return {void} This function does not return anything.
     */
    const handleSelect = (value: string): void => {
        setFieldValue('hoursRequirement', HOURS_REQUIREMENTS[value as keyof typeof HOURS_REQUIREMENTS] || 0);
        setEditHoursRequirement(false);
    }

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

    return (
        <View style={{ ...themeStyles.formContainer, justifyContent: 'flex-start' }}>

            {/* Name field */}
            <FormField
                autoCapitalize="none"
                leftIcon={
                    <Ionicons
                        color={ colors.icon }
                        name="person-outline"
                        size={ fontSizes.icon }
                    />
                }
                label="Nombre:"
                onChangeText={ handleChange('name') }
                placeholder="Ingrese su nombre"
                value={ values.name }
            />

            {/* Surname field */}
            <FormField
                autoCapitalize="none"
                leftIcon={
                    <Ionicons
                        color={ colors.icon }
                        name="people-outline"
                        size={ fontSizes.icon }
                    />
                }
                label="Apellidos:"
                onChangeText={ handleChange('surname') }
                placeholder="Ingrese su apellido"
                value={ values.surname }
            />

            {/* Precursor field */}
            <FormSelect
                icon={
                    <Ionicons
                        color={ colors.icon }
                        name="briefcase-outline"
                        size={ fontSizes.icon }
                    />
                }
                items={ PRECURSORS_OPTIONS }
                label="Precursor:"
                onChange={ handleSelect }
                placeholder="Seleccione una opción"
                style={{ marginBottom: 0 }}
                title="Seleccione su precursorado"
                value={ values.precursor }
            />

            { (values.precursor !== 'ninguno') && (
                <>
                    {/* Hours requirement field */}
                    <FormField
                        autoCapitalize="none"
                        editable={ editHoursRequirement }
                        leftIcon={
                            <Ionicons
                                color={ colors.icon }
                                name="time-outline"
                                size={ fontSizes.icon }
                            />
                        }
                        label="Requerimiento de horas:"
                        placeholder="Ingrese su requerimiento de horas"
                        style={{ marginBottom: 0, marginTop: margins.sm }}
                        onChangeText={ handleChange('hoursRequirement') }
                        value={ values.hoursRequirement.toString() }
                    />

                    {/* Checkbox to edit hours requirement */}
                    <Checkbox
                        onPress={ () => setEditHoursRequirement(!editHoursRequirement) }
                        status={ editHoursRequirement ? 'checked' : 'unchecked' }
                        label="Editar requerimiento de horas"
                        style={{ marginBottom: 0, marginTop: margins.md }}
                    />
                </>
            ) }

            <Checkbox
                onPress={ () => setFieldValue('hoursLDC', !values.hoursLDC) }
                status={ values.hoursLDC ? 'checked' : 'unchecked' }
                label="Estoy participando en LDC"
                style={{ marginBottom: 0, marginTop: margins.md }}
            />

            {/* Submit button */}
            <Button
                disabled={ isAuthLoading }
                icon={ (isAuthLoading) && (
                    <ActivityIndicator
                        color={ colors.contentHeader }
                        size={ fontSizes.icon }
                    />
                ) }
                onPress={ handlePress }
                pressableStyle={{ marginBottom: top, marginTop: margins.xl }}
                text="Guardar"
            />
        </View>
    );
}
