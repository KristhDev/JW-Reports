import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useStyles } from 'react-native-unistyles';
import { Href, useRouter } from 'expo-router';

/* Entities */
import { LessonEntity } from '@domain/entities';

/* Components */
import { ListEmptyComponent, ListFooterComponent, SearchInput, Title } from '@ui/components';
import { LessonCard } from '../LessonCard';

/* Hooks */
import { useCourses } from '@courses/hooks';
import { useLessons } from '../../hooks';
import { useNetwork } from '@shared/hooks';
import { useTranslation } from '@ui/hooks';

/* Theme */
import { themeStylesheet } from '@theme/styles';

/**
 * Render a list of lessons.
 *
 * @return {JSX.Element} The JSX element representing the lessons list.
 */
export const LessonsList = (): JSX.Element => {
    const [ searchTerm, setSearchTerm ] = useState<string>('');
    const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);

    const router = useRouter();
    const { styles: themeStyles, theme: { fontSizes, margins } } = useStyles(themeStylesheet);

    const { state: { selectedCourse } } = useCourses();

    const {
        state: {
            hasMoreLessons,
            isLessonsLoading,
            lessons
        },
        removeLessons,
        setLessonsPagination,
        setSelectedLesson,
        loadLessons,
    } = useLessons();

    const { wifi } = useNetwork();
    const { translate } = useTranslation();

    const title = translate('screens.lessons.titles.courseLessonsWith', {
        person: selectedCourse.personName.toUpperCase()
    });

    const noFoundResultsMsg = translate('messages.noResults', {
        attribute: translate('entities.lessons'),
        search: searchTerm.trim()
    });

    const theReNoLessonsMsg = translate('screens.lessons.messages.theReNoLessons');

    const emptyMsg = useMemo(
        () => (searchTerm.trim().length > 0 && lessons.length === 0) ? noFoundResultsMsg : theReNoLessonsMsg,
        [ searchTerm, lessons.length ]
    ); 

    /**
     * When the user refreshes the page, reset the search term, reset the pagination, remove the
     * lessons from the state, and load the lessons again.
     *
     * @return {Promise<void>} This function does not return any value.
     */
    const handleRefreshing = useCallback(async (): Promise<void> => {
        if (isLessonsLoading) return;

        setIsRefreshing(true);
        setSearchTerm('');

        if (wifi.hasConnection) {
            setLessonsPagination({ from: 0, to: 9 });
            removeLessons();
            loadLessons({ refresh: true });
        }

        setIsRefreshing(false);
    }, [ isLessonsLoading, wifi.hasConnection ]);

    /**
     * When the user searches for lessons, reset the pagination, remove the lessons from the state,
     * and load the lessons again with the search term.
     *
     * @return {Promise<void>} This function does not return any value.
     */
    const handleSearch = useCallback(async (): Promise<void> => {
        if (!wifi.hasConnection || isLessonsLoading) return;

        setLessonsPagination({ from: 0, to: 9 });
        removeLessons();
        loadLessons({ search: searchTerm, refresh: true });
    }, [ isLessonsLoading, wifi.hasConnection, searchTerm ]);

    /**
     * If there are no more lessons to load, or if the lessons are currently loading, then return.
     * Otherwise, load more lessons.
     *
     * @return {Promise<void>} This function does not return any value.
     */
    const handleEndReach = useCallback(async (): Promise<void> => {
        if (!hasMoreLessons || lessons.length === 0 || isLessonsLoading || !wifi.hasConnection) return;
        await loadLessons({ search: searchTerm, loadMore: true });
    }, [ hasMoreLessons, isLessonsLoading, lessons.length, wifi.hasConnection, searchTerm ]);

    /**
     * HandleShowModal is a function that takes a lesson and a setShowModal function as parameters and
     * returns nothing.
     *
     * @param {LessonEntity} lesson - LessonEntity - this is the lesson that was clicked on
     * @param {Href} href - Href - this is the href to navigate to
     * @return {void} This function does not return any value.
     */
    const handleShowModal = useCallback((lesson: LessonEntity, href: Href): void => {
        setSelectedLesson(lesson);
        router.navigate(href);
    }, []);

    const renderHeader = useCallback(() => (
        <View style={{ paddingHorizontal: margins.xs, paddingBottom: margins.md, width: '100%' }}>
            <Title
                containerStyle={{ marginBottom: margins.sm, marginTop: margins.xs }}
                text={ title }
                textStyle={{ fontSize: fontSizes.md }}
            />

            <SearchInput
                onClean={ () => setSearchTerm('') }
                onSearch={ setSearchTerm }
                refreshing={ isRefreshing }
                searchTerm={ searchTerm }
            />
        </View>
    ), [ title, searchTerm, isRefreshing ]);

    const renderListEmpty = useCallback(() => (
        <ListEmptyComponent
            msg={ emptyMsg }
            showMsg={ !isLessonsLoading && lessons.length === 0 }
        />
    ), [ emptyMsg, isLessonsLoading, lessons.length ]);

    const renderFooter = useCallback(() => (
        <ListFooterComponent
            marginTopPlus={ lessons.length === 0 }
            showLoader={ isLessonsLoading }
        />
    ), [ lessons.length, isLessonsLoading ]);

    const renderLessonItem = useCallback(({ item }: { item: LessonEntity }) => {
        const handleDelete = () => handleShowModal(item, '/(app)/(tabs)/courses/lessons/delete-lesson-modal');
        const handleFinish = () => handleShowModal(item, '/(app)/(tabs)/courses/lessons/finish-or-start-lesson-modal');
        const handleDetail = () => handleShowModal(item, '/(app)/(tabs)/courses/lessons/detail');
        const handleEdit = () => handleShowModal(item, '/(app)/(tabs)/courses/lessons/add-or-edit');

        return (
            <LessonCard
                lesson={ item }
                onDelete={ handleDelete }
                onFinish={ handleFinish }
                onNavigateDetail={ handleDetail }
                onNavigateEdit={ handleEdit }
            />
        );
    }, []);

    /**
     * Effect to perform lesson search every time
     * searchText changes
     */
    useEffect(() => {
        handleSearch();
    }, [ searchTerm ]);

    return (
        <FlashList
            centerContent
            contentContainerStyle={ themeStyles.listContainer }
            data={ lessons }
            estimatedItemSize={ 256 }
            ItemSeparatorComponent={ () => <View style={{ height: margins.xs - 4 }} /> }
            keyExtractor={ (item) => item.id }
            ListEmptyComponent={ renderListEmpty }
            ListFooterComponent={ renderFooter }
            ListHeaderComponent={ renderHeader }
            ListHeaderComponentStyle={{ alignSelf: 'flex-start' }}
            onEndReached={ handleEndReach }
            onEndReachedThreshold={ 0.5 }
            refreshControl={
                <RefreshControl
                    onRefresh={ handleRefreshing }
                    refreshing={ isRefreshing }
                />
            }
            renderItem={ renderLessonItem }
        />
    );
}