import React, { FC, useCallback, useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { Href, router, useNavigation } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { useStyles } from 'react-native-unistyles';

/* Entities */
import { CourseEntity } from '@domain/entities';

/* Components */
import { CourseCard } from '../CourseCard';
import { ListEmptyComponent, ListFooterComponent, SearchInput, Title } from '@ui/components';

/* Hooks */
import { useCourses } from '../../hooks';
import { useLessons } from '@lessons/hooks';
import { useNetwork } from '@shared/hooks';
import { useTranslation } from '@ui/hooks';

/* Interfaces */
import { CoursesListProps } from './interfaces';

/* Theme */
import { themeStylesheet } from '@theme/styles';

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

    const navigation = useNavigation();
    const navigationState = navigation.getState();

    const { styles: themeStyles, theme: { fontSizes, margins } } = useStyles(themeStylesheet);

    const {
        state: {
            courses,
            coursesScreenHistory,
            hasMoreCourses,
            isCoursesLoading,
            refreshCourses,
        },
        loadCourses,
        removeCourses,
        setCoursesPagination,
        setRefreshCourses,
        setSelectedCourse,
    } = useCourses();

    const { state: { lessons }, removeLessons, setLessonsPagination } = useLessons();

    const { wifi } = useNetwork();
    const { translate } = useTranslation();

    const noFoundResultsMsg = translate('messages.noResults', {
        attribute: translate('entities.courses'),
        search: searchTerm.trim()
    });

    const emptyMsg = (searchTerm.trim().length > 0) ? noFoundResultsMsg : emptyMessage;

    /**
     * When the user refreshes the page, the search term is reset, the pagination is reset, the courses
     * are removed, and the courses are loaded.
     *
     * @return {void} This function does not return any value.
     */
    const handleRefreshing = (): void => {
        if (isCoursesLoading) return;

        setIsRefreshing(true);
        setSearchTerm('');

        if (wifi.hasConnection) {
            setCoursesPagination({ from: 0, to: 9 });
            removeCourses();
            loadCourses({ filter, refresh: true });
        }

        setIsRefreshing(false);
    }

    /**
     * If the search string is empty and the courses array is empty, then set the courses pagination,
     * remove the courses, load the courses, and set the isRefreshing state to false.
     *
     * @param {string} search - string
     * @return {void} This function does not return any value.
     */
    const handleSearchCourses = (search: string): void => {
        if (isCoursesLoading) return;
        setSearchTerm(search);

        if (wifi.hasConnection) {
            setCoursesPagination({ from: 0, to: 9 });
            removeCourses();
            loadCourses({ filter, search, refresh: true });
        }
    }

    /**
     * If there are no more courses to load, or if the courses are currently loading, then return.
     * Otherwise, load more courses.
     *
     * @return {void} This function does not return any value.
     */
    const handleEndReach = (): void => {
        if (!hasMoreCourses || courses.length === 0 || isCoursesLoading || !wifi.hasConnection) return;
        loadCourses({ filter, search: searchTerm, loadMore: true });
    }

    /**
     * Sets the selected course and shows the modal.
     *
     * @param {CourseEntity} course - The course to be selected.
     * @param {Href} href - The href to be passed to the modal.
     * @return {void}
     */
    const handleShowModal = useCallback((course: CourseEntity, href: Href): void => {
        setSelectedCourse(course);
        router.navigate(href);
    }, []);

    /**
     * Effect to load courses if isFocused is true and if
     * refreshCourses is true
     */
    useEffect(() => {
        if (!navigation.isFocused() || !refreshCourses || !wifi.hasConnection) return;

        removeCourses();
        loadCourses({ filter, search: searchTerm, refresh: true });
    }, [ refreshCourses, navigationState?.index ]);

    /**
     * Effect to set refresh flag Courses using coursesScreenHistory
     */
    useEffect(() => {
        const focusUnsubscribe = navigation.addListener('focus', () => {
            if (!navigationState) return;

            const prevLast = coursesScreenHistory[coursesScreenHistory.length - 2];
            const last = navigationState.routeNames[navigationState.index];

            setRefreshCourses(prevLast !== last);
        })

        return focusUnsubscribe;
    }, []);

    /**
     * Effect to set lessons pagination and remove lessons when the screen is focused
     * and the lessons array is empty
     */
    useEffect(() => {
        const focusUnsubscribe = navigation.addListener('focus', () => {
            if (lessons.length === 0) return;

            setLessonsPagination({ from: 0, to: 9 });
            removeLessons();
        })

        return focusUnsubscribe;
    }, []);

    return (
        <FlashList
            centerContent
            contentContainerStyle={ themeStyles.listContainer }
            data={ courses }
            estimatedItemSize={ 256 }
            keyExtractor={ (item) => `${ filter }-${ item.id }` }
            ListFooterComponent={
                <ListFooterComponent
                    marginTopPlus={ courses.length === 0 }
                    showLoader={ isCoursesLoading }
                />
            }
            ListHeaderComponent={
                <View style={{ paddingHorizontal: margins.xs, width: '100%' }}>
                    <Title
                        containerStyle={{ marginVertical: margins.xs }}
                        text={ title }
                        textStyle={{ fontSize: fontSizes.md }}
                    />

                    <SearchInput
                        onClean={ () => handleSearchCourses('') }
                        onSearch={ handleSearchCourses }
                        refreshing={ isRefreshing }
                        searchTerm={ searchTerm }
                    />
                </View>
            }
            ListEmptyComponent={
                <ListEmptyComponent
                    msg={ emptyMsg }
                    showMsg={ !isCoursesLoading && courses.length === 0 }
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
                <CourseCard
                    course={ item }
                    onActiveOrSuspend={ () => handleShowModal(item, '/(app)/(tabs)/courses/active-or-suspend-course-modal') }
                    onDelete={ () => handleShowModal(item, '/(app)/(tabs)/courses/delete-course-modal') }
                    onFinishOrStart={ () => handleShowModal(item, '/(app)/(tabs)/courses/finish-or-start-course-modal') }
                />
            ) }
        />
    );
}