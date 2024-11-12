import { UIState } from '@application/features';

import * as useUI from '@ui/hooks/useUI';

export const useUISpy = jest.spyOn(useUI, 'default');

export const initialUIState: UIState = {
    activeFormField: '',
    isDataExporting: false,
    keyboard: {
        height: 0,
        isVisible: false
    },
    recordedAudio: '',
    userInterface: {
        oldDatetimePicker: false
    }
}