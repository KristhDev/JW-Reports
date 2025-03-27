import { createAsyncThunk } from '@reduxjs/toolkit';

/* Config */
import { DEPENDENCIES_TYPES, dependencies }  from '@config/inversify';

/* Contracts */
import { DeviceImageServiceContract, NotificationsServiceContract } from '@domain/contracts/services';

/* Types */
import { PermissionStatus, RequestPermissionsOptions } from './types';

/* Adapters */
import { VoiceRecorderAdapter } from '@infrastructure/adapters';

const notificationsService = dependencies.get<NotificationsServiceContract>(DEPENDENCIES_TYPES.NotificationsService);
const deviceImageService = dependencies.get<DeviceImageServiceContract>(DEPENDENCIES_TYPES.DeviceImageService);

/* Creating a thunk that will check the permissions of the app. */
export const checkPermissions = createAsyncThunk(
    'permissions/checkPermissions',
    async () => {
        const permissionsPromises = {
            camera: deviceImageService.getCameraPermission,
            mediaLibrary: deviceImageService.getMediaLibraryPermission,
            notifications: notificationsService.getNotificationsPermission,
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
            camera: deviceImageService.requestCameraPermission,
            mediaLibrary: deviceImageService.requestMediaLibraryPermission,
            notifications: notificationsService.requestNotificationsPermission,
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