import { Bugfender, LogLevel } from '@bugfender/rn-bugfender';

/* Env */
import { BUGFENDER_API_KEY } from '@env';

/* Version */
import { version as appVersion } from '@package';

export class LoggerService {
    /**
     * Initializes the logging service with Bugfender.
     *
     * @returns {void} - This function does not return anything
     */
    public static init(): void {
        Bugfender.init({
            appKey: BUGFENDER_API_KEY,
            version: appVersion
        });
    }

    /**
     * Logs an informational message using Bugfender.
     *
     * @param {string} message - The message to log
     * @returns {void} - This function does not return anything
     */
    public static info(message: string): void {
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
    public static error(error: any): void {
        Bugfender.sendLog({
            level: LogLevel.Error,
            text: JSON.stringify(error)
        });
    }
}
