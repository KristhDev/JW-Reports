import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StatusState, SetStatusPayload } from '../../interfaces/status';

const INITIAL_STATE: StatusState = {
    code: 200,
    msg: ''
}

const statusSlice = createSlice({
    name: 'status',
    initialState: INITIAL_STATE,
    reducers: {
        clearStatus: (state) => {
            state.code = INITIAL_STATE.code;
            state.msg = INITIAL_STATE.msg;
        },

        setStatus: (state, action: PayloadAction<SetStatusPayload>) => {
            state.code = action.payload.code;
            state.msg = action.payload.msg;
        }
    }
});

export const { clearStatus, setStatus } = statusSlice.actions;
export default statusSlice.reducer;