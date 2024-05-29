import { PermissionsState } from '../../src/modules/shared';

export const initialPermissionsStateMock: PermissionsState = {
    permissions: {
        camera: 'unavailable',
        notifications: 'unavailable',
        readExternalStorage: 'unavailable',
        readMediaImages: 'unavailable'
    }
}

export const deniedStateMock: PermissionsState = {
    permissions: {
        camera: 'denied',
        notifications: 'denied',
        readExternalStorage: 'denied',
        readMediaImages: 'denied'
    }
}

export const grantedStateMock: PermissionsState = {
    permissions: {
        camera: 'granted',
        notifications: 'granted',
        readExternalStorage: 'granted',
        readMediaImages: 'granted'
    }
}

export const unavailableStateMock: PermissionsState = {
    permissions: {
        camera: 'unavailable',
        notifications: 'unavailable',
        readExternalStorage: 'unavailable',
        readMediaImages: 'unavailable'
    }
}