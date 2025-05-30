import { PermissionStatus } from '@application/features/permissions';

import { VoiceRecorderError } from '@domain/errors';

import { SpeakerLanguageKey, SpeakerLanguages } from '@infrastructure/interfaces';

export abstract class VoiceRecorderAdapterContract {
    public readonly abstract speakerLanguages: SpeakerLanguages;

    public abstract destroyListeners(): void;
    public abstract getRecordAudioPermission(): Promise<PermissionStatus>;
    public abstract onSpeechEnd(callback: () => void): void;
    public abstract onSpeechError(callback: (error: VoiceRecorderError) => void): void;
    public abstract onSpeechResults(callback: (value?: string) => void): void;
    public abstract onSpeechStart(callback: () => void): void;
    public abstract requestRecordAudioPermission(): Promise<PermissionStatus>;
    public abstract startRecording(lang: SpeakerLanguageKey): void;
    public abstract stopRecording(): void;
}