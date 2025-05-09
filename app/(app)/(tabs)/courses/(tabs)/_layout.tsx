import { useWindowDimensions } from 'react-native';
import { useCallback } from 'react';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { useFocusEffect, withLayoutContext } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Constants */
import { coursesFilters } from '@application/constants/utils';

/* Hooks */
import { useCourses } from '@courses/hooks';
import { useTranslation } from '@ui/hooks';

const { Navigator } = createMaterialTopTabNavigator();

export const TopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function CoursesTopTabsLauyout(): JSX.Element {
    const { width } = useWindowDimensions();
    const { theme: { colors } } = useStyles();

    const { state: { selectedCourse }, setSelectedCourse } = useCourses();
    const { translate } = useTranslation();

    useFocusEffect(
        useCallback(() => {
            setSelectedCourse(selectedCourse);
        }, [])
    );

    return (
        <TopTabs
            overScrollMode="never"
            screenOptions={ ({ navigation }) => ({
                sceneStyle: { backgroundColor: colors.contentHeader },
                tabBarActiveTintColor: colors.button,
                tabBarInactiveTintColor: colors.headerText,
                tabBarIndicatorStyle: {
                    backgroundColor: colors.button,
                    height: 3
                },
                tabBarItemStyle: {
                    width: width / 3
                },
                tabBarLabelStyle: {
                    fontWeight: (navigation.isFocused()) ? 'bold' : 'normal'
                },
                tabBarPressColor: (navigation.isFocused()) ? colors.buttonTranslucent : colors.buttonTransparent,
                tabBarScrollEnabled: true,
                tabBarStyle: {
                    backgroundColor: colors.contentHeader,
                    borderBottomColor: colors.header,
                    borderBottomWidth: 1
                },
            }) }
        >
            <TopTabs.Screen
                initialParams={{
                    emptyMessage: translate('messages.courses.notAdded'),
                    filter: coursesFilters.ALL,
                    title: translate('screens.courses.titles.allMyCourses')
                }}
                name="index"
                options={{ title: translate('topTabs.courses.all') }}
            />

            <TopTabs.Screen
                initialParams={{
                    emptyMessage: translate('messages.courses.noActiveCourses'),
                    filter: coursesFilters.ACTIVE,
                    title: translate('screens.courses.titles.activeCourses')
                }}
                name="active"
                options={{ title: translate('topTabs.courses.active') }}
            />

            <TopTabs.Screen
                initialParams={{
                    emptyMessage: translate('messages.courses.noSuspendedCourses'),
                    filter: coursesFilters.SUSPENDED,
                    title: translate('screens.courses.titles.suspendedCourses')
                }}
                name="suspended"
                options={{ title: translate('topTabs.courses.suspended') }}
            />

            <TopTabs.Screen
                initialParams={{
                    emptyMessage: translate('messages.courses.noFinishedCourses'),
                    filter: coursesFilters.FINISHED,
                    title: translate('screens.courses.titles.finishedCourses')
                }}
                name="finished"
                options={{ title: translate('topTabs.courses.finished') }}
            />
        </TopTabs>
    );
}