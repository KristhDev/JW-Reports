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
import { useCourses, useNetwork } from '../../../hooks';

/* Interfaces */
import { Lesson } from '../../../interfaces/courses';

/**
 * Render a list of lessons.
 *
 * @return {JSX.Element} The JSX element representing the lessons list.
 */
export const LessonsList = (): JSX.Element => {
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
    const { isConnected } = useNetwork();

    /**
     * When the user refreshes the page, reset the search term, reset the pagination, remove the
     * lessons from the state, and load the lessons again.
     *
     * @return {void} This function does not return any value.
     */
    const handleRefreshing = (): void => {
        setSearchTerm('');

        if (isConnected) {
            setLessonsPagination({ from: 0, to: 9 });
            removeLessons();
        }

        loadLessons({ refresh: true });
    }

    /**
     * If there are no more lessons to load, or if the lessons are currently loading, then return.
     * Otherwise, load more lessons.
     *
     * @return {void} This function does not return any value.
     */
    const handleEndReach = (): void => {
        if (!hasMoreLessons || isLessonsLoading || !isConnected) return;
        loadLessons({ search: searchTerm, loadMore: true });
    }

    /**
     * HandleShowModal is a function that takes a lesson and a setShowModal function as parameters and
     * returns nothing.
     *
     * @param {Lesson} lesson - Lesson - this is the lesson that was clicked on
     * @param {(setShowModal: (value: boolean) => void)} setShowModal The function to set the modal visibility.
     * @return {void} This function does not return any value.
     */
    const handleShowModal = (lesson: Lesson, setShowModal: (value: boolean) => void): void => {
        setSelectedLesson(lesson);
        setShowModal(true);
    }

    /**
     * HandleHideModal is a function that takes a function as an argument and returns a function that
     * takes no arguments and returns nothing.
     *
     * @param {(setShowModal: (value: boolean) => void)} setShowModal The function to set the modal visibility.
     * @return {void} This function does not return any value.
     */
    const handleHideModal = (setShowModal: (value: boolean) => void): void => {
        setShowModal(false);
        setSelectedLesson({
            ...INIT_LESSON,
            next_lesson: new Date().toString()
        });
    }


    /**
     * Handles the delete confirmation by calling the deleteLesson function with a boolean value of false,
     * and then hides the delete modal by calling setShowDeleteModal with a boolean value of false.
     *
     * @return {void} - This function does not return any value.
     */
    const handleDeleteConfirm = (): void => {
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
            if (isConnected) {
                setLessonsPagination({ from: 0, to: 9 });
                removeLessons();
            }

            loadLessons({ search: searchTerm, refresh: true });
            setIsRefreshing(false);
        }
        else if (searchTerm.trim().length === 0 && lessons.length === 0 && isConnected) {
            setLessonsPagination({ from: 0, to: 9 });
            removeLessons();
            loadLessons({ search: '', refresh: true });
            setIsRefreshing(false);
        }
    }, [ searchTerm ]);

    return (
        <>
            <FlatList
                contentContainerStyle={{ alignItems: 'center', padding: 24, paddingBottom: 100, flexGrow: 1 }}
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
                            containerStyle={{ marginVertical: 8 }}
                            text={ `Clases del curso con ${ selectedCourse.personName }` }
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
                                : 'No has agregado clases a este curso.'
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
                        screenToNavigate="LessonDetailScreen"
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