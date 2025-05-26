import { Href, Stack, useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Components */
import { Header, HeaderButtons } from '@ui/components';

/* Hooks */
import { useCourses } from '@courses/hooks';
import { useTranslation } from '@ui/hooks';

export default function CoursesLayout(): JSX.Element {
    const router = useRouter();
    const { theme: { colors } } = useStyles();

    const { state: { selectedCourse } } = useCourses();

    const { translate } = useTranslation();

    const courseDetailTitle = translate('navigation.titles.courseTo', {
        name: selectedCourse.personName
    });

    const addOrEditCourseTitleNavigation = translate('navigation.titles.course', {
        action: (selectedCourse.id !== '')
            ? translate('forms.actions.edit')
            : translate('forms.actions.add')
    });

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
                options={{ title: translate('navigation.titles.courses') }}
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
                                onPressDeleteButton={ () => handleGoTo('/(app)/(tabs)/courses/delete-course-modal') }

                                editButton={ !selectedCourse.finished }
                                onPressEditButton={ () => handleGoTo('/(app)/(tabs)/courses/add-or-edit') }
                            />
                        </Header>
                    ),
                    title: courseDetailTitle
                }}
            />

            <Stack.Screen
                name="lessons"
                options={{ headerShown: false }}
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
                                deleteButton={ selectedCourse.id !== '' }
                                onPressDeleteButton={ () => handleGoTo('/(app)/(tabs)/courses/delete-course-modal') }
                            />
                        </Header>
                    ),
                    title: addOrEditCourseTitleNavigation
                }}
            />

            <Stack.Screen 
                name="active-or-suspend-course-modal"
                options={{
                    animation: 'fade',
                    contentStyle: { backgroundColor: 'transparent' },
                    headerShown: false,
                    presentation: 'transparentModal'
                }}
            />

            <Stack.Screen 
                name="delete-course-modal"
                options={{
                    animation: 'fade',
                    contentStyle: { backgroundColor: 'transparent' },
                    headerShown: false,
                    presentation: 'transparentModal'
                }}
            />

            <Stack.Screen 
                name="finish-or-start-course-modal"
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