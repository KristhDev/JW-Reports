import React, { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import { RevisitModal } from '../../../screens/revisits';
// import { DeleteModal } from '../../../screens/ui';

import { ListEmptyComponent } from './ListEmptyComponent';
import { ListFooterComponent } from './ListFooterComponent';
// import { RevisitCard } from '../RevisitCard';
import { Title } from '../../ui';

import { useCourses } from '../../../hooks';

import { CoursesListProps } from './interfaces';
// import { Course } from '../../../interfaces/courses';

import themeStyles from '../../../theme/styles';

export const CoursesList: FC<CoursesListProps> = ({ filter, title, emptyMessage }) => {
    const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);
    // const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);
    // const [ showRevisitModal, setShowRevisitModal ] = useState<boolean>(false);

    const { getState, isFocused } = useNavigation();
    const { index, routeNames } = getState();

    const {
        state: {
            hasMoreCourses,
            // isRevisitDeleting,
            isCoursesLoading,
            refreshCourses,
            courses,
            coursesScreenHistory
        },
        // deleteRevisit,
        removeCourses,
        setRefreshCourses,
        setCoursesPagination,
        // setSelectedRevisit,
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

    // const handleShowModal = (revisit: Revisit, setShowModal: (value: boolean) => void) => {
    //     setSelectedRevisit(revisit);
    //     setShowModal(true);
    // }

    // const handleHideModal = (setShowModal: (value: boolean) => void) => {
    //     setShowModal(false);
    //     setSelectedRevisit({
    //         id: '',
    //         user_id: '',
    //         person_name: '',
    //         about: '',
    //         address: '',
    //         next_visit: new Date().toString(),
    //         done: false,
    //         created_at: new Date().toString(),
    //         updated_at: new Date().toString()
    //     });
    // }

    // const handleDeleteConfirm = () => {
    //     deleteRevisit(false, () => setShowDeleteModal(false));
    // }

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
                    // <RevisitCard
                    //     revisit={ item }
                    //     onDelete={ () => handleShowModal(item, setShowDeleteModal) }
                    //     onRevisit={ () => handleShowModal(item, setShowRevisitModal) }
                    // />
                    <></>
                ) }
            />

            {/* <RevisitModal
                isOpen={ showRevisitModal }
                onClose={ () => handleHideModal(setShowRevisitModal) }
            />

            <DeleteModal
                isLoading={ isRevisitDeleting }
                isOpen={ showDeleteModal }
                onClose={ () => handleHideModal(setShowDeleteModal) }
                onConfirm={ handleDeleteConfirm }
                text="¿Estás seguro de eliminar está revisita?"
            /> */}
        </>
    );
}