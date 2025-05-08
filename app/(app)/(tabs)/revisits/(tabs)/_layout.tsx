import { useCallback } from 'react';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { useFocusEffect, withLayoutContext } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

import { revisitsFilters } from '@application/constants/utils';

import { INIT_REVISIT } from '@application/features/revisits';

import { useRevisits } from '@revisits/hooks';
import { useTranslation } from '@ui/hooks';

const { Navigator } = createMaterialTopTabNavigator();

export const TopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function RevisitsTopTabsLauyout(): JSX.Element {
    const { theme: { colors } } = useStyles();

    const { setSelectedRevisit } = useRevisits();
    const { translate } = useTranslation();

    useFocusEffect(
        useCallback(() => {
            setSelectedRevisit({
                ...INIT_REVISIT,
                nextVisit: new Date().toString(),
            });
        }, [])
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
                    emptyMessage: translate('messages.revisits.notAdded'),
                    filter: revisitsFilters.ALL,
                    title: translate('screens.revisits.titles.allMyRevisits')
                }}
                name="index"
                options={{ title: translate('topTabs.revisits.all') }}
            />

            <TopTabs.Screen
                initialParams={{
                    emptyMessage: translate('messages.revisits.noMade'),
                    filter: revisitsFilters.VISITED,
                    title: translate('screens.revisits.titles.madeRevisits')
                }}
                name="visited"
                options={{ title: translate('topTabs.revisits.visited') }}
            />

            <TopTabs.Screen
                initialParams={{
                    emptyMessage: translate('messages.revisits.noVisit'),
                    filter: revisitsFilters.UNVISITED,
                    title: translate('screens.revisits.titles.toBeMadeRevisits')
                }}
                name="unvisited"
                options={{ title: translate('topTabs.revisits.unvisited') }}
            />
        </TopTabs>
    );
}