import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { Courses } from '../screens/courses';

import { useTheme } from '../hooks';

import { CoursesStackParamsList } from '../interfaces/courses';

const Stack = createStackNavigator<CoursesStackParamsList>();

const CoursesStackNavigation = () => {
    const { state: { colors } } = useTheme();

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
                component={ Courses }
                name="CoursesScreen"
                options={{ title: 'Cursos' }}
            />
        </Stack.Navigator>
    );
}

export default CoursesStackNavigation;