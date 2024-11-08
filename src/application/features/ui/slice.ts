import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Interfaces */
import { SetIsVisiblePayload, SetOldDatetimePickerPayload, UIState } from './types';
import { SetIsExportingPayload } from '../types';

/* Functions */
import { getUIStored } from '../functions';

export const UI_INITIAL_STATE: UIState = {
    isDataExporting: false,
    isKeyboardVisible: false,
    userInterface: getUIStored()
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: UI_INITIAL_STATE,
    reducers: {
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

export const { setIsDataExporting, setIsKeyboardVisible, setOldDatetimePicker } = uiSlice.actions;
export default uiSlice.reducer;

