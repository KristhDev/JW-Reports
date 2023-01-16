import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    RevisitPayload,
    RevisitsState,
    SetRevisitsPayload,
    SetRefreshRevisitsPayload
} from '../../interfaces/revisits';

import {
    RemoveResourcePayload,
    SetIsDeletingPayload,
    SetIsLoadingPayload,
    HistoryPayload,
    PaginationPayload,
    HasMorePayload
} from '../../interfaces/features';

const INITIAL_STATE: RevisitsState = {
    hasMoreRevisits: true,
    isRevisitDeleting: false,
    isRevisitLoading: false,
    isRevisitsLoading: false,
    refreshRevisits: false,
    revisits: [],
    revisitsScreenHistory: [],
    revisitsPagination: {
        from: 0,
        to: 9
    },
    selectedRevisit: {
        id: '',
        user_id: '',
        person_name: '',
        about: '',
        address: '',
        next_visit: new Date().toString(),
        done: false,
        created_at: new Date().toString(),
        updated_at: new Date().toString()
    }
}

const revisitsSlice = createSlice({
    name: 'revisits',
    initialState: INITIAL_STATE,
    reducers: {
        addRevisit: (state, action: PayloadAction<RevisitPayload>) => {
            state.revisits = [ action.payload.revisit, ...state.revisits ];
            state.revisits = state.revisits.sort((a, b) => new Date(b.next_visit).getTime() - new Date(a.next_visit).getTime());
            state.isRevisitLoading = false;
        },

        addRevisits: (state, action: PayloadAction<SetRevisitsPayload>) => {
            state.revisits = [ ...state.revisits, ...action.payload.revisits ];
            state.isRevisitsLoading = false;
        },

        clearRevisits: (state) => {
            state.hasMoreRevisits = true;
            state.refreshRevisits = false;
            state.isRevisitLoading = false;
            state.isRevisitsLoading = false;
            state.revisits = [];
            state.revisitsScreenHistory = [];
            state.revisitsPagination = {
                from: 0,
                to: 9
            }
            state.selectedRevisit = {
                id: '',
                user_id: '',
                person_name: '',
                about: '',
                address: '',
                next_visit: new Date().toString(),
                done: false,
                created_at: new Date().toString(),
                updated_at: new Date().toString()
            }
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
            state.revisits = state.revisits.map(revisit =>
                (revisit.id === action.payload.revisit.id)
                    ? action.payload.revisit
                    : revisit
            );
            state.revisits = state.revisits.sort((a, b) => new Date(b.next_visit).getTime() - new Date(a.next_visit).getTime());
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
    setRevisits,
    setRevisitsScreenHistory,
    setRevisitsPagination,
    setSelectedRevisit,
    updateRevisit
} = revisitsSlice.actions;
export default revisitsSlice.reducer;