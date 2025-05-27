import { useCallback, useEffect } from 'react';
import { RefreshControl, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Href, useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Entities */
import { RevisitEntity } from '@domain/entities';

/* Components */
import { RevisitCard } from '@revisits/components';
import { Filters, ListEmptyComponent, ListFooterComponent, SearchInput } from '@ui/components';

/* Hooks */
import { useRevisits, useRevisitsList } from '@revisits/hooks';

/* Theme */
import { themeStylesheet } from '@theme/styles';

/**
 * This component is responsible for rendering a list of revisits based
 * on a filter that is passed from the screens, in addition to the
 * search for revisits.
 *
 * @param {RevisitsListProps} { emptyMessage: string, filter: RevisitFilter, title: string } - This is a props
 * to functionality of the component
 * - emptyMessage: This string is a message to display if there are no revisits
 * - filter: This string is a filter to load revisits
 * - title: This string is a title of screen
 * @return {JSX.Element} Return a list of revisits
 */
export const RevisitsList = (): JSX.Element => {
    const router = useRouter();
    const { styles: themeStyles, theme: { margins } } = useStyles(themeStylesheet);

    const { setSelectedRevisit } = useRevisits(); 

    const {
        emptyMsg,
        filter,
        isRefreshing,
        isRevisitsLoading,
        revisits,
        searchTerm,
        revisitsFiltersItems,

        onEndReach,
        onMountRevisits,
        onRefreshingRevisits,
        onSearchRevisits,
        setFilter
    } = useRevisitsList();

    /**
     * HandleShowModal is a function that takes a revisit and a setShowModal function as parameters and
     * sets the selectedRevisit to the revisit and sets the showModal to true.
     *
     * @param {RevisitEntity} revisit - RevisitEntity - this is the object that is being passed in from the parent
     * component
     * @param {(setShowModal: (value: boolean) => void)} setShowModal - (value: boolean) => void
     * @return {void} This function does not return any value
     */
    const handleShowModal = useCallback((revisit: RevisitEntity, href: Href): void => {
        setSelectedRevisit(revisit);
        router.navigate(href);
    }, [ setSelectedRevisit, router ]);

    const renderHeader = useCallback(() => (
        <View style={ themeStyles.listHeaderContainer }>
            <SearchInput
                onClean={ () => onSearchRevisits('') }
                onSearch={ onSearchRevisits }
                refreshing={ isRefreshing }
                searchTerm={ searchTerm }
            />

            <Filters 
                items={ revisitsFiltersItems }
                selectedFilter={ filter }
                onFilterChange={ setFilter }
            />
        </View>
    ), [ filter, searchTerm, isRefreshing, isRevisitsLoading, revisitsFiltersItems ]);

    const renderListEmpty = useCallback(() => (
        <ListEmptyComponent
            msg={ emptyMsg }
            showMsg={ !isRevisitsLoading && revisits.length === 0 }
        />
    ), [ emptyMsg, isRevisitsLoading, revisits.length ]);

    const renderFooter = useCallback(() => (
        <ListFooterComponent
            marginTopPlus={ revisits.length === 0 }
            showLoader={ isRevisitsLoading }
        />
    ), [ revisits.length, isRevisitsLoading ]);

    const renderRevisitItem = useCallback(({ item }: { item: RevisitEntity }) => {
        const handleDelete = () => handleShowModal(item, '/(app)/(tabs)/revisits/delete-revisit-modal');
        const handleDetail = () => router.navigate('/(app)/(tabs)/revisits/detail');
        const handleEdit = () => router.navigate('/(app)/(tabs)/revisits/add-or-edit');
        const handlePass = () => handleShowModal(item, '/(app)/(tabs)/revisits/pass-to-course-modal');
        const handleRevisit = () => handleShowModal(item, '/(app)/(tabs)/revisits/revisit-modal');

        return (
            <View style={{ marginHorizontal: margins.xs }}>
                <RevisitCard
                    onDelete={ handleDelete }
                    onNavigateDetail={ handleDetail }
                    onNavigateEdit={ handleEdit }
                    onPass={ handlePass }
                    onRevisit={ handleRevisit }
                    revisit={ item }
                />
            </View>
        );
    }, []);

    useEffect(() => {
        onMountRevisits();
    }, [ filter ]);

    return (
        <FlashList
            centerContent
            contentContainerStyle={{ paddingBottom: 100 }}
            data={ revisits }
            estimatedItemSize={ 256 }
            ItemSeparatorComponent={ () => <View style={{ height: margins.xs - 4 }} /> }
            ListEmptyComponent={ renderListEmpty }
            ListFooterComponent={ renderFooter }
            ListHeaderComponent={ renderHeader }
            ListHeaderComponentStyle={{ alignSelf: 'flex-start' }}
            onEndReached={ onEndReach }
            onEndReachedThreshold={ 0.5 }
            refreshControl={
                <RefreshControl
                    onRefresh={ onRefreshingRevisits }
                    refreshing={ isRefreshing }
                />
            }
            renderItem={ renderRevisitItem }
        />
    );
}