import React, { useState } from 'react';
import { useStyles } from 'react-native-unistyles';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

/* Navigation */
import CoursesTopTabsNavigation from './CoursesTopTabsNavigation';

/* Screens */
import { AddOrEditCourse, AddOrEditLesson, CourseDetail, LessonDetail, Lessons } from '../screens';

/* Components */
import { BackButton, HeaderButtons } from '../../ui';

/* Hooks */
import { useCourses } from '../hooks';

/* Interfaces */
import { CoursesStackParamsList } from '../interfaces';

const Stack = createStackNavigator<CoursesStackParamsList>();

/**
 * This is a stack navigation for the courses.
 *
 * @return {JSX.Element} rendered component to show the list of courses
 */
const CoursesStackNavigation = (): JSX.Element => {
    const [ showDeleteCourseModal, setShowDeleteCourseModal ] = useState<boolean>(false);
    const [ showDeleteLessonModal, setShowDeleteLessonModal ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const {
        state: {
            isCourseDeleting,
            selectedCourse,
            selectedLesson,
            isLessonDeleting
        },
        deleteCourse,
        deleteLesson
    } = useCourses();

    const { theme: { colors, margins } } = useStyles();

    const courseDetailTitle = `Curso a ${ selectedCourse.personName }`;

    /**
     * When the user clicks the delete button, the deleteCourse function is called, which sets the
     * showDeleteCourseModal state to false.
     *
     * @return {void} This function does not return anything
     */
    const handleDeleteCourse = (): void => {
        deleteCourse(true, () => setShowDeleteCourseModal(false));
    }

    /**
     * When the user clicks the delete button, show the delete modal, and when the user clicks the
     * delete button in the modal, delete the lesson.
     *
     * @return {void} This function does not return anything
     */
    const handleDeleteLesson = (): void => {
        deleteLesson(true, () => setShowDeleteLessonModal(false));
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
                            onConfirmDeleteModal={ handleDeleteCourse }
                            onShowDeleteModal={ () => setShowDeleteCourseModal(true) }
                            showDeleteModal={ showDeleteCourseModal }

                            editButton={ !selectedCourse.finished }
                            onPressEditButton={ () => navigate('AddOrEditCourseScreen' as never) }
                        />
                    ),
                    title: (courseDetailTitle.length >= 22) ? courseDetailTitle.slice(0, 22) + '...' : courseDetailTitle,
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
                            onConfirmDeleteModal={ handleDeleteCourse }
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
                            onConfirmDeleteModal={ handleDeleteLesson }
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
                            onConfirmDeleteModal={ handleDeleteLesson }
                            onShowDeleteModal={ () => setShowDeleteLessonModal(true) }
                            showDeleteModal={ showDeleteLessonModal }

                            editButton={ !selectedCourse.finished || !selectedCourse.suspended }
                            onPressEditButton={ () => navigate('AddOrEditLessonScreen' as never) }
                        />
                    ),
                    title: `Clase con ${ selectedCourse.personName }`
                }}
            />
        </Stack.Navigator>
    );
}

export default CoursesStackNavigation;