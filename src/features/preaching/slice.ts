import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Interfaces */
import { Preaching, PreachingPayload, PreachingState, SetPreachingsPayload, SetSelectedDatePayload } from '../../interfaces/preaching';
import { RemoveResourcePayload, SetIsDeletingPayload, SetIsLoadingPayload } from '../../interfaces/features';

/* Initial preaching */
export const INIT_PREACHING: Preaching = {
    id: '',
    user_id: '',
    day: new Date().toString(),
    init_hour: new Date().toString(),
    final_hour: new Date().toString(),
    created_at: new Date().toString(),
    updated_at: new Date().toString()
}

/* Initial state */
const INITIAL_STATE: PreachingState = {
    isPreachingDeleting: false,
    isPreachingsLoading: false,
    isPreachingLoading: false,
    preachings: [],
    selectedDate: new Date(),
    seletedPreaching: INIT_PREACHING
}

/* Slice of management state */
const preachingSlice = createSlice({
    name: 'preaching',
    initialState: INITIAL_STATE,
    reducers: {
        addPreaching: (state, action: PayloadAction<PreachingPayload>) => {
            state.preachings = [ ...state.preachings, action.payload.preaching ];
            state.preachings = state.preachings.sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
            state.isPreachingLoading = false;
        },

        clearPreaching: (state) => {
            state.isPreachingDeleting = INITIAL_STATE.isPreachingDeleting;
            state.isPreachingLoading = INITIAL_STATE.isPreachingLoading;
            state.isPreachingsLoading = INITIAL_STATE.isPreachingsLoading;
            state.preachings = INITIAL_STATE.preachings;
            state.selectedDate = INITIAL_STATE.selectedDate;
            state.seletedPreaching = INITIAL_STATE.seletedPreaching;
        },

        removePreaching: (state, action: PayloadAction<RemoveResourcePayload>) => {
            state.preachings = state.preachings.filter(p => p.id !== action.payload.id);
            state.isPreachingDeleting = false;
        },

        setIsPreachingDeleting: (state, action: PayloadAction<SetIsDeletingPayload>) => {
            state.isPreachingDeleting = action.payload.isDeleting;
        },

        setIsPreachingLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
            state.isPreachingLoading = action.payload.isLoading;
        },

        setIsPreachingsLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
            state.isPreachingsLoading = action.payload.isLoading;
        },

        setPreachings: (state, action: PayloadAction<SetPreachingsPayload>) => {
            state.preachings = action.payload.preachings;
            state.isPreachingsLoading = false;
        },

        setSelectedDate: (state, action: PayloadAction<SetSelectedDatePayload>) => {
            state.selectedDate = action.payload.selectedDate;
        },

        setSelectedPreaching: (state, action: PayloadAction<PreachingPayload>) => {
            state.seletedPreaching = action.payload.preaching;
            state.isPreachingLoading = false;
        },

        updatePreaching: (state, action: PayloadAction<PreachingPayload>) => {
            state.preachings = state.preachings.map(preaching =>
                (preaching.id === action.payload.preaching.id)
                    ? action.payload.preaching
                    : preaching
            );
            state.preachings = state.preachings.sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
            state.isPreachingLoading = false;
        }
    }
});

export const {
    addPreaching,
    clearPreaching,
    removePreaching,
    setIsPreachingDeleting,
    setIsPreachingLoading,
    setIsPreachingsLoading,
    setPreachings,
    setSelectedDate,
    setSelectedPreaching,
    updatePreaching
} = preachingSlice.actions;
export default preachingSlice.reducer;
