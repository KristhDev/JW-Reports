import React, { useState } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import CoursesTopTabsNavigation from './CoursesTopTabsNavigation';

import { AddOrEditCourse, AddOrEditLesson, CourseDetail, LessonDetail, Lessons } from '../../screens/courses';

import { BackButton, HeaderButtons } from '../../components/ui';

import { useCourses, useTheme } from '../../hooks';

import { CoursesStackParamsList } from '../../interfaces/courses';

const Stack = createStackNavigator<CoursesStackParamsList>();

const CoursesStackNavigation = () => {
    const [ showDeleteCourseModal, setShowDeleteCourseModal ] = useState<boolean>(false);
    const [ showDeleteLessonModal, setShowDeleteLessonModal ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { state: { isCourseDeleting, selectedCourse, selectedLesson, isLessonDeleting }, deleteCourse, deleteLesson } = useCourses();
    const { state: { colors } } = useTheme();

    const courseDetailTitle = `Curso a ${ selectedCourse.person_name }`;

    const handleDeleteCourse = () => {
        deleteCourse(true, () => setShowDeleteCourseModal(false));
    }

    const handleDeleteLesson = () => {
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
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ true }
                            deleteModalText="¿Estás seguro de eliminar este curso?"
                            isDeleteModalLoading={ isCourseDeleting }
                            onCloseDeleteModal={ () => setShowDeleteCourseModal(false) }
                            onConfirmDeleteModal={ handleDeleteCourse }
                            onShowDeleteModal={ () => setShowDeleteCourseModal(true) }
                            showDeleteModal={ showDeleteCourseModal }

                            editButton={ !selectedCourse.finished }
                            onPressEditButton={ () => navigate('AddOrEditCourseScreen' as never) }
                        />
                    ),
                    title: (courseDetailTitle.length >= 22) ? courseDetailTitle.slice(0, 22) + '...' : courseDetailTitle
                }}
            />

            <Stack.Screen
                component={ AddOrEditCourse }
                name="AddOrEditCourseScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ selectedCourse.id !== '' }
                            deleteModalText="¿Estás seguro de eliminar este curso?"
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
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ selectedLesson.id !== '' }
                            deleteModalText="¿Estás seguro de eliminar está clase?"
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
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    title: 'Clases'
                }}
            />

            <Stack.Screen
                component={ LessonDetail }
                name="LessonDetailScreen"
                options={{
                    headerLeft: ({ onPress }) => <BackButton onPress={ onPress } />,
                    headerRight: () => (
                        <HeaderButtons
                            deleteButton={ true }
                            deleteModalText="¿Estás seguro de eliminar está clase?"
                            isDeleteModalLoading={ isLessonDeleting }
                            onCloseDeleteModal={ () => setShowDeleteLessonModal(false) }
                            onConfirmDeleteModal={ handleDeleteLesson }
                            onShowDeleteModal={ () => setShowDeleteLessonModal(true) }
                            showDeleteModal={ showDeleteLessonModal }

                            editButton={ !selectedCourse.finished || !selectedLesson.done }
                            onPressEditButton={ () => navigate('AddOrEditLessonScreen' as never) }
                        />
                    ),
                    title: `Clase con ${ selectedCourse.person_name }`
                }}
            />
        </Stack.Navigator>
    );
}

export default CoursesStackNavigation;