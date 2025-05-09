import { Stack } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

import { Header } from '@ui/components';

import { useTranslation } from '@ui/hooks';

export default function SettingsLayout(): JSX.Element {
    const { theme: { colors } } = useStyles();
    const { translate } = useTranslation();

    return (
        <Stack
            screenOptions={{
                animation: 'ios_from_right',
                contentStyle: { backgroundColor: colors.background },
                header: ({ options }) => (
                    <Header
                        backButtonColor={ colors.icon }
                        showBackButton
                        showTitle
                        title={ options.title }
                    />
                ),
                headerShadowVisible: false
            }}
        >
            <Stack.Screen
                name="index"
                options={{ title: 'JW Reports' }}
            />

            <Stack.Screen
                name="profile"
                options={{ title: translate('navigation.titles.profile') }}
            />

            <Stack.Screen
                name="credentials"
                options={{ title: translate('navigation.titles.credentials') }}
            />

            <Stack.Screen
                name="export-data"
                options={{ title: translate('navigation.titles.exportInfo') }}
            />

            <Stack.Screen
                name="feedback"
                options={{ title: translate('navigation.titles.feedback') }}
            />

            <Stack.Screen
                name="report-errors"
                options={{ title: translate('navigation.titles.reportAnError') }}
            />
        </Stack>
    );
}