import { VoiceRecorder } from '@infrasturcture/adapters';

describe('Test in VoiceRecorder adapter', () => {
    it('should have respective methods', () => {
        expect(VoiceRecorder).toHaveProperty('destroyListeners');
        expect(typeof VoiceRecorder.destroyListeners).toBe('function');

        expect(VoiceRecorder).toHaveProperty('onSpeechEnd');
        expect(typeof VoiceRecorder.onSpeechEnd).toBe('function');

        expect(VoiceRecorder).toHaveProperty('onSpeechError');
        expect(typeof VoiceRecorder.onSpeechError).toBe('function');

        expect(VoiceRecorder).toHaveProperty('onSpeechResults');
        expect(typeof VoiceRecorder.onSpeechResults).toBe('function');

        expect(VoiceRecorder).toHaveProperty('onSpeechStart');
        expect(typeof VoiceRecorder.onSpeechStart).toBe('function');

        expect(VoiceRecorder).toHaveProperty('startRecording');
        expect(typeof VoiceRecorder.startRecording).toBe('function');

        expect(VoiceRecorder).toHaveProperty('stopRecording');
        expect(typeof VoiceRecorder.stopRecording).toBe('function');
    });
});