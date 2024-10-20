import { EmailError } from '@domain/errors';

describe('Test in EmailError', () => {
    it('should render properties in error instance', () => {
        const error = new EmailError('Email not sent');

        expect(error.message).toBe('Email not sent');
        expect(error.name).toBe('EmailError');

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(EmailError);
    });
});