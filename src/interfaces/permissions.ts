import { PermissionStatus } from 'react-native-permissions';

/* Defining the shape of the state object. */
export interface PermissionsState {
    permissions: Permissions;
}

/* Defining the shape of the state object. */
export interface Permissions {
    camera: PermissionStatus;
    mediaLibrary: PermissionStatus;
}

/**
 * `SetPermissionPayload` is an object with a `key` property that is a key of the `Permissions` type
 * and a `value` property that is a `PermissionStatus`.
 * @property key - keyof Permissions;
 * @property {PermissionStatus} value - PermissionStatus;
 */
export type SetPermissionPayload = {
    key: keyof Permissions;
    value: PermissionStatus;
}