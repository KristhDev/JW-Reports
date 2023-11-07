import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Interfaces */
import {
    HasMorePayload,
    HistoryPayload,
    PaginationPayload,
    RemoveResourcePayload,
    Revisit,
    RevisitFilter,
    RevisitPayload,
    RevisitsState,
    SetIsDeletingPayload,
    SetIsLoadingPayload,
    SetRefreshRevisitsPayload,
    SetRevisitsPayload
} from '../../interfaces';

/* Initial revisit */
export const INIT_REVISIT: Revisit = {
    id: '',
    userId: '',
    personName: '',
    about: '',
    address: '',
    nextVisit: new Date().toString(),
    done: false,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString()
}

/* Initial state */
export const REVISITS_INITIAL_STATE: RevisitsState = {
    hasMoreRevisits: true,
    isRevisitDeleting: false,
    isRevisitLoading: false,
    isRevisitsLoading: false,
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

/**
 * It takes a list of revisits and a filter, and returns a filtered list of revisits
 * @param {Revisit[]} revisits - Revisit[]
 * @param {RevisitFilter} filter - RevisitFilter
 * @returns A function that returns the filtered revisits.
 */
const filterRevisits = (revisits: Revisit[], filter: RevisitFilter) => {
    const revisitsFiltereds = {
        all: () => revisits,
        unvisited: () => revisits.filter(c => !c.done),
        visited: () => revisits.filter(c => c.done),
    }

    return revisitsFiltereds[filter]();
}

/* Slice of management state */
const revisitsSlice = createSlice({
    name: 'revisits',
    initialState: REVISITS_INITIAL_STATE,
    reducers: {
        addRevisit: (state, action: PayloadAction<RevisitPayload>) => {
            state.revisits = filterRevisits([ action.payload.revisit, ...state.revisits ], state.revisitFilter);
            state.revisits = state.revisits.sort((a, b) => new Date(b.nextVisit).getTime() - new Date(a.nextVisit).getTime());
            state.isRevisitLoading = false;
        },

        addRevisits: (state, action: PayloadAction<SetRevisitsPayload>) => {
            state.revisits = [ ...state.revisits, ...action.payload.revisits ];
            state.isRevisitsLoading = false;
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
            state.isRevisitDeleting = false;
        },

        removeRevisits: (state) => {
            state.revisits = [];
        },

        setHasMoreRevisits: (state, action: PayloadAction<HasMorePayload>) => {
            state.hasMoreRevisits = action.payload.hasMore;
        },

        setIsRevisitDeleting: (state, action: PayloadAction<SetIsDeletingPayload>) => {
            state.isRevisitDeleting = action.payload.isDeleting;
        },

        setIsRevisitLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
            state.isRevisitLoading = action.payload.isLoading;
        },

        setIsRevisitsLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
            state.isRevisitsLoading = action.payload.isLoading;
        },

        setRefreshRevisits: (state, action: PayloadAction<SetRefreshRevisitsPayload>) => {
            state.refreshRevisits = action.payload.refresh;
        },

        setRevisitFilter: (state, action: PayloadAction<{ filter: RevisitFilter }>) => {
            state.revisitFilter = action.payload.filter;
        },

        setRevisits: (state, action: PayloadAction<SetRevisitsPayload>) => {
            state.revisits = [ ...action.payload.revisits ];
            state.isRevisitsLoading = false;
        },

        setRevisitsPagination: (state, action: PayloadAction<PaginationPayload>) => {
            state.revisitsPagination = action.payload.pagination;
        },

        setRevisitsScreenHistory: (state, action: PayloadAction<HistoryPayload>) => {
            state.revisitsScreenHistory = [ ...state.revisitsScreenHistory, action.payload.newScreen ]
        },

        setSelectedRevisit: (state, action: PayloadAction<RevisitPayload>) => {
            state.selectedRevisit = action.payload.revisit;
            state.isRevisitLoading = false;
        },

        updateRevisit: (state, action: PayloadAction<RevisitPayload>) => {
            state.revisits = filterRevisits(state.revisits.map(revisit =>
                (revisit.id === action.payload.revisit.id)
                    ? action.payload.revisit
                    : revisit
            ), state.revisitFilter);
            state.revisits = state.revisits.sort((a, b) => new Date(b.nextVisit).getTime() - new Date(a.nextVisit).getTime());
            state.selectedRevisit = (state.selectedRevisit.id === action.payload.revisit.id)
                ? action.payload.revisit
                : state.selectedRevisit;
            state.isRevisitLoading = false;
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
    setIsRevisitDeleting,
    setIsRevisitLoading,
    setIsRevisitsLoading,
    setRefreshRevisits,
    setRevisitFilter,
    setRevisits,
    setRevisitsPagination,
    setRevisitsScreenHistory,
    setSelectedRevisit,
    updateRevisit
} = revisitsSlice.actions;
export default revisitsSlice.reducer;