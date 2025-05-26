import { Href, Stack, useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { Header, HeaderButtons } from '@ui/components';

/* Hooks */
import { useRevisits } from '@revisits/hooks';
import { useTranslation } from '@ui/hooks';

export default function RevisitsLayout(): JSX.Element {
    const router = useRouter();
    const { theme: { colors } } = useStyles();

    const { state: { selectedRevisit } } = useRevisits();
    const { translate } = useTranslation();

    const addOrEditRevisitTitleNavigation = translate('navigation.titles.revisit', {
        action: (selectedRevisit.id !== '')
            ? translate('forms.actions.edit')
            : translate('forms.actions.add')
    });

    const revisitDetailTitle = translate('navigation.titles.revisitTo', { name: selectedRevisit.personName });

    /**
     * Navigate to the route specified by the href parameter.
     *
     * @param {Href} href - The route to navigate to.
     *
     * @return {void} This function does not return anything
     */
    const handleGoTo = (href: Href): void => {
        router.navigate(href);
    }

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
                name="(top-tabs)"
                options={{ title: translate('navigation.titles.revisits') }}
            />

            <Stack.Screen
                name="detail"
                options={{
                    header: ({ options }) => (
                        <Header
                            showBackButton
                            showTitle
                            style={{ justifyContent: 'space-between' }}
                            title={ options.title }
                        >
                            <HeaderButtons
                                deleteButton={ true }
                                onPressDeleteButton={ () => handleGoTo('/(app)/(tabs)/revisits/delete-revisit-modal') }

                                editButton={ true }
                                onPressEditButton={ () => handleGoTo('/(app)/(tabs)/revisits/add-or-edit') }
                            />
                        </Header>
                    ),
                    title: revisitDetailTitle
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
                                deleteButton={ selectedRevisit.id !== '' }
                                onPressDeleteButton={ () => handleGoTo('/(app)/(tabs)/revisits/delete-revisit-modal') }

                                editButton={ false }
                            />
                        </Header>
                    ),
                    title: addOrEditRevisitTitleNavigation
                }}
            />

            <Stack.Screen 
                name="revisit-modal"
                options={{
                    animation: 'fade',
                    contentStyle: { backgroundColor: 'transparent' },
                    headerShown: false,
                    presentation: 'transparentModal'
                }}
            />

            <Stack.Screen 
                name="pass-to-course-modal"
                options={{
                    animation: 'fade',
                    contentStyle: { backgroundColor: 'transparent' },
                    headerShown: false,
                    presentation: 'transparentModal'
                }}
            />

            <Stack.Screen 
                name="delete-revisit-modal"
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