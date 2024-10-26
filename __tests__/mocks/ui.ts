import { UIState } from '@application/features';

import * as useUI from '@ui/hooks/useUI';

export const useUISpy = jest.spyOn(useUI, 'default');

export const initialUIState: UIState = {
    isKeyboardVisible: false,
    userInterface: {
        oldDatetimePicker: false
    }
}