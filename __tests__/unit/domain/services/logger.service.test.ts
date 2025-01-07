import { Bugfender } from '@bugfender/rn-bugfender';

/* Services */
import { LoggerService } from '@domain/services';

describe('Test in LoggerService service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should have respective methods', () => {
        expect(LoggerService).toHaveProperty('init');
        expect(typeof LoggerService.init).toBe('function');

        expect(LoggerService).toHaveProperty('info');
        expect(typeof LoggerService.info).toBe('function');

        expect(LoggerService).toHaveProperty('error');
        expect(typeof LoggerService.error).toBe('function');
    });

    it('should call functions to initialize logger - init', () => {
        LoggerService.init();

        expect(Bugfender.init).toHaveBeenCalledTimes(1);
        expect(Bugfender.init).toHaveBeenCalledWith({
            appKey: expect.any(String),
            version: expect.any(String)
        });
    });

    it('should call functions to log info - info', () => {
        const message = 'Info message test';
        LoggerService.info(message);

        expect(Bugfender.sendLog).toHaveBeenCalledTimes(1);
        expect(Bugfender.sendLog).toHaveBeenCalledWith({
            level: expect.any(Number),
            text: message
        });
    });

    it('should call functions to log error - error', () => {
        const error = new Error('Error message test');
        LoggerService.error(error);

        expect(Bugfender.sendLog).toHaveBeenCalledTimes(1);
        expect(Bugfender.sendLog).toHaveBeenCalledWith({
            level: expect.any(Number),
            text: JSON.stringify(error)
        });
    });
});