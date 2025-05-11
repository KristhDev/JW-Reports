import { EmitterSubscription, Keyboard } from 'react-native';
import { useTranslation as useTranslationI18Next } from 'react-i18next';

/* DI */
import { localizationAdapter, timeAdapter } from '@config/di';

/* Features */
import { useAppDispatch, useAppSelector } from '@application/store';
import {
    Keyboard as KeyboardType,
    setActiveFormField as setActiveFormFieldAction,
    setIsAppReady as setIsAppReadyAction,
    setIsDataExporting as setIsDataExportingAction,
    setKeyboard as setIsKeyboardVisibleAction,
    setLanguage as setLanguageAction,
    setOldDatetimePicker as setOldDatetimePickerAction,
    setRecordedAudio as setRecordedAudioAction,
} from '@application/features/ui';

/* Constants */
import { languagesCodes, validLanguagesCodes } from '@application/constants/utils';

/* Interfaces */
import { Languages } from '@infrastructure/interfaces';

const useUI = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(store => store.ui);

    const { i18n } = useTranslationI18Next();

    const setIsAppReady = (isAppReady: boolean) => dispatch(setIsAppReadyAction({ isAppReady }));
    const setActiveFormField = (activeFormField: string) => dispatch(setActiveFormFieldAction({ activeFormField }));
    const setIsDataExporting = (isExporting: boolean) => dispatch(setIsDataExportingAction({ isExporting }));
    const setKeyboard = (keyboard: KeyboardType) => dispatch(setIsKeyboardVisibleAction({ keyboard }));
    const setLanguage = (language: Languages) => dispatch(setLanguageAction({ language }));
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

    const loadSettings = async (): Promise<void> => {
        const deviceLangue = localizationAdapter.getCurrentLanguageCode();

        let language = languagesCodes.EN;
        if (state.userInterface?.language) language = state.userInterface.language;

        if (!state.userInterface.language && validLanguagesCodes.includes(deviceLangue as any)) {
            language = deviceLangue as Languages;
        }

        setLanguage(language);
        await i18n.changeLanguage(language);
        timeAdapter.setLocale(language);

        setIsAppReady(true);
    }

    return {
        state,

        setActiveFormField,
        setLanguage,
        setRecordedAudio,
        listenHideKeyboard,
        listenShowKeyboard,
        loadSettings,
        setIsDataExporting,
        setOldDatetimePicker
    }
}

export default useUI;