import { DeviceInfo, PDF, storage, VoiceRecorder } from '@infrasturcture/adapters';

export const storageSpy = {
    getItem: jest.spyOn(storage, 'getItem'),
    setItem: jest.spyOn(storage, 'setItem')
}

export const DeviceInfoSpy = {
    getBuildVersion: jest.spyOn(DeviceInfo, 'getBuildVersion').mockImplementation(() => '9102'),
    getSystemVersion: jest.spyOn(DeviceInfo, 'getSystemVersion').mockImplementation(() => '12')
}

export const PDFSpy = {
    writeFromHTML: jest.spyOn(PDF, 'writeFromHTML')
}

export const VoiceRecorderSpy = {
    destroyListeners: jest.spyOn(VoiceRecorder, 'destroyListeners'),
    onSpeechEnd: jest.spyOn(VoiceRecorder, 'onSpeechEnd'),
    onSpeechError: jest.spyOn(VoiceRecorder, 'onSpeechError'),
    onSpeechResults: jest.spyOn(VoiceRecorder, 'onSpeechResults'),
    onSpeechStart: jest.spyOn(VoiceRecorder, 'onSpeechStart'),
    startRecording: jest.spyOn(VoiceRecorder, 'startRecording'),
    stopRecording: jest.spyOn(VoiceRecorder, 'stopRecording')
}