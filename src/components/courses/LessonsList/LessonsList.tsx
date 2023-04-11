import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

/* Features */
import { INIT_LESSON } from '../../../features/courses';

/* Screens */
import { FinishOrStartLessonModal } from '../../../screens/courses';
import { DeleteModal } from '../../../screens/ui';

/* Components */
import { LessonCard } from '../LessonCard';
import { ListEmptyComponent, ListFooterComponent, SearchInput, Title } from '../../ui';

/* Hooks */
import { useCourses } from '../../../hooks';

/* Interfaces */
import { Lesson } from '../../../interfaces/courses';

/**
 * This component is responsible for rendering a list of lessons
 * based on selectedCourse.
 */
export const LessonsList = () => {
    const [ searchTerm, setSearchTerm ] = useState<string>('');
    const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);
    const [ showFSModal, setShowFSModal ] = useState<boolean>(false);

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

    /**
     * When the user refreshes the page, reset the search term, reset the pagination, remove the
     * lessons from the state, and load the lessons again.
     */
    const handleRefreshing = () => {
        setSearchTerm('');
        setLessonsPagination({ from: 0, to: 9 });
        removeLessons();
        loadLessons({ refresh: true });
    }

    /**
     * If there are no more lessons to load, or if the lessons are currently loading, then return.
     * Otherwise, load more lessons.
     */
    const handleEndReach = () => {
        if (!hasMoreLessons || isLessonsLoading) return;
        loadLessons({ search: searchTerm, loadMore: true });
    }

    /**
     * HandleShowModal is a function that takes a lesson and a setShowModal function as parameters and
     * returns nothing.
     * @param {Lesson} lesson - Lesson - this is the lesson that was clicked on
     * @param setShowModal - (value: boolean) => void
     */
    const handleShowModal = (lesson: Lesson, setShowModal: (value: boolean) => void) => {
        setSelectedLesson(lesson);
        setShowModal(true);
    }

    /**
     * HandleHideModal is a function that takes a function as an argument and returns a function that
     * takes no arguments and returns nothing.
     * @param setShowModal - (value: boolean) => void
     */
    const handleHideModal = (setShowModal: (value: boolean) => void) => {
        setShowModal(false);
        setSelectedLesson({
            ...INIT_LESSON,
            next_lesson: new Date().toString()
        });
    }

    /**
     * If the user confirms the delete, then delete the lesson and close the modal.
     */
    const handleDeleteConfirm = () => {
        deleteLesson(false, () => setShowDeleteModal(false));
    }

    /**
     * Effect to set isRefreshing to false when it changes
     * and it is false
     */
    useEffect(() => {
        if (isRefreshing) setIsRefreshing(false);
    }, [ isRefreshing ]);

    /**
     * Effect to perform lesson search every time
     * searchText changes
     */
    useEffect(() => {
        if (searchTerm.trim().length > 0) {
            setLessonsPagination({ from: 0, to: 9 });
            removeLessons();
            loadLessons({ search: searchTerm, refresh: true });
            setIsRefreshing(false);
        }
        else if (searchTerm.trim().length === 0 && lessons.length === 0) {
            setLessonsPagination({ from: 0, to: 9 });
            removeLessons();
            loadLessons({ search: '', refresh: true });
            setIsRefreshing(false);
        }
    }, [ searchTerm ]);

    return (
        <>
            <FlatList
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 100, flexGrow: 1 }}
                data={ lessons }
                keyExtractor={ (item) => item.id }
                ListFooterComponent={
                    <ListFooterComponent
                        marginTopPlus={ lessons.length === 0 }
                        showLoader={ isLessonsLoading }
                    />
                }
                ListHeaderComponent={
                    <>
                        <Title
                            containerStyle={{ paddingTop: 30, paddingBottom: 20 }}
                            text={ `Clases del curso con ${ selectedCourse.person_name }` }
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
                            (searchTerm.trim().length > 0 && lessons.length === 0)
                                ? `No se encontraron resultados para: ${ searchTerm.trim() }`
                                : 'No haz agregado clases a este curso.'
                        }
                        showMsg={ !isLessonsLoading && lessons.length === 0 }
                    />
                }
                ListHeaderComponentStyle={{ alignSelf: 'flex-start' }}
                onEndReached={ handleEndReach }
                onEndReachedThreshold={ 0.5 }
                onRefresh={ () => {
                    setIsRefreshing(true);
                    handleRefreshing();
                } }
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

            {/* Modal to finish or start again lesson */}
            <FinishOrStartLessonModal
                isOpen={ showFSModal }
                onClose={ () => handleHideModal(setShowFSModal) }
            />

            {/* Modal to delete lesson */}
            <DeleteModal
                isLoading={ isLessonDeleting }
                isOpen={ showDeleteModal }
                onClose={ () => handleHideModal(setShowDeleteModal) }
                onConfirm={ handleDeleteConfirm }
                text="¿Está seguro de eliminar esta clase?"
            />
        </>
    );
}