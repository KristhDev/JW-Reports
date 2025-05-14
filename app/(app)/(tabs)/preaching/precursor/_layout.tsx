import { useEffect } from 'react';
import { Redirect, Stack, useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Config */
import { timeAdapter } from '@config/di';

/* Constants */
import { precursors } from '@application/constants/utils';

/* Components */
import { Header, HeaderButtons } from '@ui/components';

/* Hooks */
import { useAuth } from '@auth/hooks';
import { usePreaching } from '@preaching/hooks';
import { useNetwork, useStatus } from '@shared/hooks';
import { useTranslation } from '@ui/hooks';

export default function PrecursorLayout(): JSX.Element {
    const router = useRouter();
    const { theme: { colors } } = useStyles();

    const { state: { user } } = useAuth();

    const { state: { selectedDate, seletedPreaching }, loadPreachings, setSelectedDate } = usePreaching();
    const { setNetworkError } = useStatus();
    const { wifi } = useNetwork();
    const { translate } = useTranslation();

    const addOrEditPreachingTitle = translate('navigation.titles.preaching', {
        action: (seletedPreaching.id !== '')
            ? translate('forms.actions.edit')
            : translate('forms.actions.add')
    });

    useEffect(() => {
        setSelectedDate(new Date());
    }, []);

    /**
     * Effect to load preachings of the selected date.
     */
    useEffect(() => {
        if (!wifi.hasConnection) {
            setNetworkError();
            return;
        }

        loadPreachings(selectedDate);
    } ,[ selectedDate ]);

    if (user.precursor === precursors.NINGUNO) return (<Redirect href="/(app)/(tabs)/preaching/publisher" />);

    return (
        <Stack
            screenOptions={{
                animation: 'ios_from_right',
                contentStyle: { backgroundColor: colors.background },
                headerShadowVisible: false,
                headerStyle: { backgroundColor: colors.header },
                headerTintColor: colors.headerText
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    header: ({ options }) => (
                        <Header
                            showTitle
                            style={{ justifyContent: 'space-between' }}
                            title={ options.title }
                            subtitle={ timeAdapter.format(selectedDate, timeAdapter.formats.MONTH_AND_YEAR) }
                        >
                            <HeaderButtons
                                logoutButton
                                changeMonthButton
                                settingsButtons
                            />
                        </Header>
                    ),
                    title: translate('navigation.titles.home')
                }}
            />

            <Stack.Screen
                name="add-or-edit"
                options={{
                    header: ({ options }) => (
                        <Header
                            showBackButton
                            showTitle
                            style={{ justifyContent: 'space-between' }}
                            title={ options.title }
                        >
                            <HeaderButtons
                                deleteButton={ seletedPreaching.id !== '' }
                                onPressDeleteButton={ () => router.navigate('/(app)/(tabs)/preaching/precursor/delete-preaching-modal') }
                            />
                        </Header>
                    ),
                    title: addOrEditPreachingTitle
                }}
            />

            <Stack.Screen 
                name="delete-preaching-modal"
                options={{
                    animation: 'fade',
                    contentStyle: { backgroundColor: 'transparent' },
                    headerShown: false,
                    presentation: 'transparentModal'
                }}
            />
        </Stack>
    );
}