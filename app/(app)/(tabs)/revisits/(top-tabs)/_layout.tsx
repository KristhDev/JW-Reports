import { useEffect, useMemo } from 'react';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { useNavigation, withLayoutContext } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

import { revisitsFilters } from '@application/constants/utils';

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
    const navigation = useNavigation();
    const { theme: { colors } } = useStyles();

    const { clearSelectedRevisit } = useRevisits();
    const { translate } = useTranslation();

    const sceneStyle = useMemo(() => ({ backgroundColor: colors.background }), [ colors.background ]);

    const tabBarStyle = useMemo(() => ({
        backgroundColor: colors.contentHeader,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderTopTab,
        elevation: 0
    }), [ colors.contentHeader, colors.borderTopTab ]);

    const tabBarIndicatorStyle = useMemo(() => ({
        backgroundColor: colors.button,
        height: 4
    }), [ colors.button ]);

    useEffect(() => {
        const focusUnsubscribe = navigation.addListener('focus', () => {
            clearSelectedRevisit();
        });

        return focusUnsubscribe;
    }, []);

    return (
        <TopTabs
            screenOptions={ ({ navigation }) => ({
                sceneStyle,
                tabBarActiveTintColor: colors.button,
                tabBarPressColor: (navigation.isFocused()) ? colors.buttonTranslucent : colors.buttonTransparent,
                tabBarStyle,
                tabBarLabelStyle: {
                    fontWeight: (navigation.isFocused()) ? 'bold' : 'normal'
                },
                tabBarInactiveTintColor: colors.headerText,
                tabBarIndicatorStyle
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