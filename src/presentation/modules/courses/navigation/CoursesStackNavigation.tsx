import React, { useState } from 'react';
import { useStyles } from 'react-native-unistyles';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

/* Navigation */
import CoursesTopTabsNavigation from './CoursesTopTabsNavigation';

/* Screens */
import { AddOrEditCourse, CourseDetail } from '../screens';
import { AddOrEditLesson, LessonDetail, Lessons, useLessons } from '@lessons';

/* Components */
import { BackButton, HeaderButtons } from '@ui';

/* Hooks */
import { useCourses } from '../hooks';

/* Interfaces */
import { CoursesStackParamsList } from '../interfaces';

/* Utils */
import { Characters } from '@utils';

const Stack = createStackNavigator<CoursesStackParamsList>();

/**
 * This is a stack navigation for the courses.
 *
 * @return {JSX.Element} rendered component to show the list of courses
 */
const CoursesStackNavigation = (): JSX.Element => {
    const [ showDeleteCourseModal, setShowDeleteCourseModal ] = useState<boolean>(false);
    const [ showDeleteLessonModal, setShowDeleteLessonModal ] = useState<boolean>(false);

    const navigation = useNavigation();
    const { theme: { colors, margins } } = useStyles();

    const { state: { isCourseDeleting, selectedCourse }, deleteCourse } = useCourses();
    const { state: { selectedLesson, isLessonDeleting }, deleteLesson } = useLessons();

    const courseDetailTitle = `Curso a ${ selectedCourse.personName }`;

    /**
     * Handles the deletion of a course by calling the deleteCourse function with a boolean value of
     * false, and then hides the delete modal by calling setShowDeleteCourseModal with a boolean value
     * of false.
     *
     * @param {Function} [onSuccess] - Optional callback to execute upon successful deletion.
     * @return {void} This function does not return anything.
     */
    const handleDeleteCourse = (onSuccess?: () => void): void => {
        deleteCourse({
            onFinish: () => setShowDeleteCourseModal(false),
            onSuccess
        });
    }

    /**
     * When the user clicks the delete button, show the delete modal, and when the user clicks the
     * delete button in the modal, delete the lesson.
     *
     * @return {void} This function does not return anything
     */
    const handleDeleteLesson = (onSuccess?: () => void): void => {
        deleteLesson({
            onFinish: () => setShowDeleteLessonModal(false),
            onSuccess
        });
    }

    /**
     * Navigates to the given screen inside the CoursesStackNavigation stack.
     *
     * @param {string} screen - The name of the screen to navigate to.
     * @return {void} This function does not return anything.
     */
    const handleGoTo = (screen: string): void => {
        navigation.navigate({
            name: 'CoursesStackNavigation',
            params: { screen }
        } as never);
    }

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                cardStyle: {
                    backgroundColor: colors.contentHeader,
                },
                headerStyle: {
                    backgroundColor: colors.header
                },
                headerTintColor: colors.headerText,
                headerShadowVisible: false
            }}
        >
            <Stack.Screen
                component={ CoursesTopTabsNavigation }
                name="CoursesTopTabsNavigation"
                options={{ title: 'Cursos' }}
            />

            <Stack.Screen
                component={ CourseDetail }
                name="CourseDetailScreen"
                options={{
                    headerTitleStyle: { marginLeft: -margins.xs },
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ true }
                            deleteModalText="¿Está seguro de eliminar este curso?"
                            isDeleteModalLoading={ isCourseDeleting }
                            onCloseDeleteModal={ () => setShowDeleteCourseModal(false) }
                            onConfirmDeleteModal={ () => handleDeleteCourse(() => handleGoTo('CoursesTopTabsNavigation')) }
                            onShowDeleteModal={ () => setShowDeleteCourseModal(true) }
                            showDeleteModal={ showDeleteCourseModal }

                            editButton={ !selectedCourse.finished }
                            onPressEditButton={ () => handleGoTo('AddOrEditCourseScreen') }
                        />
                    ),
                    title: Characters.truncate(courseDetailTitle, 22)
                }}
            />

            <Stack.Screen
                component={ AddOrEditCourse }
                name="AddOrEditCourseScreen"
                options={{
                    headerTitleStyle: { marginLeft: -margins.xs },
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ selectedCourse.id !== '' }
                            deleteModalText="¿Está seguro de eliminar este curso?"
                            isDeleteModalLoading={ isCourseDeleting }
                            onCloseDeleteModal={ () => setShowDeleteCourseModal(false) }
                            onConfirmDeleteModal={ () => handleDeleteCourse(() => handleGoTo('CoursesTopTabsNavigation')) }
                            onShowDeleteModal={ () => setShowDeleteCourseModal(true) }
                            showDeleteModal={ showDeleteCourseModal }
                        />
                    ),
                    title: `${ selectedCourse.id !== '' ? 'Editar' : 'Agregar' } curso`
                }}
            />

            <Stack.Screen
                component={ AddOrEditLesson }
                name="AddOrEditLessonScreen"
                options={{
                    headerTitleStyle: { marginLeft: -margins.xs },
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ selectedLesson.id !== '' }
                            deleteModalText="¿Está seguro de eliminar esta clase?"
                            isDeleteModalLoading={ isLessonDeleting }
                            onCloseDeleteModal={ () => setShowDeleteLessonModal(false) }
                            onConfirmDeleteModal={ () => handleDeleteLesson(() => handleGoTo('LessonsScreen')) }
                            onShowDeleteModal={ () => setShowDeleteLessonModal(true) }
                            showDeleteModal={ showDeleteLessonModal }
                        />
                    ),
                    title: `${ selectedLesson.id !== '' ? 'Editar' : 'Agregar' } clase`
                }}
            />

            <Stack.Screen
                component={ Lessons }
                name="LessonsScreen"
                options={{
                    headerTitleStyle: { marginLeft: -margins.xs },
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    title: 'Clases'
                }}
            />

            <Stack.Screen
                component={ LessonDetail }
                name="LessonDetailScreen"
                options={{
                    headerTitleStyle: { marginLeft: -margins.xs },
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ true }
                            deleteModalText="¿Está seguro de eliminar esta clase?"
                            isDeleteModalLoading={ isLessonDeleting }
                            onCloseDeleteModal={ () => setShowDeleteLessonModal(false) }
                            onConfirmDeleteModal={ () => handleDeleteLesson(() => handleGoTo('LessonsScreen')) }
                            onShowDeleteModal={ () => setShowDeleteLessonModal(true) }
                            showDeleteModal={ showDeleteLessonModal }

                            editButton={ !selectedCourse.finished || !selectedCourse.suspended }
                            onPressEditButton={ () => handleGoTo('AddOrEditLessonScreen') }
                        />
                    ),
                    title: `Clase con ${ selectedCourse.personName }`
                }}
            />
        </Stack.Navigator>
    );
}

export default CoursesStackNavigation;