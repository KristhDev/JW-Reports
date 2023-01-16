import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Courses } from '../../screens/courses';

import { useTheme } from '../../hooks';

import { CoursesTopTabsParamsList } from '../../interfaces/courses';

const Tabs = createMaterialTopTabNavigator<CoursesTopTabsParamsList>();

const CoursesTopTabsNavigation = () => {
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
                component={ Courses }
                initialParams={{
                    emptyMessage: 'No haz agregado ningún curso.',
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
                options={{ title: 'En Curso' }}
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
        </Tabs.Navigator>
    );
}

export default CoursesTopTabsNavigation;