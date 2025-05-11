import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Entities */
import { RevisitEntity } from '@domain/entities';

/* Interfaces */
import {
    HasMorePayload,
    HistoryPayload,
    PaginationPayload,
    RemoveResourcePayload,
    SetIsDeletingPayload,
    SetIsExportingPayload,
    SetIsLoadingPayload
} from '../types';

import {
    RevisitPayload,
    RevisitsState,
    SetRefreshRevisitsPayload,
    SetRevisitsPayload
} from './types';

import { RevisitFilter } from '@revisits/interfaces';
import { FilterUtil, SorterUtil } from '@utils';

/* Initial revisit */
export const INIT_REVISIT: RevisitEntity = {
    id: '',
    userId: '',
    personName: '',
    about: '',
    address: '',
    nextVisit: new Date().toISOString(),
    done: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
}

/* Initial state */
export const REVISITS_INITIAL_STATE: RevisitsState = {
    hasMoreRevisits: true,
    isLastRevisitLoading: false,
    isRevisitDeleting: false,
    isRevisitLoading: false,
    isRevisitsExporting: false,
    isRevisitsLoading: false,
    lastRevisit: INIT_REVISIT,
    refreshRevisits: false,
    revisitFilter: 'all',
    revisits: [],
    revisitsScreenHistory: [],
    revisitsPagination: {
        from: 0,
        to: 9
    },
    selectedRevisit: INIT_REVISIT
}

/* Slice of management state */
const revisitsSlice = createSlice({
    name: 'revisits',
    initialState: REVISITS_INITIAL_STATE,
    reducers: {
        addRevisit: (state, action: PayloadAction<RevisitPayload>) => {
            const revisitsFiltered = FilterUtil.filterRevisitsBy([ action.payload.revisit, ...state.revisits ], state.revisitFilter);
            const sortedRevisits = SorterUtil.sortRevisitsByNextVisit(revisitsFiltered);

            state.revisits = sortedRevisits;
        },

        addRevisits: (state, action: PayloadAction<SetRevisitsPayload>) => {
            state.revisits = [ ...state.revisits, ...action.payload.revisits ];
        },

        clearRevisits: (state) => {
            state.hasMoreRevisits = REVISITS_INITIAL_STATE.hasMoreRevisits;
            state.isRevisitDeleting = REVISITS_INITIAL_STATE.isRevisitDeleting;
            state.isRevisitLoading = REVISITS_INITIAL_STATE.isRevisitLoading;
            state.isRevisitsLoading = REVISITS_INITIAL_STATE.isRevisitsLoading;
            state.refreshRevisits = REVISITS_INITIAL_STATE.refreshRevisits;
            state.revisitFilter = REVISITS_INITIAL_STATE.revisitFilter;
            state.revisits = REVISITS_INITIAL_STATE.revisits;
            state.revisitsPagination = REVISITS_INITIAL_STATE.revisitsPagination;
            state.revisitsScreenHistory = REVISITS_INITIAL_STATE.revisitsScreenHistory;
            state.selectedRevisit = REVISITS_INITIAL_STATE.selectedRevisit;
        },

        removeRevisit: (state, action: PayloadAction<RemoveResourcePayload>) => {
            state.revisits = state.revisits.filter(r => r.id !== action.payload.id);
        },

        removeRevisits: (state) => {
            state.revisits = [];
        },

        setHasMoreRevisits: (state, action: PayloadAction<HasMorePayload>) => {
            state.hasMoreRevisits = action.payload.hasMore;
        },

        setIsLastRevisitLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
            state.isLastRevisitLoading = action.payload.isLoading;
        },

        setIsRevisitDeleting: (state, action: PayloadAction<SetIsDeletingPayload>) => {
            state.isRevisitDeleting = action.payload.isDeleting;
        },

        setIsRevisitLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
            state.isRevisitLoading = action.payload.isLoading;
        },

        setIsRevisitsExporting: (state, action: PayloadAction<SetIsExportingPayload>) => {
            state.isRevisitsExporting = action.payload.isExporting;
        },

        setIsRevisitsLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
            state.isRevisitsLoading = action.payload.isLoading;
        },

        setLastRevisit: (state, action: PayloadAction<RevisitPayload>) => {
            state.lastRevisit = action.payload.revisit;
        },

        setRefreshRevisits: (state, action: PayloadAction<SetRefreshRevisitsPayload>) => {
            state.refreshRevisits = action.payload.refresh;
        },

        setRevisitFilter: (state, action: PayloadAction<{ filter: RevisitFilter }>) => {
            state.revisitFilter = action.payload.filter;
        },

        setRevisits: (state, action: PayloadAction<SetRevisitsPayload>) => {
            state.revisits = [ ...action.payload.revisits ];
        },

        setRevisitsPagination: (state, action: PayloadAction<PaginationPayload>) => {
            state.revisitsPagination = action.payload.pagination;
        },

        setRevisitsScreenHistory: (state, action: PayloadAction<HistoryPayload>) => {
            state.revisitsScreenHistory = [ ...state.revisitsScreenHistory, action.payload.newScreen ]
        },

        setSelectedRevisit: (state, action: PayloadAction<RevisitPayload>) => {
            state.selectedRevisit = action.payload.revisit;
        },

        updateRevisit: (state, action: PayloadAction<RevisitPayload>) => {
            const updatedRevists = state.revisits.map(
                r => r.id === action.payload.revisit.id
                    ? action.payload.revisit
                    : r
            )

            const filteredRevisits = FilterUtil.filterRevisitsBy(updatedRevists, state.revisitFilter);
            const sortedRevisits = SorterUtil.sortRevisitsByNextVisit(filteredRevisits);

            state.revisits = sortedRevisits;
        }
    }
});

export const {
    addRevisit,
    addRevisits,
    clearRevisits,
    removeRevisit,
    removeRevisits,
    setHasMoreRevisits,
    setIsLastRevisitLoading,
    setIsRevisitDeleting,
    setIsRevisitsExporting,
    setIsRevisitLoading,
    setIsRevisitsLoading,
    setLastRevisit,
    setRefreshRevisits,
    setRevisitFilter,
    setRevisits,
    setRevisitsPagination,
    setRevisitsScreenHistory,
    setSelectedRevisit,
    updateRevisit
} = revisitsSlice.actions;
export default revisitsSlice.reducer;