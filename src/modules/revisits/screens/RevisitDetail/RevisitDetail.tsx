import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';

/* Modules */
import { INIT_REVISIT, RevisitModal, useRevisits } from '../../';
import { styles as themeStylesheet } from '../../../theme';
import { Title } from '../../../ui';

/* Utils */
import { date } from '../../../../utils';

/* Styles */
import stylesheet from './styles';

/**
 * This screen is responsible for grouping the components to show
 * the detail of a revisit.
 *
 * @return {JSX.Element} Return jsx element to render detail of revisit
 */
const RevisitDetail = (): JSX.Element => {
    const [ imageHeight, setImageHeight ] = useState<number>(0);
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const { addListener, removeListener, getState } = useNavigation();
    const { width: windowWidth } = useWindowDimensions();

    const { state: { selectedRevisit }, setSelectedRevisit } = useRevisits();
    const { styles: themeStyles, theme: { colors } } = useStyles(themeStylesheet);
    const { styles } = useStyles(stylesheet);

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
        addListener('blur', () => {
            const navigationState = getState();
            if (!navigationState) return;

            if (navigationState.index === 0) {
                setSelectedRevisit({
                    ...INIT_REVISIT,
                    nextVisit: new Date().toString()
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
                contentContainerStyle={ styles.scrollView }
                overScrollMode="never"
                style={{ flex: 1 }}
            >

                {/* Title of detail */}
                <Title
                    containerStyle={ themeStyles.titleContainer }
                    text={ selectedRevisit.personName.toUpperCase() }
                    textStyle={{ fontSize: 24 }}
                />

                {/* Revisit status */}
                { (!selectedRevisit.done) ? (
                    <View style={ styles.sectionStyle }>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ ...styles.sectionSubTitle, marginBottom: 0 }}>
                                Próxima visita:
                            </Text>

                            <Text
                                style={{ color: colors.text, fontSize: 19 }}
                                testID="revisit-detail-next-visit"
                            >
                                { ` ${ nextVisit }` }
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
                    <View
                        style={{ ...styles.sectionStyle, flexDirection: 'row' }}
                        testID="revisit-detail-revisit-again-section"
                    >
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
                <View
                    style={ styles.sectionStyle }
                    testID="revisit-detail-about-section"
                >
                    <Text style={ styles.sectionSubTitle }>
                        Información de { selectedRevisit.personName }:
                    </Text>

                    <Text style={{ color: colors.text, fontSize: 19 }}>
                        { selectedRevisit.about }
                    </Text>
                </View>

                {/* Address section of revisit */}
                <View
                    style={ styles.sectionStyle }
                    testID="revisit-detail-address-section"
                >
                    <Text style={ styles.sectionSubTitle }>
                        Dirección:
                    </Text>

                    <Text style={{ color: colors.text, fontSize: 19 }}>
                        { selectedRevisit.address }
                    </Text>
                </View>

                {/* Photo section of revisit */}
                { (selectedRevisit.photo) && (
                    <View style={ styles.sectionStyle }>
                        <Text style={ styles.sectionSubTitle }>
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
                <Text
                    style={ styles.dateCreatedText }
                    testID="revisit-detail-created-date"
                >
                    { date.format(selectedRevisit.createdAt, 'DD/MM/YYYY') }
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