import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';

/* Modules */
import { INIT_REVISIT, RevisitModal, useRevisits } from '../../';
import { themeStylesheet } from '@theme';
import { Link, Title } from '@ui';

/* Utils */
import { date } from '@utils';

/* Styles */
import { stylesheet } from './styles';

/**
 * This screen is responsible for grouping the components to show
 * the detail of a revisit.
 *
 * @return {JSX.Element} Return jsx element to render detail of revisit
 */
const RevisitDetail = (): JSX.Element => {
    const [ imageHeight, setImageHeight ] = useState<number>(0);
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const { width: windowWidth } = useWindowDimensions();

    const navigation = useNavigation();
    const { styles: themeStyles, theme: { fontSizes, margins } } = useStyles(themeStylesheet);
    const { styles } = useStyles(stylesheet);

    const { state: { selectedRevisit }, setSelectedRevisit } = useRevisits();

    const nextVisit = date.format(selectedRevisit.nextVisit, 'DD [de] MMMM [del] YYYY');

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
        navigation.addListener('blur', () => {
            const navigationState = navigation.getState();
            if (!navigationState) return;

            if (navigationState.index === 0) {
                setSelectedRevisit({
                    ...INIT_REVISIT,
                    nextVisit: new Date().toString()
                });
            }
        });

        return () => {
            navigation.removeListener('blur', () => {});
        }
    }, [ selectedRevisit ]);

    return (
        <>
            <ScrollView
                contentContainerStyle={ themeStyles.scrollView }
                overScrollMode="never"
                style={{ flex: 1 }}
            >

                {/* Title of detail */}
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text={ selectedRevisit.personName.toUpperCase() }
                    textStyle={{ fontSize: fontSizes.md }}
                />

                {/* Revisit status */}
                { (!selectedRevisit.done) ? (
                    <View style={ themeStyles.detailSection }>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ ...themeStyles.detailSubTitle, marginBottom: 0 }}>
                                Próxima visita:
                            </Text>

                            <Text
                                style={ themeStyles.detailText }
                                testID="revisit-detail-next-visit"
                            >
                                { ` ${ nextVisit }` }
                            </Text >
                        </View>

                        <Link
                            onPress={ () => setShowModal(true) }
                            textStyle={ themeStyles.sectionTextSize }
                        >
                            ¿Ya la visitaste?
                        </Link>
                    </View>
                ) : (
                    <View
                        style={{ ...themeStyles.detailSection, flexDirection: 'row', gap: margins.xs }}
                        testID="revisit-detail-revisit-again-section"
                    >
                        <Text style={ themeStyles.detailText }>
                            Revisita realizada
                        </Text>

                        <Link
                            onPress={ () => setShowModal(true) }
                            textStyle={ themeStyles.sectionTextSize }
                        >
                            ¿Visitar de nuevo?
                        </Link>
                    </View>
                ) }

                {/* About section of revisit */}
                <View style={ themeStyles.detailSection }>
                    <Text
                        style={ themeStyles.detailSubTitle }
                        testID="revisit-detail-about-subtitle"
                    >
                        Información de { selectedRevisit.personName }:
                    </Text>

                    <Text
                        style={ themeStyles.detailText }
                        testID="revisit-detail-about-text"
                    >
                        { selectedRevisit.about }
                    </Text>
                </View>

                {/* Address section of revisit */}
                <View style={ themeStyles.detailSection }>
                    <Text style={ themeStyles.detailSubTitle }>
                        Dirección:
                    </Text>

                    <Text
                        style={ themeStyles.detailText }
                        testID="revisit-detail-address-text"
                    >
                        { selectedRevisit.address }
                    </Text>
                </View>

                {/* Photo section of revisit */}
                { (selectedRevisit.photo) && (
                    <View style={ themeStyles.detailSection }>
                        <Text style={ themeStyles.detailSubTitle }>
                            Foto:
                        </Text>

                        <Image
                            style={{ height: imageHeight, width: '100%' }}
                            source={{ uri: selectedRevisit.photo }}
                            testID="revisit-detail-photo-image"
                        />

                        <Text
                            style={ styles.imageText }
                            testID="revisit-detail-photo-text"
                        >
                            La foto es para ayudarte a recordar el lugar de residencia de { selectedRevisit.personName }
                        </Text>
                    </View>
                ) }

                {/* Date create revisit */}
                <View style={ themeStyles.createdAtContainer }>
                    <Text
                        style={ themeStyles.createdAtText }
                        testID="revisit-detail-created-date"
                    >
                        { date.format(selectedRevisit.createdAt, 'DD/MM/YYYY') }
                    </Text>
                </View>
            </ScrollView>

            <RevisitModal
                isOpen={ showModal }
                onClose={ () => setShowModal(false) }
            />
        </>
    );
}

export default RevisitDetail;