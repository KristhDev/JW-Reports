import { createAsyncThunk } from '@reduxjs/toolkit';
import { PERMISSIONS, checkMultiple, checkNotifications } from 'react-native-permissions';

/* Creating a thunk that will check the permissions of the app. */
export const checkPermissions = createAsyncThunk(
    'permissions/checkPermissions',
    async () => {
        const permissions = await checkMultiple([
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        ]);

        const notifications = await checkNotifications();

        return {
            permissions: {
                camera: permissions['android.permission.CAMERA'],
                notifications: notifications.status,
                readExternalStorage: permissions['android.permission.READ_EXTERNAL_STORAGE'],
                readMediaImages: permissions['android.permission.READ_MEDIA_IMAGES']
            }
        }
    }
);