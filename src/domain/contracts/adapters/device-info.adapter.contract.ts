export abstract class DeviceInfoAdapterContract {
    public abstract getBuildVersion(): string;
    public abstract getSystemVersion(): string;
}