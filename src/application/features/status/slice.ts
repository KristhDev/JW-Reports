import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Interfaces */
import { StatusState, SetStatusPayload } from './types';

/* Initial state */
export const STATUS_INITIAL_STATE: StatusState = {
    code: 200,
    msg: ''
}

/* Slice of management state */
const statusSlice = createSlice({
    name: 'status',
    initialState: STATUS_INITIAL_STATE,
    reducers: {
        clearStatus: (state) => {
            state.code = STATUS_INITIAL_STATE.code;
            state.msg = STATUS_INITIAL_STATE.msg;
        },

        setStatus: (state, action: PayloadAction<SetStatusPayload>) => {
            state.code = action.payload.code;
            state.msg = action.payload.msg;
        }
    }
});

export const { clearStatus, setStatus } = statusSlice.actions;
export default statusSlice.reducer;