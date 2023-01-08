import React, { Children } from 'react';
import { ActivityIndicator, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { RevisitCard } from '../../../components/revisits';
import { Fab, InfoText, Title } from '../../../components/ui';

import { useRevisits, useTheme } from '../../../hooks';

import themeStyles from '../../../theme/styles';

const Revisits = () => {
    const { navigate } = useNavigation();
    const { height } = useWindowDimensions();

    const { state: { revisits, isRevisitsLoading } } = useRevisits();
    const { state: { colors } } = useTheme();

    return (
        <>
            <ScrollView
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}
                overScrollMode="never"
                style={{ flex: 1 }}
            >
                <Title
                    containerStyle={ themeStyles.titleContainerSpacingVertical }
                    text="ÚLTIMAS REVISITAS"
                    textStyle={{ fontSize: 24 }}
                />

                {
                    (isRevisitsLoading) && (
                        <ActivityIndicator
                            color={ colors.button }
                            size="large"
                            style={{ marginTop: height * 0.22 }}
                        />
                    )
                }

                {
                    (!isRevisitsLoading && revisits.length > 0) && (
                        <>
                            {
                                Children.toArray(revisits.map(revisit => (
                                    <RevisitCard revisit={ revisit } />
                                )))
                            }
                        </>
                    )
                }

                {
                    (!isRevisitsLoading && revisits.length === 0) && (
                        <InfoText
                            containerStyle={{ marginTop: height * 0.22 }}
                            text="No haz agregado ninguna revisita."
                        />
                    )
                }
            </ScrollView>

            <Fab
                color={ colors.button }
                icon={
                    <Icon
                        color={ colors.contentHeader }
                        name="add-circle-outline"
                        size={ 40 }
                        style={{ marginLeft: 3 }}
                    />
                }
                onPress={ () => navigate('AddOrEditRevisitScreen' as never) }
                style={ themeStyles.fabBottomRight }
                touchColor={ colors.buttonDark }
            />
        </>
    );
}

export default Revisits;