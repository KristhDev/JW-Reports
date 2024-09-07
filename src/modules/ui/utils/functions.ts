/* Interfaces */
import { UserInterface } from '../interfaces';

/* utils */
import { storage, storageKeys } from '@utils';

export const getUIStored = (): UserInterface => {
    let initialUserInterface: UserInterface = {
        oldDatetimePicker: false
    }

    const userInterfaceStored = storage.getItem(storageKeys.USER_INTERFACE);
    if (!userInterfaceStored) return initialUserInterface;

    const value = JSON.parse(userInterfaceStored) as UserInterface;
    if (!value) return initialUserInterface;

    if (value.oldDatetimePicker) {
        initialUserInterface.oldDatetimePicker = value.oldDatetimePicker;
    }

    return initialUserInterface;
}