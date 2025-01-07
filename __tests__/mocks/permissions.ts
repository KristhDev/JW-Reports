import { PermissionsState } from '@application/features';

export const initialPermissionsStateMock: PermissionsState = {
    isPermissionsRequested: false,
    permissions: {
        camera: 'unavailable',
        notifications: 'unavailable',
        readExternalStorage: 'unavailable',
        readMediaImages: 'unavailable',
        recordAudio: 'unavailable',
        writeExternalStorage: 'unavailable'
    }
}

export const blockedStateMock: PermissionsState = {
    isPermissionsRequested: true,
    permissions: {
        camera: 'blocked',
        notifications: 'blocked',
        readExternalStorage: 'blocked',
        readMediaImages: 'blocked',
        recordAudio: 'blocked',
        writeExternalStorage: 'blocked'
    }
}

export const deniedStateMock: PermissionsState = {
    isPermissionsRequested: true,
    permissions: {
        camera: 'denied',
        notifications: 'denied',
        readExternalStorage: 'denied',
        readMediaImages: 'denied',
        recordAudio: 'denied',
        writeExternalStorage: 'denied'
    }
}

export const grantedStateMock: PermissionsState = {
    isPermissionsRequested: true,
    permissions: {
        camera: 'granted',
        notifications: 'granted',
        readExternalStorage: 'granted',
        readMediaImages: 'granted',
        recordAudio: 'granted',
        writeExternalStorage: 'granted'
    }
}

export const unavailableStateMock: PermissionsState = {
    isPermissionsRequested: true,
    permissions: {
        camera: 'unavailable',
        notifications: 'unavailable',
        readExternalStorage: 'unavailable',
        readMediaImages: 'unavailable',
        recordAudio: 'unavailable',
        writeExternalStorage: 'unavailable'
    }
}