import { DeviceInfo, ExternalStorage, InternalStorage, PDF, storage, VoiceRecorder } from '@infrasturcture/adapters';

export const storageSpy = {
    getItem: jest.spyOn(storage, 'getItem'),
    setItem: jest.spyOn(storage, 'setItem')
}

export const DeviceInfoSpy = {
    getBuildVersion: jest.spyOn(DeviceInfo, 'getBuildVersion').mockImplementation(() => '9102'),
    getSystemVersion: jest.spyOn(DeviceInfo, 'getSystemVersion').mockImplementation(() => '12')
}

export const ExternalStorageSpy = {
    encodings: ExternalStorage.encodings,
    moveFileOfInternalExtorage: jest.spyOn(ExternalStorage, 'moveFileOfInternalExtorage')
}

export const InternalStorageSpy = {
    encodings: InternalStorage.encodings,
    deleteFile: jest.spyOn(InternalStorage, 'deleteFile'),
    readFile: jest.spyOn(InternalStorage, 'readFile'),
    rename: jest.spyOn(InternalStorage, 'rename')
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