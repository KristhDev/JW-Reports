import { SendEmailOptions } from '@infrastructure/interfaces';

export abstract class EmailServiceContract {
    public abstract init(): void;
    public abstract send(options: SendEmailOptions): Promise<void>;
}