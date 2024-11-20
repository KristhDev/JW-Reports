import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Mocks */
import { initialUIStateMock, onRecordMock, startRecordingMock, stopRecordingMock, useUISpy, useVoiceRecorderSpy } from '@mocks';

/* Modules */
import { MicrophoneBtn, MicrophoneBtnProps } from '@shared';

useVoiceRecorderSpy.mockImplementation(() => ({
    isRecording: false,
    record: '',
    startRecording: startRecordingMock,
    stopRecording: stopRecordingMock
}));

useUISpy.mockImplementation(() => ({ state: initialUIStateMock }) as any);

const user = userEvent.setup();
const renderComponent = (props: MicrophoneBtnProps) => render(<MicrophoneBtn { ...props } />);

describe('Test in MicrophoneBtn component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderComponent({ onRecord: onRecordMock });
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should call startRecording when is pressed', async () => {
        renderComponent({ onRecord: onRecordMock });

        const pressable = screen.getByTestId('fab-pressable');
        await user.press(pressable);

        expect(startRecordingMock).toHaveBeenCalledTimes(1);
        expect(startRecordingMock).toHaveBeenCalledWith('es-ES');
    });

    it('should call stopRecording when is pressed and isRecording is true', async () => {
        useVoiceRecorderSpy.mockImplementationOnce(() => ({
            isRecording: true,
            record: '',
            startRecording: startRecordingMock,
            stopRecording: stopRecordingMock
        }));

        renderComponent({ onRecord: onRecordMock });

        const pressable = screen.getByTestId('fab-pressable');
        await user.press(pressable);

        expect(stopRecordingMock).toHaveBeenCalledTimes(1);
    });
});