import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { RevisitCard } from '../../../components/revisits';
import { Fab, Title } from '../../../components/ui';

import { useTheme } from '../../../hooks';

import themeStyles from '../../../theme/styles';

const Revisits = () => {
    const { navigate } = useNavigation();

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

                <RevisitCard />
                <RevisitCard />
                <RevisitCard />
                <RevisitCard />
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