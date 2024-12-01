import { useEffect } from 'react';
import { useStyles } from 'react-native-unistyles';
import { Stack } from 'expo-router';

import { useCourses } from '@courses';
import { useNetwork } from '@shared';

export default function PreachingLayout(): JSX.Element {
    const { theme: { colors } } = useStyles();

    const { loadCourses } = useCourses();
    const { wifi } = useNetwork();

    useEffect(() => {
        if (wifi.hasConnection) loadCourses({ filter: 'all' });
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