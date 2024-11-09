export type UserInterface = {
    oldDatetimePicker: boolean;
}

export interface UIState {
    activeFormField: string;
    isDataExporting: boolean;
    isKeyboardVisible: boolean;
    recordedAudio: string;
    userInterface: UserInterface;
}

export type SetIsVisiblePayload = {
    isVisible: boolean;
}

export type SetOldDatetimePickerPayload = {
    oldDatetimePicker: boolean;
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
