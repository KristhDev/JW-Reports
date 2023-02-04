import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

/* Features */
import { INIT_REVISIT } from '../../../features/revisits';

/* Screens */
import { RevisitModal } from '../RevisitModal';

/* Components */
import { Title } from '../../../components/ui';

/* Hooks */
import { useRevisits, useTheme } from '../../../hooks';

/* Styles */
import { styles as themeStyles } from '../../../theme';
import styles from './styles';

/**
 * This screen is responsible for grouping the components to show
 * the detail of a revisit.
 */
const RevisitDetail = () => {
    const [ imageHeight, setImageHeight ] = useState<number>(0);
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const { addListener, removeListener, getState } = useNavigation();
    const { width: windowWidth } = useWindowDimensions();

    const { state: { selectedRevisit }, setSelectedRevisit } = useRevisits();
    const { state: { colors } } = useTheme();

    const nextVist = dayjs(selectedRevisit.next_visit);

    /**
     * Effect to set imageHeight when changing the selectedRevisit.photo
     */
    useEffect(() => {
        if (selectedRevisit.photo) {
            Image.getSize(selectedRevisit.photo, (width, height) => {
                const h = windowWidth / width * height;
                setImageHeight(h);
            });
        }
    }, [ selectedRevisit.photo ]);

    /**
     * Effect to reset selectedRevisit when change index in
     * navigation and then is zero.
     */
    useEffect(() => {
        addListener('blur', () => {
            const { index } = getState();

            if (index === 0) {
                setSelectedRevisit({
                    ...INIT_REVISIT,
                    next_visit: new Date().toString()
                });
            }
        });

        return () => {
            removeListener('blur', () => {});
        }
    }, [ selectedRevisit ]);

    return (
        <>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center', flexGrow: 1, paddingBottom: 100 }}
                overScrollMode="never"
                style={{ flex: 1 }}
            >

                {/* Title of detail */}
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text={ selectedRevisit.person_name.toUpperCase() }
                    textStyle={{ fontSize: 24 }}
                />

                {/* Revisit status */}
                { (!selectedRevisit.done) ? (
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
                ) }

                {/* About section of revisit */}
                <View style={ styles.sectionStyle }>
                    <Text
                        style={{
                            ...styles.sectionSubTitle,
                            color: colors.text
                        }}
                    >
                        Información de { selectedRevisit.person_name }:
                    </Text>

                    <Text style={{ color: colors.text, fontSize: 19 }}>
                        { selectedRevisit.about }
                    </Text>
                </View>

                {/* Address section of revisit */}
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
                        { selectedRevisit.address }
                    </Text>
                </View>

                {/* Photo section of revisit */}
                { (selectedRevisit.photo) && (
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
                            source={{ uri: selectedRevisit.photo }}
                        />

                        <Text style={{ ...styles.imageText, color: colors.modalText }}>
                            La foto es para ayudarte a recordar el lugar de residencia de { selectedRevisit.person_name }
                        </Text>
                    </View>
                ) }

                {/* Date create revisit */}
                <Text style={{ ...styles.dateCreatedText, color: colors.modalText }}>
                    { dayjs(selectedRevisit.created_at).format('DD/MM/YYYY') }
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