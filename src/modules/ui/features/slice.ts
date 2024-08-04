import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Interfaces */
import { SetIsVisiblePayload, UIState } from '../interfaces';

export const UI_INITIAL_STATE: UIState = {
    isKeyboardVisible: false
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: UI_INITIAL_STATE,
    reducers: {
        setIsKeyboardVisible: (state, action: PayloadAction<SetIsVisiblePayload>) => {
            state.isKeyboardVisible = action.payload.isVisible;
        }
    }
});

export const { setIsKeyboardVisible } = uiSlice.actions;
export default uiSlice.reducer;

