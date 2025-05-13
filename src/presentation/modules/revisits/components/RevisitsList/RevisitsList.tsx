import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Href, useNavigation, useRouter } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

/* Entities */
import { RevisitEntity } from '@domain/entities';

/* Components */
import { RevisitCard } from '@revisits/components';
import { ListEmptyComponent, ListFooterComponent, SearchInput, Title } from '@ui/components';

/* Hooks */
import { useRevisits } from '@revisits/hooks';
import { useNetwork } from '@shared/hooks';
import { useTranslation } from '@ui/hooks';

/* Interfaces */
import { RevisitsListProps } from './interfaces';

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
export const RevisitsList: FC<RevisitsListProps> = ({ emptyMessage, filter, title }): JSX.Element => {
    const [ searchTerm, setSearchTerm ] = useState<string>('');
    const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);

    const router = useRouter();
    const { styles: themeStyles, theme: { fontSizes, margins } } = useStyles(themeStylesheet);

    const navigation = useNavigation();
    const navigationState = navigation.getState();

    const {
        state: {
            hasMoreRevisits,
            isRevisitsLoading,
            refreshRevisits,
            revisits,
            revisitsScreenHistory
        },
        removeRevisits,
        setRefreshRevisits,
        setRevisitsPagination,
        setSelectedRevisit,
        loadRevisits,
    } = useRevisits();

    const { wifi } = useNetwork();
    const { translate } = useTranslation();

    const noFoundResultsMsg = translate('messages.noResults', {
        attribute: translate('entities.revisits'),
        search: searchTerm.trim()
    });

    const emptyMsg = useMemo(
        () => (searchTerm.trim().length > 0) ? noFoundResultsMsg : emptyMessage,
        [ searchTerm ]
    );

    /**
     * When the user refreshes the page, the search term is reset, the pagination is reset, the
     * revisits are removed, and the revisits are loaded.
     *
     * @return {Promise<void>} This function returns nothing
     */
    const handleRefreshing = useCallback(async (): Promise<void> => {
        if (isRevisitsLoading) return;

        setIsRefreshing(true);
        setSearchTerm('');

        if (wifi.hasConnection) {
            removeRevisits();
            setRevisitsPagination({ from: 0, to: 9 });
            await loadRevisits({ filter, refresh: true });
        }

        setIsRefreshing(false);
    }, [ isRevisitsLoading, wifi.hasConnection, filter ]);

    /**
     * If the search string is not empty, reset the pagination, remove the revisits, load the revisits,
     * and set the refreshing state to false.
     *
     * @param {string} search - string
     * @return {Promise<void>} This function returns nothing
     */
    const handleSearchRevisits = useCallback(async (search: string): Promise<void> => {
        if (isRevisitsLoading) return;
        setSearchTerm(search);

        if (wifi.hasConnection) {
            setRevisitsPagination({ from: 0, to: 9 });
            removeRevisits();
            await loadRevisits({ filter, search, refresh: true });
        }
    }, [ isRevisitsLoading, wifi.hasConnection, filter ]);

    /**
     * If there are no more revisits to load, or if revisits are already loading, return. Otherwise,
     * load more revisits.
     *
     * @return {Promise<void>} This function does not return any value
     */
    const handleEndReach = useCallback( async (): Promise<void> => {
        if (!hasMoreRevisits || revisits.length === 0 || isRevisitsLoading || !wifi.hasConnection) return;
        await loadRevisits({ filter, search: searchTerm, loadMore: true });
    }, [ hasMoreRevisits, revisits.length, isRevisitsLoading, wifi.hasConnection, filter, searchTerm ]);

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
    }, []);

    const renderHeader = useCallback(() => (
        <View style={{ paddingHorizontal: margins.xs, width: '100%' }}>
            <Title
                containerStyle={{ marginVertical: margins.xs }}
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
            <RevisitCard
                onDelete={ handleDelete }
                onNavigateDetail={ handleDetail }
                onNavigateEdit={ handleEdit }
                onPass={ handlePass }
                onRevisit={ handleRevisit }
                revisit={ item }
            />
        );
    }, []);

    /**
     * Effect to refresh revisits if isFocused is true and if
     * refreshRevisits is true
     */
    useEffect(() => {
        if (!navigation.isFocused() || !refreshRevisits || !wifi.hasConnection) return;

        removeRevisits();
        loadRevisits({ filter, search: searchTerm, refresh: true });
    }, [ refreshRevisits, navigationState?.index ]);

    /**
     * Effect to set refresh flag Revisits using revisitsScreenHistory
     */
    useEffect(() => {
        const focusSubscription = navigation.addListener('focus', () => {
            if (!navigationState) return;

            const prevLast = revisitsScreenHistory[revisitsScreenHistory.length - 2];
            const last = navigationState.routeNames[navigationState.index];

            setRefreshRevisits(prevLast !== last);
        })

        return focusSubscription;
    }, [ navigationState?.routeNames, navigationState?.index, revisitsScreenHistory ]);

    return (
        <FlashList
            centerContent
            contentContainerStyle={ themeStyles.listContainer }
            data={ revisits }
            estimatedItemSize={ 256 }
            keyExtractor={ (item) => `${ filter }-${ item.id }` }
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
            renderItem={ renderRevisitItem }
        />
    );
}