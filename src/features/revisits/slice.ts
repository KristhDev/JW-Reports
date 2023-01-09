import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    AddRevisitPayload,
    RemoveRevisitPayload,
    RevisitsState,
    SetHasMoreRevisitsPayload,
    SetIsRevisitDeletingPayload,
    SetIsRevisitLoadingPayload,
    SetIsRevisitsLoadingPayload,
    SetRevisitsPayload,
    SetRevisitsPaginationPayload,
    SetSelectedRevisitPayload,
    UpdateRevisitPayload
} from '../../interfaces/revisits';

const INITIAL_STATE: RevisitsState = {
    hasMoreRevisits: true,
    isRevisitDeleting: false,
    isRevisitLoading: false,
    isRevisitsLoading: false,
    revisits: [],
    revisitsPagination: {
        from: 0,
        to: 9
    },
    seletedRevisit: {
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
        addRevisit: (state, action: PayloadAction<AddRevisitPayload>) => {
            state.revisits = [ action.payload.revisit, ...state.revisits ];
            state.revisits = state.revisits.sort((a, b) => new Date(b.next_visit).getTime() - new Date(a.next_visit).getTime());
            state.isRevisitLoading = false;
        },

        clearRevisits: (state) => {
            state.hasMoreRevisits = true;
            state.isRevisitLoading = false;
            state.isRevisitsLoading = false;
            state.revisits = [];
            state.revisitsPagination = {
                from: 0,
                to: 9
            }
            state.seletedRevisit = {
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

        removeRevisit: (state, action: PayloadAction<RemoveRevisitPayload>) => {
            state.revisits = state.revisits.filter(r => r.id !== action.payload.id);
            state.isRevisitDeleting = false;
        },

        removeRevisits: (state) => {
            state.revisits = [];
        },

        setHasMoreRevisits: (state, action: PayloadAction<SetHasMoreRevisitsPayload>) => {
            state.hasMoreRevisits = action.payload.hasMore;
        },

        setIsRevisitDeleting: (state, action: PayloadAction<SetIsRevisitDeletingPayload>) => {
            state.isRevisitDeleting = action.payload.isDeleting;
        },

        setIsRevisitLoading: (state, action: PayloadAction<SetIsRevisitLoadingPayload>) => {
            state.isRevisitLoading = action.payload.isLoading;
        },

        setIsRevisitsLoading: (state, action: PayloadAction<SetIsRevisitsLoadingPayload>) => {
            state.isRevisitsLoading = action.payload.isLoading;
        },

        setRevisits: (state, action: PayloadAction<SetRevisitsPayload>) => {
            state.revisits = [ ...state.revisits, ...action.payload.revisits ];
            state.isRevisitsLoading = false;
        },

        setRevisitsPagination: (state, action: PayloadAction<SetRevisitsPaginationPayload>) => {
            state.revisitsPagination = action.payload.pagination;
        },

        setSelectedRevisit: (state, action: PayloadAction<SetSelectedRevisitPayload>) => {
            state.seletedRevisit = action.payload.revisit;
            state.isRevisitLoading = false;
        },

        updateRevisit: (state, action: PayloadAction<UpdateRevisitPayload>) => {
            state.revisits = state.revisits.map(revisit =>
                (revisit.id === action.payload.revisit.id)
                    ? action.payload.revisit
                    : revisit
            );
            state.isRevisitLoading = false;
        }
    }
});

export const {
    addRevisit,
    clearRevisits,
    removeRevisit,
    removeRevisits,
    setHasMoreRevisits,
    setIsRevisitDeleting,
    setIsRevisitLoading,
    setIsRevisitsLoading,
    setRevisits,
    setRevisitsPagination,
    setSelectedRevisit,
    updateRevisit
} = revisitsSlice.actions;
export default revisitsSlice.reducer;