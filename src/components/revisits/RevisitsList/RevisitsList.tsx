import React, { useState } from 'react';
import { FlatList } from 'react-native';

import { ListEmptyComponent } from './ListEmptyComponent';
import { ListFooterComponent } from './ListFooterComponent';
import { renderItem } from './renderItem';
import { Title } from '../../ui';

import { useRevisits } from '../../../hooks';

import themeStyles from '../../../theme/styles';

export const RevisitsList = () => {
    const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);

    const {
        state: {
            hasMoreRevisits,
            isRevisitsLoading,
            revisits,
        },
        removeRevisits,
        setRevisitsPagination,
        loadRevisits,
    } = useRevisits();

    const handleRefreshing = () => {
        setRevisitsPagination({ from: 0, to: 9 });
        removeRevisits();
        loadRevisits(true);
        setIsRefreshing(false);
    }

    const handleEndReach = () => {
        if (!hasMoreRevisits || isRevisitsLoading) return;
        loadRevisits();
    }

    return (
        <FlatList
            contentContainerStyle={{ alignItems: 'center', paddingBottom: 100, flexGrow: 1 }}
            data={ revisits }
            keyExtractor={ (item) => item.id }
            ListFooterComponent={ ListFooterComponent }
            ListHeaderComponent={
                <Title
                    containerStyle={ themeStyles.titleContainerSpacingVertical }
                    text="ÚLTIMAS REVISITAS"
                    textStyle={{ fontSize: 24 }}
                />
            }
            ListEmptyComponent={ ListEmptyComponent }
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