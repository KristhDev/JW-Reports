import { PermissionStatus } from 'react-native-permissions';

export const reportErrorDefaultImgs = {
    dark: require('@assets/shared/report-error-dark.png'),
    light: require('@assets/shared/report-error-light.png')
}

export const permissionsStatus: Record<'BLOCKED' | 'LIMITED' | 'GRANTED' | 'DENIED' | 'UNAVAILABLE', PermissionStatus> = {
    BLOCKED: 'blocked',
    LIMITED: 'limited',
    GRANTED: 'granted',
    DENIED: 'denied',
    UNAVAILABLE: 'unavailable',
}