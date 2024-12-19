import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useStyles } from 'react-native-unistyles';

/* Constants */
import { precursors } from '@application/constants';

/* Navigations */
import PublisherStackNavigation from './PublisherStackNavigation';
import PrecursorStackNavigation from './PrecursorStackNavigation';

/* Hooks */
import { useAuth } from '@auth';
import { useCourses } from '@courses';
import { useNetwork } from '@shared';

/* Interfaces */
import { PreachingStackParamsList } from '../interfaces';

const Stack = createStackNavigator<PreachingStackParamsList>();

/**
 * This is a stack navigation for preaching.
 *
 * @return {JSX.Element} rendered component to show stack navigation of preaching
 */
const PreachingStackNavigation = (): JSX.Element => {
    const { theme: { colors } } = useStyles();

    const { state: { user } } = useAuth();
    const { loadCourses } = useCourses();

    const { wifi } = useNetwork();

    /**
     * Effect to select default date and load courses.
     */
    useEffect(() => {
        if (wifi.hasConnection) loadCourses({ filter: 'all' });
    }, []);

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: colors.background,
                },
                headerShown: false
            }}
        >
            { (user.precursor === precursors.NINGUNO) ? (
                <Stack.Screen
                    component={ PublisherStackNavigation }
                    name="PublisherStackNavigation"
                />
            ) : (
                <Stack.Screen
                    component={ PrecursorStackNavigation }
                    name="PrecursorStackNavigation"
                />
            ) }
        </Stack.Navigator>
    );
}

export default PreachingStackNavigation;