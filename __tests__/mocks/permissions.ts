import { PermissionsState } from '@application/features';

export const initialPermissionsStateMock: PermissionsState = {
    isPermissionsRequested: false,
    permissions: {
        camera: 'undetermined',
        notifications: 'undetermined',
        mediaLibrary: 'undetermined',
        recordAudio: 'undetermined',
    }
}

export const deniedStateMock: PermissionsState = {
    isPermissionsRequested: true,
    permissions: {
        camera: 'denied',
        notifications: 'denied',
        mediaLibrary: 'denied',
        recordAudio: 'denied',
    }
}

export const blockedStateMock: PermissionsState = {
    isPermissionsRequested: true,
    permissions: {
        camera: 'blocked',
        notifications: 'blocked',
        mediaLibrary: 'blocked',
        recordAudio: 'blocked',
    }
}

export const grantedStateMock: PermissionsState = {
    isPermissionsRequested: true,
    permissions: {
        camera: 'granted',
        notifications: 'granted',
        mediaLibrary: 'granted',
        recordAudio: 'granted',
    }
}

export const unavailableStateMock: PermissionsState = {
    isPermissionsRequested: true,
    permissions: {
        camera: 'unavailable',
        notifications: 'unavailable',
        mediaLibrary: 'unavailable',
        recordAudio: 'unavailable',
    }
}

export const undeterminedStateMock: PermissionsState = {
    isPermissionsRequested: true,
    permissions: {
        camera: 'undetermined',
        notifications: 'undetermined',
        mediaLibrary: 'undetermined',
        recordAudio: 'undetermined',
    }
}