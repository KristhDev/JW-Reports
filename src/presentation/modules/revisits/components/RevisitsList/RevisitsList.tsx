import React, { FC, useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

/* Features */
import { INIT_REVISIT } from '@application/features';

/* Entities */
import { RevisitEntity } from '@domain/entities';

/* Modules */
import { PassToCourseModal } from '@courses';
import { RevisitCard, RevisitModal, useRevisits } from '@revisits';
import { DeleteModal, ListEmptyComponent, ListFooterComponent, SearchInput, Title } from '@ui';

/* Hooks */
import { useNetwork } from '@shared';

/* Interfaces */
import { RevisitsListProps } from './interfaces';

/* Theme */
import { themeStylesheet } from '@theme';

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

    const [ showRevisitModal, setShowRevisitModal ] = useState<boolean>(false);
    const [ showPassModal, setShowPassModal ] = useState<boolean>(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);

    const { styles: themeStyles, theme: { fontSizes, margins } } = useStyles(themeStylesheet);

    const navigation = useNavigation();
    const navigationState = navigation.getState();

    const emptyMsg = (searchTerm.trim().length > 0)
        ? `No se encontraron revisitas con la busqueda: ${ searchTerm.trim() }`
        : emptyMessage

    const {
        state: {
            hasMoreRevisits,
            isRevisitDeleting,
            isRevisitsLoading,
            refreshRevisits,
            revisits,
            revisitsScreenHistory
        },
        deleteRevisit,
        removeRevisits,
        setRefreshRevisits,
        setRevisitsPagination,
        setSelectedRevisit,
        loadRevisits,
    } = useRevisits();

    const { wifi } = useNetwork();

    /**
     * When the user refreshes the page, the search term is reset, the pagination is reset, the
     * revisits are removed, and the revisits are loaded.
     *
     * @return {void} This function returns nothing
     */
    const handleRefreshing = (): void => {
        if (isRevisitsLoading) return;

        setIsRefreshing(true);
        setSearchTerm('');

        if (wifi.hasConnection) {
            setRevisitsPagination({ from: 0, to: 9 });
            removeRevisits();
            loadRevisits({ filter, refresh: true });
        }

        setIsRefreshing(false);
    }

    /**
     * If the search string is not empty, reset the pagination, remove the revisits, load the revisits,
     * and set the refreshing state to false.
     *
     * @param {string} search - string
     * @return {void} This function does not return any value
     */
    const handleSearchRevisits = (search: string): void => {
        if (isRevisitsLoading) return;
        setSearchTerm(search);

        if (wifi.hasConnection) {
            setRevisitsPagination({ from: 0, to: 9 });
            removeRevisits();
            loadRevisits({ filter, search, refresh: true });
        }
    }

    /**
     * If there are no more revisits to load, or if revisits are already loading, return. Otherwise,
     * load more revisits.
     *
     * @return {void} This function does not return any value
     */
    const handleEndReach = (): void => {
        if (!hasMoreRevisits || isRevisitsLoading || !wifi.hasConnection) return;
        loadRevisits({ filter, search: searchTerm, loadMore: true });
    }

    /**
     * HandleShowModal is a function that takes a revisit and a setShowModal function as parameters and
     * sets the selectedRevisit to the revisit and sets the showModal to true.
     *
     * @param {RevisitEntity} revisit - RevisitEntity - this is the object that is being passed in from the parent
     * component
     * @param {(setShowModal: (value: boolean) => void)} setShowModal - (value: boolean) => void
     * @return {void} This function does not return any value
     */
    const handleShowModal = (revisit: RevisitEntity, setShowModal: (value: boolean) => void): void => {
        setSelectedRevisit(revisit);
        setShowModal(true);
    }

    /**
     * HandleHideModal is a function that takes a function as an argument and returns a function that
     * takes no arguments and returns nothing.
     *
     * @param {(setShowModal: (value: boolean) => void)} setShowModal - (value: boolean) => void
     * @return {void} This function does not return any value
     */
    const handleHideModal = (setShowModal: (value: boolean) => void): void => {
        setShowModal(false);
        setSelectedRevisit({
            ...INIT_REVISIT,
            nextVisit: new Date().toString()
        });
    }

    /**
     * If the user confirms the delete, then delete the revisit and close the modal.
     *
     * @return {void} - This function does not return any value
     */
    const handleDeleteConfirm = (): void => {
        deleteRevisit({
            onFinish: () => setShowDeleteModal(false)
        });
    }

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
    useFocusEffect(
        useCallback(() => {
            if (!navigationState) return;

            const prevLast = revisitsScreenHistory[revisitsScreenHistory.length - 2];
            const last = navigationState.routeNames[navigationState.index];

            setRefreshRevisits(prevLast !== last);
        }, [ navigationState?.routeNames, navigationState?.index, revisitsScreenHistory ])
    );

    return (
        <>
            <FlatList
                contentContainerStyle={ themeStyles.flatListContainer }
                data={ revisits }
                keyExtractor={ (item) => item.id }
                ListFooterComponent={
                    <ListFooterComponent
                        marginTopPlus={ revisits.length === 0 }
                        showLoader={ isRevisitsLoading }
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
                            onClean={ () => handleSearchRevisits('') }
                            onSearch={ handleSearchRevisits }
                            searchTerm={ searchTerm }
                            refreshing={ isRefreshing }
                        />
                    </>
                }
                ListEmptyComponent={
                    <ListEmptyComponent
                        msg={ emptyMsg }
                        showMsg={ !isRevisitsLoading && revisits.length === 0 }
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
                    <RevisitCard
                        onDelete={ () => handleShowModal(item, setShowDeleteModal) }
                        onPass={ () => handleShowModal(item, setShowPassModal) }
                        onRevisit={ () => handleShowModal(item, setShowRevisitModal) }
                        revisit={ item }
                        screenToNavigate="RevisitDetailScreen"
                    />
                ) }
            />

            {/* Modal to complete revisit */}
            <RevisitModal
                isOpen={ showRevisitModal }
                onClose={ () => handleHideModal(setShowRevisitModal) }
            />

            {/* Modal for pass revisit to course */}
            <PassToCourseModal
                isOpen={ showPassModal }
                onClose={ () => handleHideModal(setShowPassModal) }
            />

            {/* Modal to delete revisit */}
            <DeleteModal
                isLoading={ isRevisitDeleting }
                isOpen={ showDeleteModal }
                onClose={ () => handleHideModal(setShowDeleteModal) }
                onConfirm={ handleDeleteConfirm }
                text="¿Está seguro de eliminar esta revisita?"
            />
        </>
    );
}