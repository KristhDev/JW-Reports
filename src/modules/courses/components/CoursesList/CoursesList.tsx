import React, { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useNavigation } from '@react-navigation/native';

/* Features */
import { INIT_COURSE } from '../../features';

/* Screens */
import { ActiveOrSuspendCourseModal, FinishOrStartCourseModal } from '../../screens';
import { DeleteModal, ListEmptyComponent, ListFooterComponent, SearchInput, Title } from '../../../ui';

/* Components */
import { CourseCard } from '../CourseCard';

/* Hooks */
import { useCourses } from '../../hooks';
import { useLessons } from '../../../lessons';
import { useNetwork } from '../../../shared';

/* Interfaces */
import { CoursesListProps } from './interfaces';
import { Course } from '../../interfaces';

/**
 * This component is responsible for rendering a list of courses based
 * on a filter that is passed from the screens, in addition to the
 * search for courses.
 *
 * @param {CoursesListProps} props { filter: CourseFilter, title: string, emptyMessage: string } - This is a props
 * to functionality of the component
 * - emptyMessage: This string is a message to display if there are no courses
 * - filter: This string is a filter to load courses
 * - title: This string is a title of screen
 * @return {JSX.Element} rendered component to show the list of courses
 */
export const CoursesList: FC<CoursesListProps> = ({ emptyMessage, filter, title }): JSX.Element => {
    const [ searchTerm, setSearchTerm ] = useState<string>('');
    const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);
    const [ showASModal, setShowASModal ] = useState<boolean>(false);
    const [ showFSModal, setShowFSModal ] = useState<boolean>(false);

    const { getState, isFocused } = useNavigation();
    const navigationState = getState();

    const { theme: { fontSizes, margins } } = useStyles();

    const {
        state: {
            courses,
            coursesScreenHistory,
            hasMoreCourses,
            isCourseDeleting,
            isCoursesLoading,
            refreshCourses,
        },
        deleteCourse,
        loadCourses,
        removeCourses,
        setCoursesPagination,
        setRefreshCourses,
        setSelectedCourse,
    } = useCourses();

    const { state: { lessons }, removeLessons, setLessonsPagination } = useLessons();

    const { wifi } = useNetwork();

    /**
     * When the user refreshes the page, the search term is reset, the pagination is reset, the courses
     * are removed, and the courses are loaded.
     *
     * @return {void} This function does not return any value.
     */
    const handleRefreshing = (): void => {
        setSearchTerm('');

        if (wifi.hasConnection) {
            setCoursesPagination({ from: 0, to: 9 });
            removeCourses();
        }

        loadCourses({ filter, refresh: true });
    }

    /**
     * If the search string is empty and the courses array is empty, then set the courses pagination,
     * remove the courses, load the courses, and set the isRefreshing state to false.
     *
     * @param {string} search - string
     * @return {void} This function does not return any value.
     */
    const handleResetCourses = (search: string): void => {
        if (search.trim().length === 0 && courses.length === 0) {
            if (wifi.hasConnection) {
                setCoursesPagination({ from: 0, to: 9 });
                removeCourses();
            }

            loadCourses({ filter, search: '', refresh: true });
            setIsRefreshing(false);
        }
    }

    /**
     * If there are no more courses to load, or if the courses are currently loading, then return.
     * Otherwise, load more courses.
     *
     * @return {void} This function does not return any value.
     */
    const handleEndReach = (): void => {
        if (!hasMoreCourses || isCoursesLoading || !wifi.hasConnection) return;
        loadCourses({ filter, search: searchTerm, loadMore: true });
    }

    /**
     * Sets the selected course and shows the modal.
     *
     * @param {Course} course - The course to be selected.
     * @param {(value: boolean) => void} setShowModal - A function to set the modal visibility.
     * @return {void}
     */
    const handleShowModal = (course: Course, setShowModal: (value: boolean) => void): void => {
        setSelectedCourse(course);
        setShowModal(true);
    }

    /**
     * HandleHideModal is a function that takes a function as an argument and returns a function that
     * takes no arguments and returns nothing.
     *
     * @param {(value: boolean) => void} setShowModal - A function to set the modal visibility.
     * @return {void} This function does not return any value.
     */
    const handleHideModal = (setShowModal: (value: boolean) => void): void => {
        setShowModal(false);
        setSelectedCourse(INIT_COURSE);
    }

    /**
     * If the user confirms the delete, then delete the course and close the modal.
     *
     * @return {void} This function does not return any value.
     */
    const handleDeleteConfirm = (): void => {
        deleteCourse(false, () => setShowDeleteModal(false));
    }

    /**
     * Effect to set isRefreshing to false when it changes
     * and it is false
     */
    useEffect(() => {
        if (isRefreshing) setIsRefreshing(false);
    }, [ isRefreshing ]);

    /**
     * Effect to perform course search every time
     * searchText changes
     */
    useEffect(() => {
        if (searchTerm.trim().length > 0) {
            setCoursesPagination({ from: 0, to: 9 });
            removeCourses();
            loadCourses({ filter, search: searchTerm, refresh: true });
            setIsRefreshing(false);
        }
    }, [ searchTerm ]);

    /**
     * Effect to set refresh flag Courses using coursesScreenHistory
     */
    useEffect(() => {
        if (isFocused()) {
            if (!navigationState) return;

            const prevLast = coursesScreenHistory[coursesScreenHistory.length - 2];
            const last = navigationState.routeNames[navigationState.index];

            /**
             * If the penultimate screen is different from the last screen
             * of coursesScreenHistory, the courses are refreshed
             */
            setRefreshCourses(prevLast !== last);
        }
    }, [ coursesScreenHistory ]);

    /**
     * Effect to refresh courses if isFocused is true and if
     * refreshCourses is true
     */
    useEffect(() => {
        if (isFocused() && refreshCourses && wifi.hasConnection) {
            removeCourses();
            loadCourses({ filter, search: searchTerm, refresh: true });
        }
    }, [ refreshCourses, navigationState?.index ]);

    /**
     * Effect to remove lessons of selectedCourse
     */
    useEffect(() => {
        if (isFocused() && lessons.length > 0) {
            setLessonsPagination({ from: 0, to: 9 });
            removeLessons();
        }
    }, [ isFocused() ]);

    return (
        <>
            <FlatList
                contentContainerStyle={{ alignItems: 'center', padding: margins.md, paddingBottom: 100, flexGrow: 1 }}
                data={ courses }
                keyExtractor={ (item) => item.id }
                ListFooterComponent={
                    <ListFooterComponent
                        marginTopPlus={ courses.length === 0 }
                        showLoader={ isCoursesLoading }
                    />
                }
                ListHeaderComponent={
                    <>
                        <Title
                            containerStyle={{ marginVertical: margins.xs }}
                            text={ title }
                            textStyle={{ fontSize: fontSizes.md }}
                        />

                        <SearchInput
                            onClean={ handleRefreshing }
                            onSearch={ (search) => {
                                setSearchTerm(search);
                                handleResetCourses(search);
                            } }
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
                        showMsg={ !isCoursesLoading && courses.length === 0 }
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

            {/* Modal to active or suspend course */}
            <ActiveOrSuspendCourseModal
                isOpen={ showASModal }
                onClose={ () => handleHideModal(setShowASModal) }
            />

            {/* Modal to finish or start again course */}
            <FinishOrStartCourseModal
                isOpen={ showFSModal }
                onClose={ () => handleHideModal(setShowFSModal) }
            />

            {/* Modal to delete course */}
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