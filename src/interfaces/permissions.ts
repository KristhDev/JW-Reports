import { PermissionStatus } from 'react-native-permissions';

export interface PermissionsState {
    permissions: Permissions;
}

export interface Permissions {
    camera: PermissionStatus;
    mediaLibrary: PermissionStatus;
}

export type SetPermissionPayload = {
    key: keyof Permissions;
    value: PermissionStatus;
}