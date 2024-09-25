import { Bugfender } from '@bugfender/rn-bugfender';

/* Services */
import { logger } from '@services';

describe('Test in logger service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should have respective methods', () => {
        expect(logger).toEqual({
            init: expect.any(Function),
            info: expect.any(Function),
            error: expect.any(Function)
        });
    });

    it('should call functions to initialize logger - init', () => {
        logger.init();

        expect(Bugfender.init).toHaveBeenCalledTimes(1);
        expect(Bugfender.init).toHaveBeenCalledWith({
            appKey: expect.any(String),
            version: expect.any(String)
        });
    });

    it('should call functions to log info - info', () => {
        const message = 'Info message test';
        logger.info(message);

        expect(Bugfender.sendLog).toHaveBeenCalledTimes(1);
        expect(Bugfender.sendLog).toHaveBeenCalledWith({
            level: expect.any(Number),
            text: message
        });
    });

    it('should call functions to log error - error', () => {
        const error = new Error('Error message test');
        logger.error(error);

        expect(Bugfender.sendLog).toHaveBeenCalledTimes(1);
        expect(Bugfender.sendLog).toHaveBeenCalledWith({
            level: expect.any(Number),
            text: JSON.stringify(error)
        });
    });
});