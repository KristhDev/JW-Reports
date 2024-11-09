import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Interfaces */
import { SetIsVisiblePayload, SetOldDatetimePickerPayload, UIState } from './types';
import { SetIsExportingPayload } from '../types';

/* Functions */
import { getUIStored } from '../functions';

export const UI_INITIAL_STATE: UIState = {
    activeFormField: '',
    isDataExporting: false,
    isKeyboardVisible: false,
    recordedAudio: '',
    userInterface: getUIStored()
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: UI_INITIAL_STATE,
    reducers: {
        setActiveFormField: (state, action: PayloadAction<{ activeFormField: string }>) => {
            state.activeFormField = action.payload.activeFormField;
        },

        setRecordedAudio: (state, action: PayloadAction<{ recordedAudio: string }>) => {
            state.recordedAudio = action.payload.recordedAudio;
        },

        setIsDataExporting: (state, action: PayloadAction<SetIsExportingPayload>) => {
            state.isDataExporting = action.payload.isExporting;
        },

        setIsKeyboardVisible: (state, action: PayloadAction<SetIsVisiblePayload>) => {
            state.isKeyboardVisible = action.payload.isVisible;
        },

        setOldDatetimePicker: (state, action: PayloadAction<SetOldDatetimePickerPayload>) => {
            state.userInterface.oldDatetimePicker = action.payload.oldDatetimePicker;
        }
    }
});

export const { setIsDataExporting, setActiveFormField, setRecordedAudio, setIsKeyboardVisible, setOldDatetimePicker } = uiSlice.actions;
export default uiSlice.reducer;

