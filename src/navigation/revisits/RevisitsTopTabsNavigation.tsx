import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Revisits } from '../../screens/revisits';

import { useTheme } from '../../hooks';

import { RevistsTopTabsParamsList } from '../../interfaces/revisits';

const Tabs = createMaterialTopTabNavigator<RevistsTopTabsParamsList>();

const RevisitsTopTabsNavigation = () => {
    const { state: { colors }, BUTTON_TRANSLUCENT_COLOR, BUTTON_TRANSPARENT_COLOR } = useTheme();

    return (
        <Tabs.Navigator
            overScrollMode="never"
            sceneContainerStyle={{
                backgroundColor: colors.contentHeader,
            }}
            screenOptions={ ({ navigation }) => {
                const { isFocused } = navigation;
                const pressColor = (isFocused()) ? BUTTON_TRANSLUCENT_COLOR : BUTTON_TRANSPARENT_COLOR;

                return {
                    tabBarActiveTintColor: colors.button,
                    tabBarPressColor: pressColor,
                    tabBarStyle: {
                        backgroundColor: colors.contentHeader,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.header
                    },
                    tabBarLabelStyle: {
                        fontWeight: (isFocused()) ? 'bold' : 'normal'
                    },
                    tabBarInactiveTintColor: colors.headerText,
                    tabBarIndicatorStyle: {
                        backgroundColor: colors.button,
                        height: 3
                    }
                }
            } }
        >
            <Tabs.Screen
                component={ Revisits }
                initialParams={{
                    emptyMessage: 'No haz agregado ninguna revisita.',
                    filter: 'all',
                    title: 'TODAS MIS REVISITAS',
                }}
                name="RevisitsScreen"
                options={{ title: 'Todas' }}
            />

            <Tabs.Screen
                component={ Revisits }
                initialParams={{
                    emptyMessage: 'No haz realizado ninguna revisita.',
                    filter: 'visited',
                    title: 'REVISITAS REALIZADAS'
                }}
                name="VisitedRevisitsScreen"
                options={{title: 'Visitadas' }}
            />

            <Tabs.Screen
                component={ Revisits }
                initialParams={{
                    emptyMessage: 'No tienes ninguna revista por hacer.',
                    filter: 'unvisited',
                    title: 'REVISITAS POR HACER'
                }}
                name="UnvisitedRevisitsScreen"
                options={{ title: 'Por Visitar' }}
            />
        </Tabs.Navigator>
    );
}

export default RevisitsTopTabsNavigation;