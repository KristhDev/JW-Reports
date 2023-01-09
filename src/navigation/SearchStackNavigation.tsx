import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { Search } from '../screens/ui';

import { useTheme } from '../hooks';

const Stack = createStackNavigator();

const SearchStackNavigation = () => {
    const { state: { colors } } = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: {
                    backgroundColor: colors.background,
                },
                headerStyle: {
                    backgroundColor: colors.header
                },
                headerTintColor: colors.headerText,
                headerShadowVisible: false
            }}
        >
            <Stack.Screen
                component={ Search }
                name="SearchScreen"
                options={{
                    title: 'Buscar'
                }}
            />
        </Stack.Navigator>
    );
}

export default SearchStackNavigation;