import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Interfaces */
import { PreachingEntity } from '@domain/entities';
import { RemoveResourcePayload, SetIsDeletingPayload, SetIsExportingPayload, SetIsLoadingPayload } from '../types';
import { PreachingPayload, PreachingState, SetPreachingsPayload, SetSelectedDatePayload } from './types';

/* Utils */
import { SorterUtil } from '@utils';

/* Initial preaching */
export const INIT_PREACHING: PreachingEntity = {
    id: '',
    userId: '',
    day: new Date().toISOString(),
    initHour: new Date().toISOString(),
    finalHour: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
}

/* Initial state */
export const PREACHING_INITIAL_STATE: PreachingState = {
    isPreachingDeleting: false,
    isPreachingsExporting: false,
    isPreachingsLoading: false,
    preachings: [],
    selectedDate: new Date(),
    seletedPreaching: INIT_PREACHING
}

/* Slice of management state */
const preachingSlice = createSlice({
    name: 'preaching',
    initialState: PREACHING_INITIAL_STATE,
    reducers: {
        addPreaching: (state, action: PayloadAction<PreachingPayload>) => {
            const sortedPreachings = SorterUtil.sortPreachingsByDay([ ...state.preachings, action.payload.preaching ]);
            state.preachings = sortedPreachings;
        },

        clearPreaching: (state) => {
            state.isPreachingDeleting = PREACHING_INITIAL_STATE.isPreachingDeleting;
            state.isPreachingsLoading = PREACHING_INITIAL_STATE.isPreachingsLoading;
            state.preachings = PREACHING_INITIAL_STATE.preachings;
            state.selectedDate = PREACHING_INITIAL_STATE.selectedDate;
            state.seletedPreaching = PREACHING_INITIAL_STATE.seletedPreaching;
        },

        removePreaching: (state, action: PayloadAction<RemoveResourcePayload>) => {
            state.preachings = state.preachings.filter(p => p.id !== action.payload.id);
        },

        setIsPreachingDeleting: (state, action: PayloadAction<SetIsDeletingPayload>) => {
            state.isPreachingDeleting = action.payload.isDeleting;
        },

        setIsPreachingsExporting: (state, action: PayloadAction<SetIsExportingPayload>) => {
            state.isPreachingsExporting = action.payload.isExporting;
        },

        setIsPreachingsLoading: (state, action: PayloadAction<SetIsLoadingPayload>) => {
            state.isPreachingsLoading = action.payload.isLoading;
        },

        setPreachings: (state, action: PayloadAction<SetPreachingsPayload>) => {
            state.preachings = action.payload.preachings;
        },

        setSelectedDate: (state, action: PayloadAction<SetSelectedDatePayload>) => {
            state.selectedDate = action.payload.selectedDate;
        },

        setSelectedPreaching: (state, action: PayloadAction<PreachingPayload>) => {
            state.seletedPreaching = action.payload.preaching;
        },

        updatePreaching: (state, action: PayloadAction<PreachingPayload>) => {
            const updatedPreachings = state.preachings.map(preaching =>
                (preaching.id === action.payload.preaching.id)
                    ? action.payload.preaching
                    : preaching
            );

            const sortedPreachings = SorterUtil.sortPreachingsByDay(updatedPreachings);
            state.preachings = sortedPreachings;
        }
    }
});

export const {
    addPreaching,
    clearPreaching,
    removePreaching,
    setIsPreachingDeleting,
    setIsPreachingsExporting,
    setIsPreachingsLoading,
    setPreachings,
    setSelectedDate,
    setSelectedPreaching,
    updatePreaching
} = preachingSlice.actions;
export default preachingSlice.reducer;
