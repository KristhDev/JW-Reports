import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { INIT_LESSON } from '../../../features/courses';

import { FinishOrStartLessonModal } from '../../../screens/courses';
import { DeleteModal } from '../../../screens/ui';

import { LessonCard } from '../LessonCard';
import { ListEmptyComponent } from './ListEmptyComponent';
import { ListFooterComponent } from './ListFooterComponent';
import { SearchInput, Title } from '../../ui';

import { useCourses } from '../../../hooks';

import { Lesson } from '../../../interfaces/courses';

export const LessonsList = () => {
    const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);
    const [ showFSModal, setShowFSModal ] = useState<boolean>(false);

    const { addListener, getState, removeListener } = useNavigation();

    const {
        state: {
            hasMoreLessons,
            isLessonDeleting,
            isLessonsLoading,
            lessons,
            selectedCourse,
        },
        deleteLesson,
        removeLessons,
        setLessonsPagination,
        setSelectedLesson,
        loadLessons,
    } = useCourses();

    const handleRefreshing = () => {
        setLessonsPagination({ from: 0, to: 9 });
        removeLessons();
        loadLessons(true);
        setIsRefreshing(false);
    }

    const handleEndReach = () => {
        if (!hasMoreLessons || isLessonsLoading) return;
        loadLessons(false, true);
    }

    const handleShowModal = (lesson: Lesson, setShowModal: (value: boolean) => void) => {
        setSelectedLesson(lesson);
        setShowModal(true);
    }

    const handleHideModal = (setShowModal: (value: boolean) => void) => {
        setShowModal(false);
        setSelectedLesson({
            ...INIT_LESSON,
            next_lesson: new Date().toString()
        });
    }

    const handleDeleteConfirm = () => {
        deleteLesson(false, () => setShowDeleteModal(false));
    }

    useEffect(() => {
        addListener('blur', () => {
            const { index } = getState();

            if (index !== 2 && index !== 3) {
                setLessonsPagination({ from: 0, to: 9 });
                removeLessons();
            }
        });

        return () => {
            removeListener('blur', () => {});
        }
    }, []);

    return (
        <>
            <FlatList
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 100, flexGrow: 1 }}
                data={ lessons }
                keyExtractor={ (item) => item.id }
                ListFooterComponent={ ListFooterComponent }
                ListHeaderComponent={
                    <>
                        <Title
                            containerStyle={{ paddingVertical: 30 }}
                            text={ `Clases del curso con ${ selectedCourse.person_name }` }
                            textStyle={{ fontSize: 24 }}
                        />

                        <SearchInput
                            onClean={ () => {} }
                            onSearch={ (text) => console.log(text) }
                            searchTerm=""
                        />
                    </>
                }
                ListEmptyComponent={ <ListEmptyComponent msg="No haz agregado clases a este curso." /> }
                ListHeaderComponentStyle={{ alignSelf: 'flex-start' }}
                onEndReached={ handleEndReach }
                onEndReachedThreshold={ 0.5 }
                onRefresh={ handleRefreshing }
                overScrollMode="never"
                refreshing={ isRefreshing }
                renderItem={ ({ item }) => (
                    <LessonCard
                        lesson={ item }
                        onDelete={ () => handleShowModal(item, setShowDeleteModal) }
                        onFinish={ () => handleShowModal(item, setShowFSModal) }
                    />
                ) }
            />

            <FinishOrStartLessonModal
                isOpen={ showFSModal }
                onClose={ () => handleHideModal(setShowFSModal) }
            />

            <DeleteModal
                isLoading={ isLessonDeleting }
                isOpen={ showDeleteModal }
                onClose={ () => handleHideModal(setShowDeleteModal) }
                onConfirm={ handleDeleteConfirm }
                text="¿Estás seguro de eliminar está clase?"
            />
        </>
    );
}