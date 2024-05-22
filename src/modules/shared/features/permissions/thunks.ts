import { createAsyncThunk } from '@reduxjs/toolkit';
import { PERMISSIONS, checkMultiple } from 'react-native-permissions';

/* Creating a thunk that will check the permissions of the app. */
export const checkPermissions = createAsyncThunk(
    'permissions/checkPermissions',
    async () => {
        const permissions = await checkMultiple([ PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE ]);

        return {
            permissions: {
                camera: permissions['android.permission.CAMERA'],
                mediaLibrary: permissions['android.permission.READ_EXTERNAL_STORAGE']
            }
        }
    }
);