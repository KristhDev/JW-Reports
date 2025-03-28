import { useEffect } from 'react';
import { useStyles } from 'react-native-unistyles';
import { Stack } from 'expo-router';

import { useAuth } from '@auth/hooks';
import { useCourses } from '@courses/hooks';
import { useNetwork } from '@shared/hooks';

export default function PreachingLayout(): JSX.Element {
    const { theme: { colors } } = useStyles();

    const { state: { isAuthenticated } } = useAuth();
    const { loadCourses } = useCourses();
    const { wifi } = useNetwork();

    useEffect(() => {
        if (wifi.hasConnection || isAuthenticated) loadCourses({ filter: 'all' });
    }, []);

    return (
        <Stack
            screenOptions={{
                contentStyle: { backgroundColor: colors.background },
                headerShown: false,
            }}
        >
            <Stack.Screen name="precursor" />
            <Stack.Screen name="publisher" />
        </Stack>
    );
}