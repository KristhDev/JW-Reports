import { PermissionsState } from '../../src/modules/shared';

export const initialPermissionsStateMock: PermissionsState = {
    permissions: {
        camera: 'unavailable',
        mediaLibrary: 'unavailable',
    }
}

export const deniedStateMock: PermissionsState = {
    permissions: {
        camera: 'denied',
        mediaLibrary: 'denied'
    }
}

export const grantedStateMock: PermissionsState = {
    permissions: {
        camera: 'granted',
        mediaLibrary: 'granted',
    }
}

export const unavailableStateMock: PermissionsState = {
    permissions: {
        camera: 'unavailable',
        mediaLibrary: 'unavailable'
    }
}