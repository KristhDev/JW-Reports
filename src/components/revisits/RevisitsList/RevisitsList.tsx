import React, { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/* Features */
import { INIT_REVISIT } from '../../../features/revisits';

/* Screens */
import { PassToCourseModal } from '../../../screens/courses';
import { RevisitModal } from '../../../screens/revisits';
import { DeleteModal } from '../../../screens/ui';

/* Components */
import { RevisitCard } from '../RevisitCard';
import { ListEmptyComponent, ListFooterComponent, SearchInput, Title } from '../../ui';

/* Hooks */
import { useNetwork, useRevisits } from '../../../hooks';

/* Interfaces */
import { RevisitsListProps } from './interfaces';
import { Revisit } from '../../../interfaces/revisits';

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

    const { getState, isFocused } = useNavigation();
    const { index, routeNames } = getState();

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
    const { isConnected } = useNetwork();

    /**
     * When the user refreshes the page, the search term is reset, the pagination is reset, the
     * revisits are removed, and the revisits are loaded.
     *
     * @return {void} This function returns nothing
     */
    const handleRefreshing = (): void => {
        setSearchTerm('');

        if (isConnected) {
            setRevisitsPagination({ from: 0, to: 9 });
            removeRevisits();
        }

        loadRevisits({ filter, refresh: true });
    }

    /**
     * If the search string is not empty, reset the pagination, remove the revisits, load the revisits,
     * and set the refreshing state to false.
     *
     * @param {string} search - string
     * @return {void} This function does not return any value
     */
    const handleResetRevisits = (search: string): void => {
        if (search.trim().length === 0 && revisits.length === 0) {
            if (isConnected) {
                setRevisitsPagination({ from: 0, to: 9 });
                removeRevisits();
            }

            loadRevisits({ filter, search: '', refresh: true });
            setIsRefreshing(false);
        }
    }

    /**
     * If there are no more revisits to load, or if revisits are already loading, return. Otherwise,
     * load more revisits.
     *
     * @return {void} This function does not return any value
     */
    const handleEndReach = (): void => {
        if (!hasMoreRevisits || isRevisitsLoading || !isConnected) return;
        loadRevisits({ filter, search: searchTerm, loadMore: true });
    }

    /**
     * HandleShowModal is a function that takes a revisit and a setShowModal function as parameters and
     * sets the selectedRevisit to the revisit and sets the showModal to true.
     *
     * @param {Revisit} revisit - Revisit - this is the object that is being passed in from the parent
     * component
     * @param {(setShowModal: (value: boolean) => void)} setShowModal - (value: boolean) => void
     * @return {void} This function does not return any value
     */
    const handleShowModal = (revisit: Revisit, setShowModal: (value: boolean) => void): void => {
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
            next_visit: new Date().toString()
        });
    }

    /**
     * If the user confirms the delete, then delete the revisit and close the modal.
     *
     * @return {void} - This function does not return any value
     */
    const handleDeleteConfirm = (): void => {
        deleteRevisit(false, () => setShowDeleteModal(false));
    }

    /**
     * Effect to set isRefreshing to false when it changes
     * and it is false
     */
    useEffect(() => {
        if (isRefreshing) setIsRefreshing(false);
    }, [ isRefreshing ]);

    /**
     * Effect to perform revisit search every time
     * searchText changes
     */
    useEffect(() => {
        if (searchTerm.trim().length > 0) {

            if (isConnected) {
                setRevisitsPagination({ from: 0, to: 9 });
                removeRevisits();
            }

            loadRevisits({ filter, search: searchTerm, refresh: true });
            setIsRefreshing(false);
        }
    }, [ searchTerm ]);

    /**
     * Effect to set refresh flag Revisits using revisitsScreenHistory
     */
    useEffect(() => {
        if (isFocused()) {
            const prevLast = revisitsScreenHistory[revisitsScreenHistory.length - 2];
            const last = routeNames[index];

            /**
             * If the penultimate screen is different from the last screen
             * of revisitsScreenHistory, the revisits are refreshed
             */
            setRefreshRevisits(prevLast !== last);
        }
    }, [ revisitsScreenHistory ]);

    /**
     * Effect to refresh revisits if isFocused is true and if
     * refreshRevisits is true
     */
    useEffect(() => {
        if (isFocused() && refreshRevisits && isConnected) {
            removeRevisits();
            loadRevisits({ filter, search: searchTerm, refresh: true });
        }
    }, [ refreshRevisits, index ]);

    return (
        <>
            <FlatList
                contentContainerStyle={{ alignItems: 'center', padding: 24, paddingBottom: 100, flexGrow: 1 }}
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
                            containerStyle={{ marginVertical: 8 }}
                            text={ title }
                            textStyle={{ fontSize: 24 }}
                        />

                        <SearchInput
                            onClean={ handleRefreshing }
                            onSearch={ (text) => {
                                setSearchTerm(text);
                                handleResetRevisits(text);
                            } }
                            searchTerm={ searchTerm }
                            refreshing={ isRefreshing }
                        />
                    </>
                }
                ListEmptyComponent={
                    <ListEmptyComponent
                        msg={
                            (searchTerm.trim().length > 0)
                                ? `No se encontraron revisitas con la busqueda: ${ searchTerm.trim() }`
                                : emptyMessage
                        }
                        showMsg={ !isRevisitsLoading && revisits.length === 0 }
                    />
                }
                ListHeaderComponentStyle={{ alignSelf: 'flex-start' }}
                onEndReached={ handleEndReach }
                onEndReachedThreshold={ 0.5 }
                onRefresh={ () => {
                    setIsRefreshing(true);
                    handleRefreshing()
                } }
                overScrollMode="never"
                refreshing={ isRefreshing }
                renderItem={ ({ item }) => (
                    <RevisitCard
                        onDelete={ () => handleShowModal(item, setShowDeleteModal) }
                        onPass={ () => handleShowModal(item, setShowPassModal) }
                        onRevisit={ () => handleShowModal(item, setShowRevisitModal) }
                        revisit={ item }
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