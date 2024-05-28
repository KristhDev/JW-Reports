import { Bugfender, LogLevel } from '@bugfender/rn-bugfender';

/* Env */
import { BUGFENDER_API_KEY } from '@env';

/* Version */
import { version as appVersion } from '../../package.json';

export const logger = {
    init: (): void => {
        Bugfender.init({
            appKey: BUGFENDER_API_KEY,
            version: appVersion
        });
    },

    info: (message: string): void => {
        Bugfender.sendLog({
            level: LogLevel.Info,
            text: message,
        });
    },

    error: (error: any): void => {
        Bugfender.sendLog({
            level: LogLevel.Error,
            text: JSON.stringify(error)
        });
    }
}