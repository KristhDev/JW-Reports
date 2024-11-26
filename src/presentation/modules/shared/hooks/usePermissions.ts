import { request, requestNotifications, PERMISSIONS, PermissionStatus } from 'react-native-permissions';

/* Constants */
import { permissionsMessages } from '@application/constants';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    checkPermissions as checkPermissionsThunk,
    requestPermissions as requestPermissionsThunk,
    setPermission,
    Permissions,
    RequestPermissionsOptions
} from '@application/features';

/* Hooks */
import useStatus from './useStatus';

/* Utils */
import { permissionsStatus } from '../utils';

/**
 * Hook to management permissions of store
 * with state, actions and thunks
 */
const usePermissions = () => {
    const dispatch = useAppDispatch();

    const state = useAppSelector(store => store.permissions);
    const { setStatus } = useStatus();

    /**
     * Checks the permissions of the app.
     *
     * @return {void} This function does not return any value.
     */
    const checkPermissions = (): void => {
        dispatch(checkPermissionsThunk());
    }

    /**
     * Requests the permissions of the app.
     *
     * @param {RequestPermissionsOptions} options - RequestPermissionsOptions
     * @return {void} This function does not return any value.
     */
    const requestPermissions = (options: RequestPermissionsOptions): void => {
        dispatch(requestPermissionsThunk(options));
    }

    /**
     * It asks for a permission and if the permission is not available it sets a status message.
     *
     * @param {keyof Permissions} permission - keyof Permissions
     * @return {Promise<void>} This function does not return anything.
     */
    const askPermission = async (permission: keyof Permissions): Promise<PermissionStatus> => {
        const askPermissions = {
            camera: PERMISSIONS.ANDROID.CAMERA,
            readExternalStorage: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            readMediaImages: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
            recordAudio: PERMISSIONS.ANDROID.RECORD_AUDIO,
            writeExternalStorage: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
        }

        let status: PermissionStatus = permissionsStatus.UNAVAILABLE;

        if (permission === 'notifications') {
            const result = await requestNotifications([ 'alert', 'badge', 'sound' ]);
            status = result.status;
        }
        else status = await request(askPermissions[permission]);

        if (status === permissionsStatus.UNAVAILABLE) setStatus({ msg: permissionsMessages.UNSUPPORTED, code: 418 });

        dispatch(setPermission({ key: permission, value: status }));
        return status;
    }

    return {
        state,
        askPermission,
        checkPermissions,
        requestPermissions
    }
}

export default usePermissions;