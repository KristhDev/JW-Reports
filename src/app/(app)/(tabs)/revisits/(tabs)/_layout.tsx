import { useCallback } from 'react';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { useFocusEffect, withLayoutContext } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

import { INIT_REVISIT } from '@application/features';

import { useRevisits } from '@revisits';

const { Navigator } = createMaterialTopTabNavigator();

export const TopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function RevisitsTopTabsLauyout(): JSX.Element {
    const { theme: { colors } } = useStyles();

    const { state: { selectedRevisit }, setSelectedRevisit } = useRevisits();

    useFocusEffect(
        useCallback(() => {
            if (selectedRevisit.id === '') return;

            setSelectedRevisit({
                ...INIT_REVISIT,
                nextVisit: new Date().toString(),
            });
        }, [ selectedRevisit ])
    );

    return (
        <TopTabs
            overScrollMode="never"
            screenOptions={ ({ navigation }) => ({
                sceneStyle: { backgroundColor: colors.contentHeader },
                tabBarActiveTintColor: colors.button,
                tabBarPressColor: (navigation.isFocused()) ? colors.buttonTranslucent : colors.buttonTransparent,
                tabBarStyle: {
                    backgroundColor: colors.contentHeader,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.header
                },
                tabBarLabelStyle: {
                    fontWeight: (navigation.isFocused()) ? 'bold' : 'normal'
                },
                tabBarInactiveTintColor: colors.headerText,
                tabBarIndicatorStyle: {
                    backgroundColor: colors.button,
                    height: 3
                }
            }) }
        >
            <TopTabs.Screen
                initialParams={{
                    emptyMessage: 'No has agregado ninguna revisita.',
                    filter: 'all',
                    title: 'TODAS MIS REVISITAS',
                }}
                name="index"
                options={{ title: 'Todas' }}
            />

            <TopTabs.Screen
                initialParams={{
                    emptyMessage: 'No has realizado ninguna revisita.',
                    filter: 'visited',
                    title: 'REVISITAS REALIZADAS',
                }}
                name="visited"
                options={{ title: 'Visitadas' }}
            />

            <TopTabs.Screen
                initialParams={{
                    emptyMessage: 'No tienes ninguna revisita por hacer.',
                    filter: 'unvisited',
                    title: 'REVISITAS POR HACER',
                }}
                name="unvisited"
                options={{ title: 'Por Visitar' }}
            />
        </TopTabs>
    );
}