import React from 'react';
import { Redirect } from 'expo-router';

import { useAuth } from '@auth';

export default function MainScreen() {
    const { state: { isAuthenticated } } = useAuth();

    if (isAuthenticated) return <Redirect href="/(app)/(tabs)/preaching" />;
    else return <Redirect href="/auth/login" />;
}