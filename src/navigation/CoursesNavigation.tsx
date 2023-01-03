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
                headerShown: false
            }}
        >
            <Stack.Screen
                name="CoursesScreen"
                component={ CoursesScreen }
            />
        </Stack.Navigator>
    );
}

export default CoursesNavigation;