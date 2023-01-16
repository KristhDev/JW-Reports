import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { RevisitModal } from '../RevisitModal';

import { Title } from '../../../components/ui';

import { useRevisits, useTheme } from '../../../hooks';

import themeStyles from '../../../theme/styles';
import styles from './styles';

const RevisitDetail = () => {
    const [ imageHeight, setImageHeight ] = useState<number>(0);
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const { addListener, removeListener, getState } = useNavigation();
    const { width: windowWidth } = useWindowDimensions();

    const { state: { seletedRevisit }, setSelectedRevisit } = useRevisits();
    const { state: { colors } } = useTheme();

    const nextVist = dayjs(seletedRevisit.next_visit);

    useEffect(() => {
        if (seletedRevisit.photo) {
            Image.getSize(seletedRevisit.photo, (width, height) => {
                const h = windowWidth / width * height;
                setImageHeight(h);
            });
        }
    }, [ seletedRevisit.photo ]);

    useEffect(() => {
        addListener('blur', () => {
            const { index } = getState();

            if (index === 0) {
                setSelectedRevisit({
                    id: '',
                    user_id: '',
                    person_name: '',
                    about: '',
                    address: '',
                    photo: '',
                    next_visit: new Date().toString(),
                    done: false,
                    created_at: new Date().toString(),
                    updated_at: new Date().toString()
                });
            }
        });

        return () => {
            removeListener('blur', () => {});
        }
    }, [ seletedRevisit ]);

    return (
        <>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}
                overScrollMode="never"
                style={{ flex: 1 }}
            >
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text={ seletedRevisit.person_name.toUpperCase() }
                    textStyle={{ fontSize: 24 }}
                />

                {
                    (!seletedRevisit.done) ? (
                        <View style={{ ...styles.sectionStyle, paddingTop: 40 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={{
                                        ...styles.sectionSubTitle,
                                        color: colors.text,
                                        marginBottom: 0
                                    }}
                                >
                                    Próxima visita:
                                </Text>

                                <Text style={{ color: colors.text, fontSize: 19 }}>
                                    { ` ${ nextVist.format('DD') } de ${ nextVist.format('MMMM') } del ${ nextVist.format('YYYY') }` }
                                </Text >
                            </View>

                            <TouchableOpacity
                                activeOpacity={ 0.75 }
                                onPress={ () => setShowModal(true) }
                            >
                                <Text style={{ color: colors.linkText, fontSize: 19 }}>
                                    ¿Ya la visitaste?
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{ ...styles.sectionStyle, flexDirection: 'row' }}>
                            <Text style={{ color: colors.text, fontSize: 19, marginRight: 10 }}>
                                Revisita realizada
                            </Text>

                            <TouchableOpacity
                                activeOpacity={ 0.75 }
                                onPress={ () => setShowModal(true) }
                            >
                                <Text style={{ color: colors.linkText, fontSize: 19 }}>
                                    ¿Visitar de nuevo?
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }

                <View style={ styles.sectionStyle }>
                    <Text
                        style={{
                            ...styles.sectionSubTitle,
                            color: colors.text
                        }}
                    >
                        Información de { seletedRevisit.person_name }:
                    </Text>

                    <Text style={{ color: colors.text, fontSize: 19 }}>
                        { seletedRevisit.about }
                    </Text>
                </View>

                <View style={ styles.sectionStyle }>
                    <Text
                        style={{
                            ...styles.sectionSubTitle,
                            color: colors.text
                        }}
                    >
                        Dirección:
                    </Text>

                    <Text style={{ color: colors.text, fontSize: 19 }}>
                        { seletedRevisit.address }
                    </Text>
                </View>

                {
                    seletedRevisit.photo && (
                        <View style={ styles.sectionStyle }>
                            <Text
                                style={{
                                    ...styles.sectionSubTitle,
                                    color: colors.text,
                                }}
                            >
                                Foto:
                            </Text>

                            <Image
                                style={{ height: imageHeight, width: '100%' }}
                                source={{ uri: seletedRevisit.photo }}
                            />

                            <Text style={{ ...styles.imageText, color: colors.modalText }}>
                                La foto es para ayudarte a recordar el lugar de residencia de { seletedRevisit.person_name }
                            </Text>
                        </View>
                    )
                }

                <Text style={{ ...styles.dateCreatedText, color: colors.modalText }}>
                    { dayjs(seletedRevisit.created_at).format('DD/MM/YYYY') }
                </Text>
            </ScrollView>

            <RevisitModal
                isOpen={ showModal }
                onClose={ () => setShowModal(false) }
            />
        </>
    );
}

export default RevisitDetail;