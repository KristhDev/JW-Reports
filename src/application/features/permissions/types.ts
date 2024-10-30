import { PermissionStatus } from 'react-native-permissions';

/**
 * Defining the shape of the state object.
 *
 * @property {Permissions} permissions - The permissions object.
 */
export interface PermissionsState {
    permissions: Permissions;
}

/**
 * Defining the shape of the state object.
 *
 * @property {PermissionStatus} camera - This is the camera permission status.
 * @property {PermissionStatus} notifications - This is the notifications permission status.
 * @property {PermissionStatus} readExternalStorage - This is the media library permission status.
 * @property {PermissionStatus} readMediaImages - This is the media library permission status.
 */
export interface Permissions {
    camera: PermissionStatus;
    notifications: PermissionStatus;
    readExternalStorage: PermissionStatus;
    readMediaImages: PermissionStatus;
    writeExternalStorage: PermissionStatus;
}

/**
 * `SetPermissionPayload` is an object with a `key` property that is a key of the `Permissions` type
 * and a `value` property that is a `PermissionStatus`.
 *
 * @property key - keyof Permissions;
 * @property {PermissionStatus} value - PermissionStatus;
 */
export type SetPermissionPayload = {
    key: keyof Permissions;
    value: PermissionStatus;
}