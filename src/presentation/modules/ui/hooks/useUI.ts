import { EmitterSubscription, Keyboard } from 'react-native';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    setIsDataExporting as setIsDataExportingAction,
    setIsKeyboardVisible as setIsKeyboardVisibleAction,
    setOldDatetimePicker as setOldDatetimePickerAction
} from '@application/features';

/* Adapters */
import { storage, storageKeys } from '@infrasturcture/adapters';

const useUI = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(store => store.ui);

    const setIsDataExporting = (isExporting: boolean) => dispatch(setIsDataExportingAction({ isExporting }));
    const setIsKeyboardVisible = (isVisible: boolean) => dispatch(setIsKeyboardVisibleAction({ isVisible }));

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

        storage.setItem(
            storageKeys.USER_INTERFACE,
            JSON.stringify({ ...state.userInterface, oldDatetimePicker: show }
        ));
    }

    /**
     * Listens for the 'keyboardDidHide' event and sets the 'isKeyboardVisible' state to false.
     *
     * @return {EmitterSubscription} The subscription object for the event listener.
     */
    const listenHideKeyboard = (): EmitterSubscription => {
        return Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardVisible(false);
        });
    }

    /**
     * Listens for the 'keyboardDidShow' event and sets the 'isKeyboardVisible' state to true.
     *
     * @return {EmitterSubscription} The subscription object for the event listener.
     */
    const listenShowKeyboard = (): EmitterSubscription => {
        return Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardVisible(true);
        });
    }

    return {
        state,

        listenHideKeyboard,
        listenShowKeyboard,
        setIsDataExporting,
        setOldDatetimePicker
    }
}

export default useUI;