import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { Courses } from '../screens/courses';

import { useTheme } from '../hooks';

const Stack = createStackNavigator();

const CoursesNavigation = () => {
    const { state: { colors } } = useTheme();

    const CoursesScreen = () => <Courses />;

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
                component={ CoursesScreen }
                name="CoursesScreen"
                options={{ title: 'Cursos' }}
            />
        </Stack.Navigator>
    );
}

export default CoursesNavigation;