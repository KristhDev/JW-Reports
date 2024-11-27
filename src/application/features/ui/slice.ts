import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Interfaces */
import { Keyboard, SetKeyboardPayload, SetOldDatetimePickerPayload, UIState } from './types';
import { SetIsExportingPayload } from '../types';

export const INITIAL_KEYBOARD: Keyboard = {
    height: 0,
    isVisible: false
}

export const UI_INITIAL_STATE: UIState = {
    activeFormField: '',
    isDataExporting: false,
    keyboard: INITIAL_KEYBOARD,
    recordedAudio: '',
    userInterface: {
        oldDatetimePicker: false
    }
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: UI_INITIAL_STATE,
    reducers: {
        setActiveFormField: (state, action: PayloadAction<{ activeFormField: string }>) => {
            state.activeFormField = action.payload.activeFormField;
        },

        setIsDataExporting: (state, action: PayloadAction<SetIsExportingPayload>) => {
            state.isDataExporting = action.payload.isExporting;
        },

        setKeyboard: (state, action: PayloadAction<SetKeyboardPayload>) => {
            state.keyboard = action.payload.keyboard;
        },

        setOldDatetimePicker: (state, action: PayloadAction<SetOldDatetimePickerPayload>) => {
            state.userInterface.oldDatetimePicker = action.payload.oldDatetimePicker;
        },

        setRecordedAudio: (state, action: PayloadAction<{ recordedAudio: string }>) => {
            state.recordedAudio = action.payload.recordedAudio;
        },
    }
});

export const { setActiveFormField, setIsDataExporting, setKeyboard, setOldDatetimePicker, setRecordedAudio } = uiSlice.actions;
export default uiSlice.reducer;

