import React, { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { INIT_COURSE } from '../../../features/courses';

import { ActiveOrSuspendCourseModal, FinishOrStartCourseModal } from '../../../screens/courses';
import { DeleteModal } from '../../../screens/ui';

import { CourseCard } from '../CourseCard';
import { ListEmptyComponent } from './ListEmptyComponent';
import { ListFooterComponent } from './ListFooterComponent';
import { SearchInput, Title } from '../../ui';

import { useCourses } from '../../../hooks';

import { CoursesListProps } from './interfaces';
import { Course } from '../../../interfaces/courses';

export const CoursesList: FC<CoursesListProps> = ({ filter, title, emptyMessage }) => {
    const [ searchTerm, setSearchTerm ] = useState<string>('');
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
        setSearchTerm('');
        setCoursesPagination({ from: 0, to: 9 });
        removeCourses();
        loadCourses({ filter, refresh: true });
    }

    const handleEndReach = () => {
        if (!hasMoreCourses || isCoursesLoading) return;
        loadCourses({ filter, search: searchTerm, loadMore: true });
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
        if (isRefreshing) setIsRefreshing(false);
    }, [ isRefreshing ]);

    useEffect(() => {
        if (searchTerm.trim().length > 0) {
            setCoursesPagination({ from: 0, to: 9 });
            removeCourses();
            loadCourses({ filter, search: searchTerm, refresh: true });
            setIsRefreshing(false);
        }
    }, [ searchTerm ]);

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
            loadCourses({ filter, search: searchTerm, refresh: true });
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
                    <>
                        <Title
                            containerStyle={{ paddingTop: 30, paddingBottom: 20 }}
                            text={ title }
                            textStyle={{ fontSize: 24 }}
                        />

                        <SearchInput
                            onClean={ handleRefreshing }
                            onSearch={ setSearchTerm }
                            refreshing={ isRefreshing }
                            searchTerm={ searchTerm }
                        />
                    </>
                }
                ListEmptyComponent={
                    <ListEmptyComponent
                        msg={
                            (searchTerm.trim().length > 0)
                                ? `No se encontraron cursos con la busqueda: ${ searchTerm.trim() }`
                                : emptyMessage
                        }
                    />
                }
                ListHeaderComponentStyle={{ alignSelf: 'flex-start' }}
                onEndReached={ handleEndReach }
                onEndReachedThreshold={ 0.5 }
                onRefresh={ () => {
                    handleRefreshing();
                    setIsRefreshing(true);
                } }
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
                text="¿Está seguro de eliminar este curso?"
            />
        </>
    );
}