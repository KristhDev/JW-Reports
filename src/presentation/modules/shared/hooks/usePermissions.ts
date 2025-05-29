import { AppState, NativeEventSubscription } from 'react-native';

/* DI */
import { notificationsService, deviceImageService, voiceRecorderAdapter, messagesService, toasterAdapter } from '@config/di';

/* Constants */
import { permissionsStatus } from '@application/constants/utils';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    checkPermissions as checkPermissionsThunk,
    requestPermissions as requestPermissionsThunk,
    setPermission,
    Permissions,
    RequestPermissionsOptions,
    PermissionStatus
} from '@application/features/permissions';

/**
 * Hook to management permissions of store
 * with state, actions and thunks
 */
const usePermissions = () => {
    const permissionsMessages = messagesService.permissionsMessages;

    const dispatch = useAppDispatch();

    const state = useAppSelector(store => store.permissions);

    const isCameraBlocked = state.permissions.camera === permissionsStatus.BLOCKED;
    const isCameraDenied = state.permissions.camera === permissionsStatus.DENIED;
    const isCameraGranted = state.permissions.camera === permissionsStatus.GRANTED;
    const isCameraUnavailable = state.permissions.camera === permissionsStatus.UNAVAILABLE;
    const isCameraUndetermined = state.permissions.camera === permissionsStatus.UNDETERMINED;

    const isMediaLibraryBlocked = state.permissions.mediaLibrary === permissionsStatus.BLOCKED;
    const isMediaLibraryDenied = state.permissions.mediaLibrary === permissionsStatus.DENIED;
    const isMediaLibraryGranted = state.permissions.mediaLibrary === permissionsStatus.GRANTED;
    const isMediaLibraryUndetermined = state.permissions.mediaLibrary === permissionsStatus.UNDETERMINED;
    const isMediaLibraryUnavailable = state.permissions.mediaLibrary === permissionsStatus.UNAVAILABLE;

    const isNotificationsBlocked = state.permissions.notifications === permissionsStatus.BLOCKED;
    const isNotificationsDenied = state.permissions.notifications === permissionsStatus.DENIED;
    const isNotificationsGranted = state.permissions.notifications === permissionsStatus.GRANTED;
    const isNotificationsUndetermined = state.permissions.notifications === permissionsStatus.UNDETERMINED;
    const isNotificationsUnavailable = state.permissions.notifications === permissionsStatus.UNAVAILABLE;

    const isRecordAudioBlocked = state.permissions.recordAudio === permissionsStatus.BLOCKED;
    const isRecordAudioDenied = state.permissions.recordAudio === permissionsStatus.DENIED;
    const isRecordAudioGranted = state.permissions.recordAudio === permissionsStatus.GRANTED;
    const isRecordAudioUndetermined = state.permissions.recordAudio === permissionsStatus.UNDETERMINED;
    const isRecordAudioUnavailable = state.permissions.recordAudio === permissionsStatus.UNAVAILABLE;

    /**
     * Checks the permissions of the app.
     *
     * @return {Promise<void>} This function does not return any value.
     */
    const checkPermissions = async (): Promise<void> => {
        await dispatch(checkPermissionsThunk());
    }

    /**
     * Requests the permissions of the app.
     *
     * @param {RequestPermissionsOptions} options - RequestPermissionsOptions
     * @return {Promise<void>} This function does not return any value.
     */
    const requestPermissions = async (options: RequestPermissionsOptions): Promise<void> => {
        await dispatch(requestPermissionsThunk(options));
    }

    /**
     * It asks for a permission and if the permission is not available it sets a status message.
     *
     * @param {keyof Permissions} permission - keyof Permissions
     * @return {Promise<void>} This function does not return anything.
     */
    const askPermission = async (permission: keyof Permissions): Promise<PermissionStatus> => {
        const askPermissions = {
            camera: deviceImageService.requestCameraPermission,
            mediaLibrary: deviceImageService.requestMediaLibraryPermission,
            notifications: notificationsService.requestNotificationsPermission,
            recordAudio: voiceRecorderAdapter.requestRecordAudioPermission
        }

        const status: PermissionStatus = await askPermissions[permission]();

        const isPermissionUnavailable = status === permissionsStatus.UNAVAILABLE;
        if (isPermissionUnavailable) toasterAdapter.showToast(permissionsMessages.UNSUPPORTED);

        dispatch(setPermission({ key: permission, value: status }));
        return status;
    }

    /**
     * Listens for changes in the app state and checks the permissions of the app when
     * the app is active.
     *
     * @return {NativeEventSubscription} This function returns a subscription that can be
     * used to remove the listener.
     */
    const listenCheckPermissions = (): NativeEventSubscription => {
        return AppState.addEventListener('change', (state) => {
            if (state !== 'active') return;
            checkPermissions();
        });
    }

    return {
        // State
        state,

        // Properties
        isCameraBlocked,
        isCameraDenied,
        isCameraGranted,
        isCameraUnavailable,
        isCameraUndetermined,
        isMediaLibraryBlocked,
        isMediaLibraryDenied,
        isMediaLibraryGranted,
        isMediaLibraryUnavailable,
        isMediaLibraryUndetermined,
        isNotificationsBlocked,
        isNotificationsDenied,
        isNotificationsGranted,
        isNotificationsUnavailable,
        isNotificationsUndetermined,
        isRecordAudioBlocked,
        isRecordAudioDenied,
        isRecordAudioGranted,
        isRecordAudioUnavailable,
        isRecordAudioUndetermined,

        // Functions
        askPermission,
        checkPermissions,
        listenCheckPermissions,
        requestPermissions,
    }
}

export default usePermissions;