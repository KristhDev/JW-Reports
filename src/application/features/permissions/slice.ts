import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Thunks */
import { checkPermissions } from './thunks';

/* Interfaces */
import { PermissionsState, SetPermissionPayload } from './types';

/* Initial state */
export const PERMISSIONS_INITIAL_STATE: PermissionsState = {
    permissions: {
        camera: 'unavailable',
        readExternalStorage: 'unavailable',
        notifications: 'unavailable',
        readMediaImages: 'unavailable'
    }
}

/* Slice of management state */
const permissionsSlice = createSlice({
    name: 'permissions',
    initialState: PERMISSIONS_INITIAL_STATE,
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