import { EmitterSubscription, Keyboard } from 'react-native';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    setActiveFormField as setActiveFormFieldAction,
    setRecordedAudio as setRecordedAudioAction,
    setIsDataExporting as setIsDataExportingAction,
    setKeyboard as setIsKeyboardVisibleAction,
    setOldDatetimePicker as setOldDatetimePickerAction,
    Keyboard as KeyboardType
} from '@application/features';

const useUI = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(store => store.ui);

    const setActiveFormField = (activeFormField: string) => dispatch(setActiveFormFieldAction({ activeFormField }));
    const setIsDataExporting = (isExporting: boolean) => dispatch(setIsDataExportingAction({ isExporting }));
    const setKeyboard = (keyboard: KeyboardType) => dispatch(setIsKeyboardVisibleAction({ keyboard }));
    const setRecordedAudio = (recordedAudio: string) => dispatch(setRecordedAudioAction({ recordedAudio }));

    /**
     * Sets the oldDatetimePicker state to the provided boolean value,
     * and updates the userInterface object in the local storage.
     *
     * @param {boolean} show - A boolean value indicating whether to show the old
     * datetime picker or not.
     * @return {void}
     */
    const setOldDatetimePicker = (show: boolean): void => {
        dispatch(setOldDatetimePickerAction({ oldDatetimePicker: show }));
    }

    /**
     * Listens for the 'keyboardDidHide' event and sets the 'isKeyboardVisible' state to false.
     *
     * @return {EmitterSubscription} The subscription object for the event listener.
     */
    const listenHideKeyboard = (): EmitterSubscription => {
        return Keyboard.addListener('keyboardDidHide', () => {
            setKeyboard({
                height: 0,
                isVisible: false
            });

            setActiveFormField('');
        });
    }

    /**
     * Listens for the 'keyboardDidShow' event and sets the 'isKeyboardVisible' state to true.
     *
     * @return {EmitterSubscription} The subscription object for the event listener.
     */
    const listenShowKeyboard = (): EmitterSubscription => {
        return Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyboard({
                height: e.endCoordinates.height,
                isVisible: true
            });
        });
    }

    return {
        state,

        setActiveFormField,
        setRecordedAudio,
        listenHideKeyboard,
        listenShowKeyboard,
        setIsDataExporting,
        setOldDatetimePicker
    }
}

export default useUI;