import React, { JSX } from 'react';
import { Href, Stack, useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

import { Header, HeaderButtons } from '@ui/components';

import { useCourses } from '@courses/hooks';
import { useLessons } from '@lessons/hooks';
import { useTranslation } from '@ui/hooks';

export default function LessonsStackLayout(): JSX.Element {
    const router = useRouter();
    const { theme: { colors } } = useStyles();

    const { state: { selectedCourse } } = useCourses();
    const { state: { selectedLesson } } = useLessons();
    const { translate } = useTranslation();

    const addOrEditLessonTitleNavigation = translate('navigation.titles.lesson', {
        action: (selectedLesson.id !== '')
            ? translate('forms.actions.edit')
            : translate('forms.actions.add')
    });

    const lessonDetailSubtitleNavigation = translate('navigation.titles.courseTo', {
        name: selectedCourse.personName
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
                name="index"
                options={{
                    header: ({ options }) => (
                        <Header
                            showBackButton
                            showTitle
                            title={ options.title }
                            subtitle={ lessonDetailSubtitleNavigation }
                        />
                    ),
                    title: translate('navigation.titles.lessons')
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
                                deleteButton={ selectedLesson.id !== '' }
                                onPressDeleteButton={ () => handleGoTo('/(app)/(tabs)/courses/lessons/delete-lesson-modal') }
                            />
                        </Header>
                    ),
                    title: addOrEditLessonTitleNavigation
                }}
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
                            subtitle={ lessonDetailSubtitleNavigation }
                        >
                            <HeaderButtons
                                deleteButton={ true }
                                onPressDeleteButton={ () => handleGoTo('/(app)/(tabs)/courses/lessons/delete-lesson-modal') }

                                editButton={ !selectedCourse.finished || !selectedCourse.suspended }
                                onPressEditButton={ () => handleGoTo('/(app)/(tabs)/courses/lessons/add-or-edit') }
                            />
                        </Header>
                    ),
                    title: translate('navigation.titles.courseLesson'),
                }}
            />

            <Stack.Screen 
                name="delete-lesson-modal"
                options={{
                    animation: 'fade',
                    contentStyle: { backgroundColor: 'transparent' },
                    headerShown: false,
                    presentation: 'transparentModal'
                }}
            />

            <Stack.Screen 
                name="finish-or-start-lesson-modal"
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