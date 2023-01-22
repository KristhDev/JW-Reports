import React, { useState } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import CoursesTopTabsNavigation from './CoursesTopTabsNavigation';

import { AddOrEditCourse, CourseDetail } from '../../screens/courses';

import { BackButton, HeaderButtons } from '../../components/ui';

import { useCourses, useTheme } from '../../hooks';

import { CoursesStackParamsList } from '../../interfaces/courses';

const Stack = createStackNavigator<CoursesStackParamsList>();

const CoursesStackNavigation = () => {
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);
    const { navigate } = useNavigation();

    const { state: { isCourseDeleting, selectedCourse }, deleteCourse } = useCourses();
    const { state: { colors } } = useTheme();

    const courseDetailTitle = `Curso a ${ selectedCourse.person_name }`;

    const handleDeleteConfirm = () => {
        deleteCourse(true, () => setShowDeleteModal(false));
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
                            onCloseDeleteModal={ () => setShowDeleteModal(false) }
                            onConfirmDeleteModal={ handleDeleteConfirm }
                            onShowDeleteModal={ () => setShowDeleteModal(true) }
                            showDeleteModal={ showDeleteModal }

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
                            onCloseDeleteModal={ () => setShowDeleteModal(false) }
                            onConfirmDeleteModal={ handleDeleteConfirm }
                            onShowDeleteModal={ () => setShowDeleteModal(true) }
                            showDeleteModal={ showDeleteModal }
                        />
                    ),
                    title: `${ selectedCourse.id !== '' ? 'Editar' : 'Agregar' } curso`
                }}
            />
        </Stack.Navigator>
    );
}

export default CoursesStackNavigation;