import { PermissionStatus } from '@application/features/permissions';

export const permissionsStatus: Record<Uppercase<PermissionStatus>, PermissionStatus> = {
    BLOCKED: 'blocked',
    DENIED: 'denied',
    GRANTED: 'granted',
    UNAVAILABLE: 'unavailable',
    UNDETERMINED: 'undetermined',
}