import { useSelector } from 'react-redux';
import { request, PERMISSIONS } from 'react-native-permissions';

/* Store */
import { RootState, useAppDispatch } from '../features/store';

/* Features - actions */
import { checkPermissions as checkPermissionsThunk, setPermission } from '../features/permissions';
import { setStatus } from '../features/status';

/* Interfaces */
import { Permissions, PermissionsState } from '../interfaces/permissions';

/**
 * Hook to management permissions of store
 * with state, actions and thunks
 */
const usePermissions = () => {
    const dispatch = useAppDispatch();

    const state = useSelector<RootState, PermissionsState>(store => store.permissions);

    /**
     * It asks for a permission and if the permission is not available it sets a status message.
     * @param {keyof Permissions} permission - keyof Permissions
     */
    const askPermission = async (permission: keyof Permissions) => {
        const askPermissions = {
            camera: PERMISSIONS.ANDROID.CAMERA,
            mediaLibrary: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        }

        const result = await request(askPermissions[permission]);

        if (result === 'unavailable') {
            dispatch(setStatus({
                msg: 'Lo sentimos pero su dispositivo no soporta está funcionalidad',
                code: 418
            }));
        }

        dispatch(setPermission({ key: permission, value: result }));
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