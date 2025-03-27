export abstract class LoggerServiceContract {
    public abstract init(): void;
    public abstract info(message: string): void;
    public abstract error(error: any): void;
}