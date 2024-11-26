import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Thunks */
import { checkPermissions, requestPermissions } from './thunks';

/* Interfaces */
import { PermissionsState, SetPermissionPayload } from './types';

/* Initial state */
export const PERMISSIONS_INITIAL_STATE: PermissionsState = {
    isPermissionsRequested: false,
    permissions: {
        camera: 'unavailable',
        notifications: 'unavailable',
        readExternalStorage: 'unavailable',
        readMediaImages: 'unavailable',
        recordAudio: 'unavailable',
        writeExternalStorage: 'unavailable',
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

        .addCase(requestPermissions.fulfilled, (state, action) => {
            state.permissions = action.payload.permissions;
            state.isPermissionsRequested = true;
        })
    }
});

export const { setPermission } = permissionsSlice.actions;

export default permissionsSlice.reducer;