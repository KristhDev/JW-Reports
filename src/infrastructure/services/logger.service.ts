import { injectable } from 'inversify';
import { Bugfender, LogLevel } from '@bugfender/rn-bugfender';

/* Config */
import { env } from '@config/env';

/* Contracts */
import { LoggerServiceContract } from '@domain/contracts/services';

/* Version */
import { version as appVersion } from '@package';

@injectable()
export class LoggerService extends LoggerServiceContract {
    /**
     * Initializes the logging service with Bugfender.
     *
     * @returns {void} - This function does not return anything
     */
    public init(): void {
        Bugfender.init({
            appKey: env.BUGFENDER_API_KEY!,
            version: appVersion
        });
    }

    /**
     * Logs an informational message using Bugfender.
     *
     * @param {string} message - The message to log
     * @returns {void} - This function does not return anything
     */
    public info(message: string): void {
        Bugfender.sendLog({
            level: LogLevel.Info,
            text: message
        });
    }

    /**
     * Logs an error message using Bugfender.
     *
     * @param {any} error - The error to log
     * @returns {void} - This function does not return anything
     */
    public error(error: any): void {
        Bugfender.sendLog({
            level: LogLevel.Error,
            text: JSON.stringify(error)
        });
    }
}
