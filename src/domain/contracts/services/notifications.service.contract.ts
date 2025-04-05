import { PermissionStatus } from '@application/features/permissions';

export abstract class NotificationsServiceContract {
    public abstract close(): void;
    public abstract getNotificationsPermission(): Promise<PermissionStatus>;
    public abstract listenNotificationsByUser(userId: string): void;
    public abstract mount(): void;
    public abstract requestNotificationsPermission(): Promise<PermissionStatus>;
}