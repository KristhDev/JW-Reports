import React, { useCallback } from 'react';
import { useStyles } from 'react-native-unistyles';
import { useFocusEffect } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

/* Features */
import { INIT_REVISIT } from '@application/features';

/* Modules */
import { Revisits, RevisitsTopTabsParamsList, useRevisits } from '..';

const Tabs = createMaterialTopTabNavigator<RevisitsTopTabsParamsList>();

/**
 * This is a top taps navigation for the revisits.
 *
 * @return {JSX.Element} rendered top taps navigation of revisits
 */
const RevisitsTopTabsNavigation = (): JSX.Element => {
    const { theme: { colors } } = useStyles();

    const { setSelectedRevisit } = useRevisits();

    useFocusEffect(
        useCallback(() => {
            setSelectedRevisit({
                ...INIT_REVISIT,
                nextVisit: new Date().toString()
            });
        }, [])
    );

    return (
        <Tabs.Navigator
            overScrollMode="never"
            screenOptions={ ({ navigation }) => {
                const { isFocused } = navigation;
                const pressColor = (isFocused()) ? colors.buttonTranslucent : colors.buttonTransparent;

                return {
                    sceneStyle: {
                        backgroundColor: colors.contentHeader
                    },
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
                    emptyMessage: 'No has agregado ninguna revisita.',
                    filter: 'all',
                    title: 'TODAS MIS REVISITAS',
                }}
                name="RevisitsScreen"
                options={{ title: 'Todas' }}
            />

            <Tabs.Screen
                component={ Revisits }
                initialParams={{
                    emptyMessage: 'No has realizado ninguna revisita.',
                    filter: 'visited',
                    title: 'REVISITAS REALIZADAS'
                }}
                name="VisitedRevisitsScreen"
                options={{title: 'Visitadas' }}
            />

            <Tabs.Screen
                component={ Revisits }
                initialParams={{
                    emptyMessage: 'No tienes ninguna revisita por hacer.',
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