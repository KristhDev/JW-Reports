import React, { FC, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ListEmptyComponent } from './ListEmptyComponent';
import { ListFooterComponent } from './ListFooterComponent';
import { renderItem } from './renderItem';
import { Title } from '../../ui';

import { useRevisits } from '../../../hooks';

import { RevisitsListProps } from './interfaces';

import themeStyles from '../../../theme/styles';

export const RevisitsList: FC<RevisitsListProps> = ({ filter, title, emptyMessage }) => {
    const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);
    const { getState, isFocused } = useNavigation();
    const { index, routeNames } = getState();

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
            renderItem={ renderItem }
        />
    );
}