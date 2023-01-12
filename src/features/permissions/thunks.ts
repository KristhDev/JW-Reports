import { createAsyncThunk } from '@reduxjs/toolkit';
import { check, PERMISSIONS } from 'react-native-permissions';

export const checkPermissions = createAsyncThunk(
    'permissions/checkPermissions',
    async () => {
        const mediaLibrary = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        const camera = await check(PERMISSIONS.ANDROID.CAMERA);

        return {
            permissions: {
                mediaLibrary,
                camera
            }
        }
    }
);