import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button, DatetimeField, FormField } from '../../ui';

import { useRevisits, useStatus, useTheme } from '../../../hooks';

export const RevisitForm = () => {
    const { state: { seletedRevisit } } = useRevisits();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    return (
        <Formik
            initialValues={{
                person_name: seletedRevisit.person_name,
                about: seletedRevisit.about,
                direction: seletedRevisit.direction,
                next_visit: new Date(seletedRevisit.next_visit)
            }}
            onSubmit={ () => {} }
            validateOnMount
        >
            { ({ handleSubmit, errors, isValid }) => (
                <View style={{ alignItems: 'center', paddingTop: 30, paddingBottom: 40 }}>
                    <FormField
                        icon={
                            <Icon
                                color={ colors.icon }
                                name="person-outline"
                                size={ 25 }
                            />
                        }
                        label="Nombre de la persona:"
                        name="person_name"
                        placeholder="Ingrese el nombre"
                    />

                    <FormField
                        multiline
                        numberOfLines={ 10 }
                        label="Información de la persona:"
                        name="about"
                        placeholder="Ingrese datos sobre la persona, tema de conversación, aspectos importantes, etc..."
                    />

                    <FormField
                        multiline
                        numberOfLines={ 4 }
                        label="Dirección:"
                        name="direction"
                        placeholder="Ingrese la dirección"
                    />

                    <DatetimeField
                        icon={
                            <Icon
                                color={ colors.contentHeader }
                                name="calendar-outline"
                                size={ 25 }
                            />
                        }
                        inputDateFormat="DD"
                        label="Próxima visita:"
                        modalTitle="Próxima visita"
                        mode="date"
                        name="next_visit"
                        placeholder="Seleccione el día"
                    />

                    <Button
                        disabled={ false }
                        icon={
                            (false) && (
                                <ActivityIndicator
                                    color={ colors.contentHeader }
                                    size="small"
                                    style={{ marginLeft: 10 }}
                                />
                            )
                        }
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                        // text={ (seletedRevisit.id !== '') ? 'Actualizar' : 'Guardar' }
                        text="Guardar"
                        touchableStyle={{ marginTop: 30 }}
                    />
                </View>
            ) }
        </Formik>
    );
}