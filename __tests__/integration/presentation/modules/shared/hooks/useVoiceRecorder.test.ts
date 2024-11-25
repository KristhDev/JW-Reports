import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseVoiceRecorder, renderUseVoiceRecorder } from '@setups';

/* Mocks */
import { grantedStateMock, initialStatusStateMock, VoiceRecorderSpy } from '@mocks';

/* Errors */
import { VoiceRecorderError } from '@domain/errors';

describe('Test in useVoiceRecorder hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return respective properties and functions', () => {
        const mockStore = getMockStoreUseVoiceRecorder({ status: initialStatusStateMock, permissions: grantedStateMock });
        const { result } = renderUseVoiceRecorder(mockStore);

        expect(result.current.useVoiceRecorder).toEqual({
            isRecording: false,
            record: '',

            startRecording: expect.any(Function),
            stopRecording: expect.any(Function)
        });
    });

    it('should start recording - startRecording', async () => {
        const mockStore = getMockStoreUseVoiceRecorder({ status: initialStatusStateMock, permissions: grantedStateMock });
        const { result } = renderUseVoiceRecorder(mockStore);

        const lang = 'es-ES';

        await act(async () => {
            await result.current.useVoiceRecorder.startRecording(lang);
        });

        expect(VoiceRecorderSpy.startRecording).toHaveBeenCalledTimes(1);
        expect(VoiceRecorderSpy.startRecording).toHaveBeenCalledWith(lang);
    });

    it('should start recording faild if throws an error - startRecording', async () => {
        VoiceRecorderSpy.startRecording.mockRejectedValueOnce(new VoiceRecorderError('7/No match'));

        const mockStore = getMockStoreUseVoiceRecorder({ status: initialStatusStateMock, permissions: grantedStateMock });
        const { result } = renderUseVoiceRecorder(mockStore);

        const lang = 'es-ES';

        await act(async () => {
            await result.current.useVoiceRecorder.startRecording(lang);
        });

        expect(VoiceRecorderSpy.startRecording).toHaveBeenCalledTimes(1);
        expect(VoiceRecorderSpy.startRecording).toHaveBeenCalledWith(lang);

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'Por favor hable de forma clara y sin ruido para copiar el texto.'
        });
    });

    it('should stop recording - stopRecording', async () => {
        const mockStore = getMockStoreUseVoiceRecorder({ status: initialStatusStateMock, permissions: grantedStateMock });
        const { result } = renderUseVoiceRecorder(mockStore);

        await act(async () => {
            await result.current.useVoiceRecorder.stopRecording();
        });

        expect(VoiceRecorderSpy.stopRecording).toHaveBeenCalledTimes(1);
    });

    it('should stop recording faild if throws an error - stopRecording', async () => {
        VoiceRecorderSpy.stopRecording.mockRejectedValueOnce(new VoiceRecorderError('Stop recording error'));

        const mockStore = getMockStoreUseVoiceRecorder({ status: initialStatusStateMock, permissions: grantedStateMock });
        const { result } = renderUseVoiceRecorder(mockStore);

        await act(async () => {
            await result.current.useVoiceRecorder.stopRecording();
        });

        expect(VoiceRecorderSpy.stopRecording).toHaveBeenCalledTimes(1);

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String)
        });
    });

    it('should set record if onSpeechResults emits a value', () => {
        const recordValue = 'This a record value';
        VoiceRecorderSpy.onSpeechResults.mockImplementation(callback => callback(recordValue));

        const mockStore = getMockStoreUseVoiceRecorder({ status: initialStatusStateMock, permissions: grantedStateMock });
        const { result } = renderUseVoiceRecorder(mockStore);

        expect(result.current.useVoiceRecorder.record).toEqual(recordValue);
    });

    it('should set error if onSpeechError emits a value', () => {
        const voiceRecorderError = new VoiceRecorderError('Voice not reconized');
        VoiceRecorderSpy.onSpeechError.mockImplementation(callback => callback(voiceRecorderError));

        const mockStore = getMockStoreUseVoiceRecorder({ status: initialStatusStateMock, permissions: grantedStateMock });
        const { result } = renderUseVoiceRecorder(mockStore);

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: expect.any(String)
        });
    });

    it('should call destroyListeners if hook is unmounted', () => {
        const mockStore = getMockStoreUseVoiceRecorder({ status: initialStatusStateMock, permissions: grantedStateMock });
        const { unmount } = renderUseVoiceRecorder(mockStore);

        unmount();

        expect(VoiceRecorderSpy.destroyListeners).toHaveBeenCalledTimes(1);
    });
});