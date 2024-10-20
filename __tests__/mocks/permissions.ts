import { PermissionsState } from '@application/features';

export const initialPermissionsStateMock: PermissionsState = {
    permissions: {
        camera: 'unavailable',
        notifications: 'unavailable',
        readExternalStorage: 'unavailable',
        readMediaImages: 'unavailable'
    }
}

export const blockedStateMock: PermissionsState = {
    permissions: {
        camera: 'blocked',
        notifications: 'blocked',
        readExternalStorage: 'blocked',
        readMediaImages: 'blocked'
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