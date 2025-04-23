import { Languages } from '@infrastructure/interfaces';

export type UserInterface = {
    oldDatetimePicker: boolean;
    language: Languages | null;
}

export type Keyboard = {
    height: number;
    isVisible: boolean;
}

export interface UIState {
    activeFormField: string;
    isAppReady: boolean;
    isDataExporting: boolean;
    keyboard: Keyboard;
    recordedAudio: string;
    userInterface: UserInterface;
}

export type SetIsAppReadyPayload = {
    isAppReady: boolean;
}

export type SetOldDatetimePickerPayload = {
    oldDatetimePicker: boolean;
}

export type SetLanguagePayload = {
    language: Languages;
}

export type setRecordedAudioPayload = {
    recordedAudio: string;
}

export type SetKeyboardPayload = {
    keyboard: Keyboard;
}

/**
 * Defining an interface called Pagination.
 *
 * @property {number} from - The number of items to skip.
 * @property {number} to - The number of items to return.
 */
export interface Pagination {
    from: number;
    to: number;
}
