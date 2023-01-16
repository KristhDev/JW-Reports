import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View, useWindowDimensions } from 'react-native';
import { Formik } from 'formik';
import { date, object, string } from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

import { Button, DatetimeField, FormField } from '../../ui';

import { useImagePicker, useRevisits, useStatus, useTheme } from '../../../hooks';

import { RevisitFormValues } from './interfaces';

import themeStyles from '../../../theme/styles';

const defaultRevisit = require('../../../assets/revisit-default.jpg');

export const RevisitForm = () => {
    const [ imageHeight, setImageHeight ] = useState<number>(0);
    const [ imageUri, setImageUri ] = useState<string>('https://local-image.com/images.jpg');
    const { width: windowWidth } = useWindowDimensions();

    const { image, takeImageToGallery, takePhoto } = useImagePicker();
    const { state: { seletedRevisit, isRevisitLoading }, saveRevisit, updateRevisit } = useRevisits();
    const { setErrorForm } = useStatus();
    const { state: { colors } } = useTheme();

    const handleSaveOrUpdate = (formValues: RevisitFormValues) => {
        (seletedRevisit.id === '')
            ? saveRevisit(formValues)
            : updateRevisit(formValues);
    }

    const revisitFormSchema = object().shape({
        person_name: string()
            .min(2, 'El nombre de la persona debe tener al menos 2 caracteres.')
            .required('El nombre de la persona es requerido.'),
        about: string()
            .min(10, 'La información de la persona debe tener al meno 10 caracteres.')
            .required('La información de la persona es requerida.'),
        address: string()
            .min(10, 'La dirección debe tener al meno 10 caracteres.')
            .required('La dirección es requerida.'),
        next_visit: date()
            .required('La fecha de la próxima visita no puede estar vacía'),
    });

    useEffect(() => {
        if (!seletedRevisit?.photo) {
            const { height, width, uri } = Image.resolveAssetSource(defaultRevisit);
            const h = windowWidth / width * height;
            setImageHeight(h);
            setImageUri(uri);
        }
        else {
            Image.getSize(seletedRevisit.photo, (width, height) => {
                const h = windowWidth / width * height;
                setImageHeight(h);
                setImageUri(seletedRevisit.photo!);
            });
        }
    }, []);

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
                person_name: seletedRevisit.person_name,
                about: seletedRevisit.about,
                address: seletedRevisit.address,
                next_visit: new Date(seletedRevisit.next_visit)
            }}
            onSubmit={ handleSaveOrUpdate }
            validateOnMount
            validationSchema={ revisitFormSchema }
        >
            { ({ handleSubmit, errors, isValid }) => (
                <View style={{ ...themeStyles.formContainer, paddingTop: 30, paddingBottom: 40 }}>
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
                        inputStyle={{ maxHeight: 225 }}
                        label="Información de la persona:"
                        multiline
                        name="about"
                        numberOfLines={ 10 }
                        placeholder="Ingrese datos sobre la persona, tema de conversación, aspectos importantes, etc..."
                    />

                    <FormField
                        inputStyle={{ maxHeight: 105 }}
                        label="Dirección:"
                        multiline
                        name="address"
                        numberOfLines={ 4 }
                        placeholder="Ingrese la dirección"
                    />

                    <View style={{ ...themeStyles.formField, width: windowWidth * 0.9 }}>
                        <Text style={{ ...themeStyles.formLabel, color: colors.titleText }}>
                            Foto
                        </Text>

                        <Image
                            source={{ uri: imageUri }}
                            style={{ height: imageHeight, width: '100%' }}
                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                            <Button
                                icon={
                                    <Icon
                                        color={ colors.contentHeader }
                                        name="image-outline"
                                        size={ 25 }
                                        style={{ marginLeft: 5 }}
                                    />
                                }
                                onPress={ takeImageToGallery }
                                text="Galeria"
                            />

                            <Button
                                icon={
                                    <Icon
                                        color={ colors.contentHeader }
                                        name="camera-outline"
                                        size={ 25 }
                                        style={{ marginLeft: 5 }}
                                    />
                                }
                                onPress={ takePhoto }
                                text="Camara"
                            />
                        </View>
                    </View>

                    <DatetimeField
                        icon={
                            <Icon
                                color={ colors.contentHeader }
                                name="calendar-outline"
                                size={ 25 }
                            />
                        }
                        inputDateFormat="DD/MM/YYYY"
                        label="Próxima visita:"
                        modalTitle="Próxima visita"
                        mode="date"
                        name="next_visit"
                        placeholder="Seleccione el día"
                    />

                    <Button
                        disabled={ isRevisitLoading }
                        icon={
                            (isRevisitLoading) && (
                                <ActivityIndicator
                                    color={ colors.contentHeader }
                                    size="small"
                                    style={{ marginLeft: 10 }}
                                />
                            )
                        }
                        onPress={ (isValid) ? handleSubmit : () => setErrorForm(errors) }
                        text={ (seletedRevisit.id !== '') ? 'Actualizar' : 'Guardar' }
                        touchableStyle={{ marginTop: 30 }}
                    />
                </View>
            ) }
        </Formik>
    );
}