import { Stack } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

import { Header } from '@ui';

export default function SettingsLayout(): JSX.Element {
    const { theme: { colors } } = useStyles();

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
                options={{ title: 'Perfil' }}
            />

            <Stack.Screen
                name="credentials"
                options={{ title: 'Credenciales' }}
            />

            <Stack.Screen
                name="export-data"
                options={{ title: 'Exportar Información' }}
            />

            <Stack.Screen
                name="feedback"
                options={{ title: 'Sugerencias' }}
            />

            <Stack.Screen
                name="report-errors"
                options={{ title: 'Reportar Error' }}
            />
        </Stack>
    );
}