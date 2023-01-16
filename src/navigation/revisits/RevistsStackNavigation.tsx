import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import RevisitsTopTabsNavigation from './RevisitsTopTabsNavigation';

import { AddOrEditRevisit, RevisitDetail } from '../../screens/revisits';

import { RevisitHeader } from '../../components/revisits';
import { BackButton } from '../../components/ui';

import { useRevisits, useTheme } from '../../hooks';

import { RevisitsStackParamsList } from '../../interfaces/revisits';

const Stack = createStackNavigator<RevisitsStackParamsList>();

const RevisitsStackNavigation = () => {
    const { state: { selectedRevisit } } = useRevisits();
    const { state: { colors } } = useTheme();

    const revisitDetailTitle = `Revisita ${ selectedRevisit.person_name }`;

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: {
                    backgroundColor: colors.contentHeader,
                },
                headerStyle: {
                    backgroundColor: colors.header
                },
                headerTintColor: colors.headerText,
                headerShadowVisible: false
            }}
        >
            <Stack.Screen
                component={ RevisitsTopTabsNavigation }
                name="RevisitsTopTabsNavigation"
                options={{ title: 'Revisitas' }}
            />

            <Stack.Screen
                component={ RevisitDetail }
                name="RevisitDetailScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <RevisitHeader
                            deleteButton={ true }
                            editButton={ true }
                        />
                    ),
                    title: (revisitDetailTitle.length >= 22) ? revisitDetailTitle.slice(0, 22) + '...' : revisitDetailTitle
                }}
            />

            <Stack.Screen
                component={ AddOrEditRevisit }
                name="AddOrEditRevisitScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <RevisitHeader
                            deleteButton={ selectedRevisit.id !== '' }
                            editButton={ false }
                        />
                    ),
                    title: `${ selectedRevisit.id !== '' ? 'Editar' : 'Agregar' } revisita`
                }}
            />
        </Stack.Navigator>
    );
}

export default RevisitsStackNavigation;