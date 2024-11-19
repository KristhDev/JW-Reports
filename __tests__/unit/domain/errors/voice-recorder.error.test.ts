import { VoiceRecorderError } from '@domain/errors';

describe('Test in VoiceRecorderError', () => {
    it('should have respective methods and properties', () => {
        const error = new VoiceRecorderError('Voice not reconized');

        expect(error.message).toBe('Voice not reconized');
        expect(error.name).toBe('VoiceRecorderError');

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(VoiceRecorderError);
    });
});