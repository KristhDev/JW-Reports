import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import { useStyles } from 'react-native-unistyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

/* Components */
import { Button, Checkbox, FormField, FormSelect } from '../../../ui';

/* Hooks */
import { useStatus } from '../../../shared';
import { useAuth } from '../../hooks';

/* Schemas */
import { profileFormSchema } from './schemas';

/* Utils */
import { PRECURSORS_OPTIONS } from '../../utils';
import { HOURS_REQUIREMENTS } from '../../../preaching';

/* Theme */
import { themeStylesheet } from '../../../theme';

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

    /**
     * Handles the selection of the hours requirement in the profile form.
     *
     * @param {string} value - The selected value of the hours requirement.
     * @param {Function} setFieldValue - A function to set the value of the field.
     *
     * @return {void} This function does not return anything.
     */
    const handleSelect = (value: string, setFieldValue: (field: string, value: any) => void): void => {
        setFieldValue('hoursRequirement', HOURS_REQUIREMENTS[value as keyof typeof HOURS_REQUIREMENTS] || 0);
        setEditHoursRequirement(false);
    }

    return (
        <Formik
            initialValues={{
                name: user.name,
                surname: user.surname,
                precursor: user.precursor,
                hoursRequirement: user?.hoursRequirement || 0
            }}
            onSubmit={ updateProfile }
            validateOnMount
            validationSchema={ profileFormSchema }
        >
            { ({ errors, handleSubmit, setFieldValue, isValid, values }) => (
                <View style={{ ...themeStyles.formContainer, justifyContent: 'flex-start' }}>

                    {/* Name field */}
                    <FormField
                        autoCapitalize="none"
                        leftIcon={
                            <Icon
                                color={ colors.icon }
                                name="person-outline"
                                size={ fontSizes.icon }
                            />
                        }
                        label="Nombre:"
                        name="name"
                        placeholder="Ingrese su nombre"
                    />

                    {/* Surname field */}
                    <FormField
                        autoCapitalize="none"
                        leftIcon={
                            <Icon
                                color={ colors.icon }
                                name="people-outline"
                                size={ fontSizes.icon }
                            />
                        }
                        label="Apellidos:"
                        name="surname"
                        placeholder="Ingrese su apellido"
                    />

                    {/* Precursor field */}
                    <FormSelect
                        icon={
                            <Icon
                                color={ colors.icon }
                                name="briefcase-outline"
                                size={ fontSizes.icon }
                            />
                        }
                        items={ PRECURSORS_OPTIONS }
                        label="Precursor:"
                        name="precursor"
                        onChange={ (value) => handleSelect(value, setFieldValue) }
                        placeholder="Seleccione una opción"
                        style={{ marginBottom: (values.precursor !== 'ninguno') ? margins.sm : margins.xl }}
                        title="Seleccione su precursorado"
                    />

                    { (values.precursor !== 'ninguno') && (
                        <>
                            {/* Hours requirement field */}
                            <FormField
                                autoCapitalize="none"
                                editable={ editHoursRequirement }
                                leftIcon={
                                    <Icon
                                        color={ colors.icon }
                                        name="time-outline"
                                        size={ fontSizes.icon }
                                    />
                                }
                                label="Requerimiento de horas:"
                                name="hoursRequirement"
                                placeholder="Ingrese su requerimiento de horas"
                                style={{ marginBottom: margins.md }}
                            />

                            {/* Checkbox to edit hours requirement */}
                            <Checkbox
                                onPress={ () => setEditHoursRequirement(!editHoursRequirement) }
                                status={ editHoursRequirement ? 'checked' : 'unchecked' }
                                label="Editar requerimiento de horas"
                            />
                        </>
                    ) }

                    {/* Submit button */}
                    <Button
                        disabled={ isAuthLoading }
                        icon={ (isAuthLoading) && (
                            <ActivityIndicator
                                color={ colors.contentHeader }
                                size={ fontSizes.icon }
                            />
                        ) }
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                        pressableStyle={{ marginBottom: top }}
                        text="Guardar"
                    />
                </View>
            ) }
        </Formik>
    );
}
