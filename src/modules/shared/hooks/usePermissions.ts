import { request, PERMISSIONS, PermissionStatus } from 'react-native-permissions';

/* Features */
import { useAppDispatch, useAppSelector } from '@features';
import { checkPermissions as checkPermissionsThunk, setPermission,  } from '../features';

/* Hooks */
import useStatus from './useStatus';

/* Interfaces */
import { Permissions } from '../interfaces';

/* Utils */
import { permissionsMessages, permissionsStatus } from '../utils';

/**
 * Hook to management permissions of store
 * with state, actions and thunks
 */
const usePermissions = () => {
    const dispatch = useAppDispatch();

    const state = useAppSelector(store => store.permissions);
    const { setStatus } = useStatus();

    /**
     * It asks for a permission and if the permission is not available it sets a status message.
     *
     * @param {keyof Permissions} permission - keyof Permissions
     * @return {Promise<void>} This function does not return anything.
     */
    const askPermission = async (permission: keyof Permissions): Promise<PermissionStatus> => {
        const askPermissions = {
            camera: PERMISSIONS.ANDROID.CAMERA,
            notifications: PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
            readExternalStorage: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            readMediaImages: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        }

        const result = await request(askPermissions[permission]);

        if (result === permissionsStatus.UNAVAILABLE) {
            setStatus({ msg: permissionsMessages.UNSUPPORTED, code: 418 });
        }

        dispatch(setPermission({ key: permission, value: result }));
        return result;
    }

    /**
     * It's a function that returns a function that dispatches a function
     */
    const checkPermissions = () => dispatch(checkPermissionsThunk());

    return {
        state,
        checkPermissions,
        askPermission
    }
}

export default usePermissions;