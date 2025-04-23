import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Interfaces */
import { Keyboard, SetIsAppReadyPayload, SetKeyboardPayload, SetLanguagePayload, SetOldDatetimePickerPayload, setRecordedAudioPayload, UIState } from './types';
import { SetIsExportingPayload } from '../types';

export const INITIAL_KEYBOARD: Keyboard = {
    height: 0,
    isVisible: false
}

export const UI_INITIAL_STATE: UIState = {
    activeFormField: '',
    isAppReady: false,
    isDataExporting: false,
    keyboard: INITIAL_KEYBOARD,
    recordedAudio: '',
    userInterface: {
        oldDatetimePicker: false,
        language: null,
    }
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: UI_INITIAL_STATE,
    reducers: {
        setActiveFormField: (state, action: PayloadAction<{ activeFormField: string }>) => {
            state.activeFormField = action.payload.activeFormField;
        },

        setIsAppReady: (state, action: PayloadAction<SetIsAppReadyPayload>) => {
            state.isAppReady = action.payload.isAppReady;
        },

        setIsDataExporting: (state, action: PayloadAction<SetIsExportingPayload>) => {
            state.isDataExporting = action.payload.isExporting;
        },

        setKeyboard: (state, action: PayloadAction<SetKeyboardPayload>) => {
            state.keyboard = action.payload.keyboard;
        },

        setLanguage: (state, action: PayloadAction<SetLanguagePayload>) => {
            state.userInterface.language = action.payload.language;
        },

        setOldDatetimePicker: (state, action: PayloadAction<SetOldDatetimePickerPayload>) => {
            state.userInterface.oldDatetimePicker = action.payload.oldDatetimePicker;
        },

        setRecordedAudio: (state, action: PayloadAction<setRecordedAudioPayload>) => {
            state.recordedAudio = action.payload.recordedAudio;
        },
    }
});

export const { setActiveFormField, setIsAppReady, setIsDataExporting, setKeyboard, setOldDatetimePicker, setLanguage, setRecordedAudio } = uiSlice.actions;
export default uiSlice.reducer;

