import React, { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { INIT_COURSE } from '../../../features/courses';

import { ActiveOrSuspendCourseModal, FinishOrStartCourseModal } from '../../../screens/courses';
import { DeleteModal } from '../../../screens/ui';

import { CourseCard } from '../CourseCard';
import { ListEmptyComponent } from './ListEmptyComponent';
import { ListFooterComponent } from './ListFooterComponent';
import { Title } from '../../ui';

import { useCourses } from '../../../hooks';

import { CoursesListProps } from './interfaces';
import { Course } from '../../../interfaces/courses';

import { styles as themeStyles } from '../../../theme';

export const CoursesList: FC<CoursesListProps> = ({ filter, title, emptyMessage }) => {
    const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);
    const [ showASModal, setShowASModal ] = useState<boolean>(false);
    const [ showFSModal, setShowFSModal ] = useState<boolean>(false);

    const { getState, isFocused } = useNavigation();
    const { index, routeNames } = getState();

    const {
        state: {
            hasMoreCourses,
            isCourseDeleting,
            isCoursesLoading,
            refreshCourses,
            courses,
            coursesScreenHistory
        },
        deleteCourse,
        removeCourses,
        setRefreshCourses,
        setCoursesPagination,
        setSelectedCourse,
        loadCourses,
    } = useCourses();

    const handleRefreshing = () => {
        setCoursesPagination({ from: 0, to: 9 });
        removeCourses();
        loadCourses(filter, true);
        setIsRefreshing(false);
    }

    const handleEndReach = () => {
        if (!hasMoreCourses || isCoursesLoading) return;
        loadCourses(filter, false, true);
    }

    const handleShowModal = (course: Course, setShowModal: (value: boolean) => void) => {
        setSelectedCourse(course);
        setShowModal(true);
    }

    const handleHideModal = (setShowModal: (value: boolean) => void) => {
        setShowModal(false);
        setSelectedCourse(INIT_COURSE);
    }

    const handleDeleteConfirm = () => {
        deleteCourse(false, () => setShowDeleteModal(false));
    }

    useEffect(() => {
        if (isFocused()) {
            const prevLast = coursesScreenHistory[coursesScreenHistory.length - 2];
            const last = routeNames[index];

            setRefreshCourses(prevLast !== last);
        }
    }, [ coursesScreenHistory ]);

    useEffect(() => {
        if (isFocused() && refreshCourses) {
            removeCourses();
            loadCourses(filter, true);
        }
    }, [ refreshCourses, index ]);

    return (
        <>
            <FlatList
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 100, flexGrow: 1 }}
                data={ courses }
                keyExtractor={ (item) => item.id }
                ListFooterComponent={ ListFooterComponent }
                ListHeaderComponent={
                    <Title
                        containerStyle={ themeStyles.titleContainerSpacingVertical }
                        text={ title }
                        textStyle={{ fontSize: 24 }}
                    />
                }
                ListEmptyComponent={ <ListEmptyComponent msg={ emptyMessage } /> }
                ListHeaderComponentStyle={{ alignSelf: 'flex-start' }}
                onEndReached={ handleEndReach }
                onEndReachedThreshold={ 0.5 }
                onRefresh={ handleRefreshing }
                overScrollMode="never"
                refreshing={ isRefreshing }
                renderItem={ ({ item }) => (
                    <CourseCard
                        course={ item }
                        onActiveOrSuspend={ () => handleShowModal(item, setShowASModal) }
                        onDelete={ () => handleShowModal(item, setShowDeleteModal) }
                        onFinishOrStart={ () => handleShowModal(item, setShowFSModal) }
                    />
                ) }
            />

            <ActiveOrSuspendCourseModal
                isOpen={ showASModal }
                onClose={ () => handleHideModal(setShowASModal) }
            />

            <FinishOrStartCourseModal
                isOpen={ showFSModal }
                onClose={ () => handleHideModal(setShowFSModal) }
            />

            <DeleteModal
                isLoading={ isCourseDeleting }
                isOpen={ showDeleteModal }
                onClose={ () => handleHideModal(setShowDeleteModal) }
                onConfirm={ handleDeleteConfirm }
                text="¿Estás seguro de eliminar este curso?"
            />
        </>
    );
}