import { PermissionsState } from '../../src/interfaces/permissions';

export const initialState: PermissionsState = {
    permissions: {
        camera: 'unavailable',
        mediaLibrary: 'unavailable',
    }
}

export const deniedState: PermissionsState = {
    permissions: {
        camera: 'denied',
        mediaLibrary: 'denied'
    }
}

export const grantedState: PermissionsState = {
    permissions: {
        camera: 'granted',
        mediaLibrary: 'granted',
    }
}

export const unavailableState: PermissionsState = {
    permissions: {
        camera: 'unavailable',
        mediaLibrary: 'unavailable'
    }
}