import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { Search } from '../screens/ui';

import { useTheme } from '../hooks';

const Stack = createStackNavigator();

const SearchNavigation = () => {
    const { state: { colors } } = useTheme();

    const SearchScreen = () => <Search />;

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
                component={ SearchScreen }
                name="SearchScreen"
                options={{
                    title: 'Buscar'
                }}
            />
        </Stack.Navigator>
    );
}

export default SearchNavigation;