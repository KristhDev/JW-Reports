import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* DI */
import { timeAdapter } from '@config/di';

/* Screens */
import { RevisitModal } from '@revisits/screens';

/* Components */
import { Link, Title } from '@ui/components';

/* Hooks */
import { useRevisits } from '@revisits/hooks'
import { useTranslation } from '@ui/hooks';

/* Styles */
import { themeStylesheet } from '@theme/styles';
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

    const { styles: themeStyles, theme: { fontSizes, margins } } = useStyles(themeStylesheet);
    const { styles } = useStyles(stylesheet);

    const { state: { selectedRevisit } } = useRevisits();
    const { translate } = useTranslation();

    const nextVisit = timeAdapter.format(selectedRevisit.nextVisit, timeAdapter.formats.LOCALE_LONG_DATE);

    const aboutLabel = translate('screens.revisits.labels.about', {
        person: selectedRevisit.personName
    });

    const photoPlaceholder = translate('screens.revisits.photoPlaceholder', {
        person: selectedRevisit.personName
    });

    const alreadyVisited = translate('screens.revisits.questions.alreadyVisited', {
        person: selectedRevisit.personName
    });

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
                                { translate('screens.revisits.labels.nextVisit') }
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
                            { alreadyVisited }
                        </Link>
                    </View>
                ) : (
                    <View
                        style={{ ...themeStyles.detailSection, flexDirection: 'row', gap: margins.xs }}
                        testID="revisit-detail-revisit-again-section"
                    >
                        <Text style={ themeStyles.detailText }>
                            { translate('screens.revisits.labels.revisitDone') }
                        </Text>

                        <Link
                            onPress={ () => setShowModal(true) }
                            textStyle={ themeStyles.sectionTextSize }
                        >
                            { translate('screens.revisits.questions.visitAgain') }
                        </Link>
                    </View>
                ) }

                {/* About section of revisit */}
                <View style={ themeStyles.detailSection }>
                    <Text
                        style={ themeStyles.detailSubTitle }
                        testID="revisit-detail-about-subtitle"
                    >
                        { aboutLabel }
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
                        { translate('screens.revisits.labels.address') }
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
                            { translate('screens.revisits.labels.photo') }
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
                            { photoPlaceholder }
                        </Text>
                    </View>
                ) }

                {/* Date create revisit */}
                <View style={ themeStyles.createdAtContainer }>
                    <Text
                        style={ themeStyles.createdAtText }
                        testID="revisit-detail-created-date"
                    >
                        { timeAdapter.format(selectedRevisit.createdAt, timeAdapter.formats.LOCALE_SHORT_DATE) }
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