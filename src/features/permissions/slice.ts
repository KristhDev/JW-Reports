import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Thunks */
import { checkPermissions } from './thunks';

/* Interfaces */
import { PermissionsState, SetPermissionPayload } from '../../interfaces/permissions';

/* Initial state */
const INITIAL_STATE: PermissionsState = {
    permissions: {
        camera: 'unavailable',
        mediaLibrary: 'unavailable'
    }
}

/* Slice of management state */
const permissionsSlice = createSlice({
    name: 'permissions',
    initialState: INITIAL_STATE,
    reducers: {
        setPermission: (state, action: PayloadAction<SetPermissionPayload>) => {
            state.permissions[action.payload.key] = action.payload.value;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(checkPermissions.fulfilled, (state, action) => {
            state.permissions = action.payload.permissions;
        })
    }
});

export const { setPermission } = permissionsSlice.actions;

export default permissionsSlice.reducer;