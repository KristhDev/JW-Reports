import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useStyles } from 'react-native-unistyles';

/* Features */
import { INIT_LESSON } from '../../features';

/* Modules */
import { FinishOrStartLessonModal } from '../../screens';
import { DeleteModal, ListEmptyComponent, ListFooterComponent, SearchInput, Title } from '@ui';
import { LessonCard } from '../LessonCard';

/* Hooks */
import { useCourses } from '@courses';
import { useLessons } from '../../hooks';
import { useNetwork } from '@shared';

/* Interfaces */
import { Lesson } from '../../interfaces';

/* Theme */
import { themeStylesheet } from '@theme';

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

    const { styles: themeStyles, theme: { fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { selectedCourse } } = useCourses();

    const {
        state: {
            hasMoreLessons,
            isLessonDeleting,
            isLessonsLoading,
            lessons
        },
        deleteLesson,
        removeLessons,
        setLessonsPagination,
        setSelectedLesson,
        loadLessons,
    } = useLessons();

    const { wifi } = useNetwork();

    const emptyMsg = (searchTerm.trim().length > 0 && lessons.length === 0)
        ? `No se encontraron resultados para: ${ searchTerm.trim() }`
        : 'No has agregado clases a este curso.'

    /**
     * When the user refreshes the page, reset the search term, reset the pagination, remove the
     * lessons from the state, and load the lessons again.
     *
     * @return {void} This function does not return any value.
     */
    const handleRefreshing = (): void => {
        if (isLessonsLoading) return;

        setIsRefreshing(true);
        setSearchTerm('');

        if (wifi.hasConnection) {
            setLessonsPagination({ from: 0, to: 9 });
            removeLessons();
            loadLessons({ refresh: true });
        }

        setIsRefreshing(false);
    }

    /**
     * When the user searches for lessons, reset the pagination, remove the lessons from the state,
     * and load the lessons again with the search term.
     *
     * @return {void} This function does not return any value.
     */
    const handleSearch = (): void => {
        if (!wifi.hasConnection || isLessonsLoading) return;

        setLessonsPagination({ from: 0, to: 9 });
        removeLessons();
        loadLessons({ search: searchTerm, refresh: true });
    }

    /**
     * If there are no more lessons to load, or if the lessons are currently loading, then return.
     * Otherwise, load more lessons.
     *
     * @return {void} This function does not return any value.
     */
    const handleEndReach = (): void => {
        if (!hasMoreLessons || isLessonsLoading || !wifi.hasConnection) return;
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
            nextLesson: new Date().toString()
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
     * Effect to perform lesson search every time
     * searchText changes
     */
    useEffect(() => {
        handleSearch();
    }, [ searchTerm ]);

    return (
        <>
            <FlatList
                contentContainerStyle={ themeStyles.flatListContainer }
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
                            containerStyle={{ marginVertical: margins.xs }}
                            text={ `CLASES DEL CURSO CON ${ selectedCourse.personName.toUpperCase() }` }
                            textStyle={{ fontSize: fontSizes.md }}
                        />

                        <SearchInput
                            onClean={ () => setSearchTerm('') }
                            onSearch={ setSearchTerm }
                            refreshing={ isRefreshing }
                            searchTerm={ searchTerm }
                        />
                    </>
                }
                ListEmptyComponent={
                    <ListEmptyComponent
                        msg={ emptyMsg }
                        showMsg={ !isLessonsLoading && lessons.length === 0 }
                    />
                }
                ListHeaderComponentStyle={{ alignSelf: 'flex-start' }}
                onEndReached={ handleEndReach }
                onEndReachedThreshold={ 0.5 }
                overScrollMode="never"
                refreshControl={
                    <RefreshControl
                        onRefresh={ handleRefreshing }
                        refreshing={ isRefreshing }
                    />
                }
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