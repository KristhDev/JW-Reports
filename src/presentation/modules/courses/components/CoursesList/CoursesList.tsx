import { useCallback, useEffect } from 'react';
import { RefreshControl, View } from 'react-native';
import { Href, router, useNavigation } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { useStyles } from 'react-native-unistyles';

/* Entities */
import { CourseEntity } from '@domain/entities';

/* Components */
import { CourseCard } from '../CourseCard';
import { Filters, ListEmptyComponent, ListFooterComponent, SearchInput } from '@ui/components';

/* Hooks */
import { useCourses, useCoursesList } from '../../hooks';
import { useLessons } from '@lessons/hooks';

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
export const CoursesList = (): JSX.Element => {
    const navigation = useNavigation();
    const { styles: themeStyles, theme: { margins } } = useStyles(themeStylesheet);

    const { setSelectedCourse } = useCourses();
    const {
        emptyMsg,
        isRefreshing,
        isCoursesLoading,
        courses,
        coursesFiltersItems,
        searchTerm,

        filter,
        setFilter,

        onEndReach,
        onMountCourses,
        onRefreshingCourses,
        onSearchCourses
    } = useCoursesList();

    const { state: { lessons }, removeLessons, setLessonsPagination } = useLessons();

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

    const renderHeader = useCallback(() => (
        <View style={ themeStyles.listHeaderContainer }>
            <SearchInput
                onClean={ () => onSearchCourses('') }
                onSearch={ onSearchCourses }
                refreshing={ isRefreshing }
                searchTerm={ searchTerm }
            />

            <Filters 
                items={ coursesFiltersItems }
                selectedFilter={ filter }
                onFilterChange={ setFilter }
            />
        </View>
    ), [ isRefreshing, searchTerm, isCoursesLoading, coursesFiltersItems ]);

    const renderListEmpty = useCallback(() => (
        <ListEmptyComponent
            msg={ emptyMsg }
            showMsg={ !isCoursesLoading && courses.length === 0 }
        />
    ), [ emptyMsg, isCoursesLoading, courses.length ]);

    const renderFooter = useCallback(() => (
        <ListFooterComponent
            marginTopPlus={ courses.length === 0 }
            showLoader={ isCoursesLoading }
        />
    ), [ courses.length, isCoursesLoading ]);

    const renderCourseItem = useCallback(({ item }: { item: CourseEntity }) => {
        const handleActiveOrSuspend = () => handleShowModal(item, '/(app)/(tabs)/courses/active-or-suspend-course-modal');
        const handleDelete = () => handleShowModal(item, '/(app)/(tabs)/courses/delete-course-modal');
        const handleFinishOrStart = () => handleShowModal(item, '/(app)/(tabs)/courses/finish-or-start-course-modal');

        return (
            <View style={{ marginHorizontal: margins.xs }}>
                <CourseCard
                    course={ item }
                    onActiveOrSuspend={ handleActiveOrSuspend }
                    onDelete={ handleDelete }
                    onFinishOrStart={ handleFinishOrStart }
                />
            </View>
        );
    }, []);

    /**
     * Effect to load courses if isFocused is true and if
     * refreshCourses is true
     */
    useEffect(() => {
        onMountCourses();
    }, [ filter ]);

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
            contentContainerStyle={{ paddingBottom: 100 }}
            data={ courses }
            estimatedItemSize={ 256 }
            ItemSeparatorComponent={ () => <View style={{ height: margins.xs - 4 }} /> }
            keyExtractor={ (item) => `${ filter }-${ item.id }` }
            ListEmptyComponent={ renderListEmpty }
            ListFooterComponent={ renderFooter }
            ListHeaderComponent={ renderHeader }
            ListHeaderComponentStyle={{ alignSelf: 'flex-start' }}
            onEndReached={ onEndReach }
            onEndReachedThreshold={ 0.5 }
            refreshControl={
                <RefreshControl
                    onRefresh={ onRefreshingCourses }
                    refreshing={ isRefreshing }
                />
            }
            renderItem={ renderCourseItem }
        />
    );
}