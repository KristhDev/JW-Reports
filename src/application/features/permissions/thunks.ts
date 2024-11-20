import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    PERMISSIONS,
    Permission,
    PermissionStatus,
    checkMultiple,
    checkNotifications,
    requestMultiple,
    requestNotifications
} from 'react-native-permissions';

import { RequestPermissionsOptions } from './types';

/* Creating a thunk that will check the permissions of the app. */
export const checkPermissions = createAsyncThunk(
    'permissions/checkPermissions',
    async () => {
        const permissions = await checkMultiple([
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
            PERMISSIONS.ANDROID.RECORD_AUDIO,
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ]);

        const notifications = await checkNotifications();

        return {
            permissions: {
                camera: permissions['android.permission.CAMERA'],
                notifications: notifications.status,
                readExternalStorage: permissions['android.permission.READ_EXTERNAL_STORAGE'],
                readMediaImages: permissions['android.permission.READ_MEDIA_IMAGES'],
                recordAudio: permissions['android.permission.RECORD_AUDIO'],
                writeExternalStorage: permissions['android.permission.WRITE_EXTERNAL_STORAGE'],
            }
        }
    }
);

/* Creating a thunk that will request the permissions of the app. */
export const requestPermissions = createAsyncThunk(
    'permissions/requestPermissions',
    async (options: RequestPermissionsOptions) => {
        let permissionsStrings: Permission[] = [];

        if (options?.camera) permissionsStrings.push(PERMISSIONS.ANDROID.CAMERA);
        if (options?.readExternalStorage) permissionsStrings.push(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        if (options?.readMediaImages) permissionsStrings.push(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        if (options?.recordAudio) permissionsStrings.push(PERMISSIONS.ANDROID.RECORD_AUDIO);
        if (options?.writeExternalStorage) permissionsStrings.push(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

        const permissions = await requestMultiple(permissionsStrings);

        let notificationsStatus: PermissionStatus = 'unavailable';

        if (options?.notifications) {
            const notifications = await requestNotifications([ 'alert', 'badge', 'sound' ]);
            notificationsStatus = notifications.status;
        }

        return {
            permissions: {
                camera: permissions['android.permission.CAMERA'] ?? 'unavailable',
                notifications: notificationsStatus,
                readExternalStorage: permissions['android.permission.READ_EXTERNAL_STORAGE'] ?? 'unavailable',
                readMediaImages: permissions['android.permission.READ_MEDIA_IMAGES'] ?? 'unavailable',
                recordAudio: permissions['android.permission.RECORD_AUDIO'] ?? 'unavailable',
                writeExternalStorage: permissions['android.permission.WRITE_EXTERNAL_STORAGE'] ?? 'unavailable',
            }
        }
    }
);