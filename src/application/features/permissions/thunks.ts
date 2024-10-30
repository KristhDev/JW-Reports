import { createAsyncThunk } from '@reduxjs/toolkit';
import { PERMISSIONS, checkMultiple } from 'react-native-permissions';

/* Creating a thunk that will check the permissions of the app. */
export const checkPermissions = createAsyncThunk(
    'permissions/checkPermissions',
    async () => {
        const permissions = await checkMultiple([
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ]);

        return {
            permissions: {
                camera: permissions['android.permission.CAMERA'],
                notifications: permissions['android.permission.POST_NOTIFICATIONS'],
                readExternalStorage: permissions['android.permission.READ_EXTERNAL_STORAGE'],
                readMediaImages: permissions['android.permission.READ_MEDIA_IMAGES'],
                writeExternalStorage: permissions['android.permission.WRITE_EXTERNAL_STORAGE'],
            }
        }
    }
);