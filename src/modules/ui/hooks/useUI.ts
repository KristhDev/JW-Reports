import { EmitterSubscription, Keyboard } from 'react-native';

/* Features */
import { useAppSelector } from '../../../features';
import {
    setIsKeyboardVisible as setIsKeyboardVisibleAction
} from '../features';

const useUI = () => {
    const state = useAppSelector(store => store.ui);

    const setIsKeyboardVisible = (isVisible: boolean) => setIsKeyboardVisibleAction({ isVisible });

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

    return {
        state,

        listenShowKeyboard,
        listenHideKeyboard
    }
}

export default useUI;