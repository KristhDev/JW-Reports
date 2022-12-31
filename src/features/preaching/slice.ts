import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    AddPreachingPayload,
    PreachingState,
    SetIsPreachingLoadingPayload,
    SetIsPreachingsLoadingPayload,
    SetPreachingsPayload,
    SetSelectedDatePayload,
    SetSelectedPreachingPayload,
    UpdatePreachingPayload
} from '../../interfaces/preaching';

const INITIAL_STATE: PreachingState = {
    isPreachingsLoading: false,
    isPreachingLoading: false,
    preachings: [],
    selectedDate: new Date(),
    seletedPreaching: {
        id: '',
        user_id: '',
        day: new Date().toString(),
        init_hour: new Date().toString(),
        final_hour: new Date().toString(),
        posts: 0,
        videos: 0,
        revisits: 0,
        created_at: new Date().toString(),
        updated_at: new Date().toString()
    }
}

const preachingSlice = createSlice({
    name: 'preaching',
    initialState: INITIAL_STATE,
    reducers: {
        addPreaching: (state, action: PayloadAction<AddPreachingPayload>) => {
            state.preachings = [ ...state.preachings, action.payload.preaching ];
            state.preachings = state.preachings.sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
            state.isPreachingLoading = false;
        },

        clearPreaching: (state) => {
            state.isPreachingsLoading = false;
            state.preachings = [];
            state.selectedDate = new Date();
        },

        setIsPreachingsLoading: (state, action: PayloadAction<SetIsPreachingsLoadingPayload>) => {
            state.isPreachingsLoading = action.payload.isLoading;
        },

        setIsPreachingLoading: (state, action: PayloadAction<SetIsPreachingLoadingPayload>) => {
            state.isPreachingLoading = action.payload.isLoading;
        },

        setPreachings: (state, action: PayloadAction<SetPreachingsPayload>) => {
            state.preachings = action.payload.preachings;
            state.isPreachingsLoading = false;
        },

        setSelectedDate: (state, action: PayloadAction<SetSelectedDatePayload>) => {
            state.selectedDate = action.payload.selectedDate;
            state.isPreachingLoading = false;
        },

        setSelectedPreaching: (state, action: PayloadAction<SetSelectedPreachingPayload>) => {
            state.seletedPreaching = action.payload.preaching;
        },

        updatePreaching: (state, action: PayloadAction<UpdatePreachingPayload>) => {
            state.preachings = state.preachings.map(preaching =>
                (preaching.id === action.payload.preaching.id)
                    ? action.payload.preaching
                    : preaching
            );
            state.isPreachingLoading = false;
        }
    }
});

export const {
    addPreaching,
    clearPreaching,
    setIsPreachingLoading,
    setIsPreachingsLoading,
    setPreachings,
    setSelectedDate,
    setSelectedPreaching,
    updatePreaching
} = preachingSlice.actions;
export default preachingSlice.reducer;