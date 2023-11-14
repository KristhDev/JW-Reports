import React from 'react';
import { useWindowDimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

/* Screens */
import { Courses } from '../../screens/courses';

/* Hooks */
import { useTheme } from '../../hooks';

/* Interfaces */
import { CoursesTopTabsParamsList } from '../../interfaces';

const Tabs = createMaterialTopTabNavigator<CoursesTopTabsParamsList>();

/**
 * This is a top taps navigation for the courses.
 *
 * @return {JSX.Element} The top taps navigation for the courses.
 */
const CoursesTopTabsNavigation = (): JSX.Element => {
    const { width } = useWindowDimensions();
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
                    tabBarInactiveTintColor: colors.headerText,
                    tabBarIndicatorStyle: {
                        backgroundColor: colors.button,
                        height: 3
                    },
                    tabBarItemStyle: {
                        width: width / 3
                    },
                    tabBarLabelStyle: {
                        fontWeight: (isFocused()) ? 'bold' : 'normal'
                    },
                    tabBarPressColor: pressColor,
                    tabBarScrollEnabled: true,
                    tabBarStyle: {
                        backgroundColor: colors.contentHeader,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.header
                    },
                }
            } }
        >
            <Tabs.Screen
                component={ Courses }
                initialParams={{
                    emptyMessage: 'No has agregado ningún curso.',
                    filter: 'all',
                    title: 'TODOS MIS CURSOS',
                }}
                name="CoursesScreen"
                options={{ title: 'Todos' }}
            />

            <Tabs.Screen
                component={ Courses }
                initialParams={{
                    emptyMessage: 'No tienes ningún curso activo.',
                    filter: 'active',
                    title: 'CURSOS ACTIVOS'
                }}
                name="ActiveCoursesScreen"
                options={{ title: 'Activos' }}
            />

            <Tabs.Screen
                component={ Courses }
                initialParams={{
                    emptyMessage: 'No tienes ningún curso suspendido.',
                    filter: 'suspended',
                    title: 'CURSOS SUSPENDIDOS'
                }}
                name="SuspendedCoursesScreen"
                options={{ title: 'Suspendidos' }}
            />

            <Tabs.Screen
                component={ Courses }
                initialParams={{
                    emptyMessage: 'Ninguno de tus estudiantes ha terminado el curso.',
                    filter: 'finished',
                    title: 'CURSOS TERMINADOS'
                }}
                name="FinishedCoursesScreen"
                options={{ title: 'Terminados' }}
            />
        </Tabs.Navigator>
    );
}

export default CoursesTopTabsNavigation;