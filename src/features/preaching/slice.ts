import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PreachingState, AddPreachingPayload, SetSelectedDatePayload, SetIsPreachingsLoadingPayload, SetPreachingsPayload } from '../../interfaces/preaching';

const INITIAL_STATE: PreachingState = {
    isPreachingsLoading: false,
    preachings: [],
    selectedDate: new Date(),
}

const preachingSlice = createSlice({
    name: 'preaching',
    initialState: INITIAL_STATE,
    reducers: {
        setPreachings: (state, action: PayloadAction<SetPreachingsPayload>) => {
            state.preachings = action.payload.preachings;
            state.isPreachingsLoading = false;
        },

        addPreaching: (state, action: PayloadAction<AddPreachingPayload>) => {
            state.preachings = [ ...state.preachings, action.payload.preaching ];
            state.preachings = state.preachings.sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
        },

        setIsPreachingsLoading: (state, action: PayloadAction<SetIsPreachingsLoadingPayload>) => {
            state.isPreachingsLoading = action.payload.isLoading;
        },

        setSelectedDate: (state, action: PayloadAction<SetSelectedDatePayload>) => {
            state.selectedDate = action.payload.selectedDate;
        },

        clearPreaching: (state) => {
            state.isPreachingsLoading = false;
            state.preachings = [];
            state.selectedDate = new Date();
        }
    }
});

export const { setPreachings, addPreaching, setSelectedDate, setIsPreachingsLoading, clearPreaching } = preachingSlice.actions;
export default preachingSlice.reducer;