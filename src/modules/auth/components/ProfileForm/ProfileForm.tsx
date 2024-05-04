import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { Formik } from 'formik';
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
import { styles as themeStylesheet } from '../../../theme';

/**
 * This component is responsible for rendering the fields so that an
 * authenticated user can update their profile data.
 *
 * @return {JSX.Element} The rendered form component.
 */
export const ProfileForm = (): JSX.Element => {
    const { top } = useSafeAreaInsets();

    const { state: { user, isAuthLoading }, updateProfile } = useAuth();
    const { setErrorForm } = useStatus();
    const { styles: themeStyles, theme: { colors, margins } } = useStyles(themeStylesheet);

    const [ editHoursRequirement, setEditHoursRequirement ] = useState<boolean>(![ 0, 30, 50, 90 ].includes(user?.hoursRequirement || 0));

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
                        icon={
                            <Icon
                                color={ colors.icon }
                                name="person-outline"
                                size={ 25 }
                            />
                        }
                        label="Nombre:"
                        name="name"
                        placeholder="Ingrese su nombre"
                    />

                    {/* Surname field */}
                    <FormField
                        autoCapitalize="none"
                        icon={
                            <Icon
                                color={ colors.icon }
                                name="people-outline"
                                size={ 25 }
                            />
                        }
                        label="Apellidos:"
                        name="surname"
                        placeholder="Ingrese su apellido"
                    />

                    {/* Precursor field */}
                    <FormSelect
                        items={ PRECURSORS_OPTIONS }
                        label="Precursor:"
                        name="precursor"
                        onChange={ (value) => {
                            setFieldValue('hoursRequirement', HOURS_REQUIREMENTS[value as keyof typeof HOURS_REQUIREMENTS] || 0);
                            setEditHoursRequirement(false);
                        } }
                        placeholder="Seleccione una opción"
                        style={{ marginBottom: (values.precursor !== 'ninguno') ? margins.sm : margins.lg }}
                        title="Seleccione su precursorado"
                    />

                    { (values.precursor !== 'ninguno') && (
                        <>
                            {/* Hours requirement field */}
                            <FormField
                                autoCapitalize="none"
                                editable={ editHoursRequirement }
                                icon={
                                    <Icon
                                        color={ colors.icon }
                                        name="time-outline"
                                        size={ 25 }
                                    />
                                }
                                label="Requerimiento de horas:"
                                name="hoursRequirement"
                                placeholder="Ingrese su requerimiento de horas"
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
                        icon={
                            (isAuthLoading) && (
                                <ActivityIndicator
                                    color={ colors.contentHeader }
                                    size={ 25 }
                                    style={{ marginLeft: 10 }}
                                />
                            )
                        }
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors)  }
                        text="Guardar"
                        touchableStyle={{ marginBottom: top }}
                    />
                </View>
            ) }
        </Formik>
    );
}
