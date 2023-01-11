import React, { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { RevisitModal } from '../../../screens/revisits';
import { DeleteModal } from '../../../screens/ui';

import { ListEmptyComponent } from './ListEmptyComponent';
import { ListFooterComponent } from './ListFooterComponent';
import { RevisitCard } from '../RevisitCard';
import { Title } from '../../ui';

import { useRevisits } from '../../../hooks';

import { RevisitsListProps } from './interfaces';
import { Revisit } from '../../../interfaces/revisits';

import themeStyles from '../../../theme/styles';

export const RevisitsList: FC<RevisitsListProps> = ({ filter, title, emptyMessage }) => {
    const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState<boolean>(false);
    const [ showRevisitModal, setShowRevisitModal ] = useState<boolean>(false);

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

    const handleRefreshing = () => {
        setRevisitsPagination({ from: 0, to: 9 });
        removeRevisits();
        loadRevisits(filter, true);
        setIsRefreshing(false);
    }

    const handleEndReach = () => {
        if (!hasMoreRevisits || isRevisitsLoading) return;
        loadRevisits(filter);
    }

    const handleShowModal = (revisit: Revisit, setShowModal: (value: boolean) => void) => {
        setSelectedRevisit(revisit);
        setShowModal(true);
    }

    const handleHideModal = (setShowModal: (value: boolean) => void) => {
        setShowModal(false);
        setSelectedRevisit({
            id: '',
            user_id: '',
            person_name: '',
            about: '',
            address: '',
            next_visit: new Date().toString(),
            done: false,
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        });
    }

    const handleDeleteConfirm = () => {
        deleteRevisit(false, () => setShowDeleteModal(false));
    }

    useEffect(() => {
        if (isFocused()) {
            const prevLast = revisitsScreenHistory[revisitsScreenHistory.length - 2];
            const last = routeNames[index];

            setRefreshRevisits(prevLast !== last);
        }
    }, [ revisitsScreenHistory ]);

    useEffect(() => {
        if (isFocused() && refreshRevisits) {
            removeRevisits();
            loadRevisits(filter, true);
        }
    }, [ refreshRevisits, index ]);

    return (
        <>
            <FlatList
                contentContainerStyle={{ alignItems: 'center', paddingBottom: 100, flexGrow: 1 }}
                data={ revisits }
                keyExtractor={ (item) => item.id }
                ListFooterComponent={ ListFooterComponent }
                ListHeaderComponent={
                    <Title
                        containerStyle={ themeStyles.titleContainerSpacingVertical }
                        text={ title }
                        textStyle={{ fontSize: 24 }}
                    />
                }
                ListEmptyComponent={ <ListEmptyComponent msg={ emptyMessage } /> }
                ListHeaderComponentStyle={{ alignSelf: 'flex-start' }}
                onEndReached={ handleEndReach }
                onEndReachedThreshold={ 0.5 }
                onRefresh={ handleRefreshing }
                overScrollMode="never"
                refreshing={ isRefreshing }
                renderItem={ ({ item }) => (
                    <RevisitCard
                        revisit={ item }
                        onDelete={ () => handleShowModal(item, setShowDeleteModal) }
                        onRevisit={ () => handleShowModal(item, setShowRevisitModal) }
                    />
                ) }
            />

            <RevisitModal
                isOpen={ showRevisitModal }
                onClose={ () => handleHideModal(setShowRevisitModal) }
            />

            <DeleteModal
                isLoading={ isRevisitDeleting }
                isOpen={ showDeleteModal }
                onClose={ () => handleHideModal(setShowDeleteModal) }
                onConfirm={ handleDeleteConfirm }
                text="¿Estás seguro de eliminar está revisita?"
            />
        </>
    );
}