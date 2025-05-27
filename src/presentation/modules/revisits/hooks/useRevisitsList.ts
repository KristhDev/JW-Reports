import { useCallback, useMemo, useState } from 'react';

import { revisitsService } from '@config/di';

import { revisitsFilters } from '@application/constants/utils';

import { useRevisits } from '@revisits/hooks';
import { useNetwork } from '@shared/hooks';
import { useTranslation } from '@ui/hooks';

import { RevisitFilter } from '@revisits/interfaces';

const useRevisitsList = () => {
    const revisitsFiltersItems = revisitsService.revisitsFiltersItems;

    const [ searchTerm, setSearchTerm ] = useState<string>('');
    const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);

    const {
        state: {
            hasMoreRevisits,
            isRevisitsLoading,
            revisitFilter,
            revisits
        },
        removeRevisits,
        setRevisitsPagination,
        loadRevisits,
    } = useRevisits();

    const [ filter, setFilter ] = useState<RevisitFilter>(revisitFilter);

    const { wifi } = useNetwork();
    const { translate } = useTranslation();

    const generateEmptyMsg = (filter: RevisitFilter): string => {
        if (filter === revisitsFilters.ALL) return translate('messages.revisits.notAdded');
        if (filter === revisitsFilters.VISITED) return translate('messages.revisits.noMade');
        if (filter === revisitsFilters.UNVISITED) return translate('messages.revisits.noVisit');
    
        return translate('messages.revisits.notAdded');
    }

    const noFoundResultsMsg = translate('messages.noResults', {
        attribute: translate('entities.revisits'),
        search: searchTerm.trim()
    });

    const emptyMessage = useMemo(() => generateEmptyMsg(filter), [ filter, translate ]);

    const emptyMsg = useMemo(
        () => (searchTerm.trim().length > 0) ? noFoundResultsMsg : emptyMessage,
        [ searchTerm, noFoundResultsMsg, emptyMessage ]
    );

    /**
     * When the user refreshes the page, the search term is reset, the pagination is reset, the
     * revisits are removed, and the revisits are loaded.
     *
     * @return {Promise<void>} This function returns nothing
     */
    const onRefreshingRevisits = useCallback(async (): Promise<void> => {
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
    const onSearchRevisits = useCallback(async (search: string): Promise<void> => {
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
    const onEndReach = useCallback( async (): Promise<void> => {
        if (!hasMoreRevisits || revisits.length === 0 || isRevisitsLoading || !wifi.hasConnection) return;
        await loadRevisits({ filter, search: searchTerm, loadMore: true });
    }, [ hasMoreRevisits, revisits.length, isRevisitsLoading, wifi.hasConnection, filter, searchTerm ]);

    const onMountRevisits = useCallback(async (): Promise<void> => {
        if (isRevisitsLoading) return;

        removeRevisits();
        loadRevisits({ filter, search: searchTerm, refresh: true });
    }, [ filter, isRevisitsLoading ]);

    return {
        emptyMsg,
        isRefreshing,
        isRevisitsLoading,
        revisits,
        revisitsFiltersItems,
        searchTerm,

        filter,
        setFilter,

        onEndReach,
        onMountRevisits,
        onRefreshingRevisits,
        onSearchRevisits
    }
}

export default useRevisitsList;