import { createAsyncThunk } from '@reduxjs/toolkit';

/* Services */
import { DeviceImageService } from '@infrastructure/services';
import { NotificationsService } from '@services';

/* Types */
import { PermissionStatus, RequestPermissionsOptions } from './types';

/* Adapters */
import { VoiceRecorderAdapter } from '@infrastructure/adapters';

/* Creating a thunk that will check the permissions of the app. */
export const checkPermissions = createAsyncThunk(
    'permissions/checkPermissions',
    async () => {
        const permissionsPromises = {
            camera: DeviceImageService.getCameraPermission,
            mediaLibrary: DeviceImageService.getMediaLibraryPermission,
            notifications: NotificationsService.getNotificationsPermission,
            recordAudio: VoiceRecorderAdapter.getRecordAudioPermission
        }

        const camera = await permissionsPromises.camera();
        const mediaLibrary = await permissionsPromises.mediaLibrary();
        const notifications = await permissionsPromises.notifications();
        const recordAudio = await permissionsPromises.recordAudio();

        return {
            permissions: {
                camera,
                mediaLibrary,
                notifications,
                recordAudio
            }
        }
    }
);

/* Creating a thunk that will request the permissions of the app. */
export const requestPermissions = createAsyncThunk(
    'permissions/requestPermissions',
    async (options: RequestPermissionsOptions) => {
        const permissionsPromises = {
            camera: DeviceImageService.requestCameraPermission,
            mediaLibrary: DeviceImageService.requestMediaLibraryPermission,
            notifications: NotificationsService.requestNotificationsPermission,
            recordAudio: VoiceRecorderAdapter.requestRecordAudioPermission
        }

        let camera: PermissionStatus = 'undetermined';
        let mediaLibrary: PermissionStatus = 'undetermined';
        let notifications: PermissionStatus = 'undetermined';
        let recordAudio: PermissionStatus = 'undetermined';

        if (options.camera) camera = await permissionsPromises.camera();
        if (options.mediaLibrary) mediaLibrary = await permissionsPromises.mediaLibrary();
        if (options.notifications) notifications = await permissionsPromises.notifications();
        if (options.recordAudio) recordAudio = await permissionsPromises.recordAudio();

        return {
            permissions: {
                camera,
                mediaLibrary,
                notifications,
                recordAudio
            }
        }
    }
);