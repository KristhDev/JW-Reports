export type UserInterface = {
    oldDatetimePicker: boolean;
}

export type Keyboard = {
    height: number;
    isVisible: boolean;
}

export interface UIState {
    activeFormField: string;
    isDataExporting: boolean;
    keyboard: Keyboard;
    recordedAudio: string;
    userInterface: UserInterface;
}

export type SetOldDatetimePickerPayload = {
    oldDatetimePicker: boolean;
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
