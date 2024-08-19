import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Interfaces */
import { SetIsVisiblePayload, UIState } from '../interfaces';

/* utils */
import { getUIStored } from '../utils';

export const UI_INITIAL_STATE: UIState = {
    isKeyboardVisible: false,
    userInterface: getUIStored()
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: UI_INITIAL_STATE,
    reducers: {
        setIsKeyboardVisible: (state, action: PayloadAction<SetIsVisiblePayload>) => {
            state.isKeyboardVisible = action.payload.isVisible;
        },

        setOldDatetimePicker: (state, action: PayloadAction<SetIsVisiblePayload>) => {
            state.userInterface.oldDatetimePicker = action.payload.isVisible;
        }
    }
});

export const { setIsKeyboardVisible, setOldDatetimePicker } = uiSlice.actions;
export default uiSlice.reducer;

