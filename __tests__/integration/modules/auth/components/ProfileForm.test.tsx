import React from 'react';
import { act, render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { useAuthSpy, useNetworkSpy, useStatusSpy, useUISpy } from '../../../../../jest.setup';

/* Mocks */
import { setErrorFormMock, testUser, updateProfileMock, wifiMock } from '../../../../mocks';

/* Modules */
import { ProfileForm } from '../../../../../src/modules/auth';

const user = userEvent.setup();
const renderComponent = () => render(<ProfileForm />);

describe('Test in <ProfileForm /> component', () => {
    useAuthSpy.mockImplementation(() => ({
        state: { user: testUser, isAuthLoading: false },
        updateProfile: updateProfileMock
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setErrorForm: setErrorFormMock
    }) as any);

    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }) as any);

    useUISpy.mockImplementation(() => ({
        state: {
            isKeyboardVisible: false
        }
    }) as any);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', async () => {
        renderComponent();

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when form is invalid', async () => {
        renderComponent();

        /* Get text inputs to type empty content */
        const inputsText = await screen.findAllByTestId('form-field-text-input');
        await user.clear(inputsText[0]);

        /* Get pressable to submit form */
        const pressable = screen.getByTestId('button-pressable');
        await user.press(pressable);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call updateProfile when the form is valid', async () => {
        renderComponent();

        await act(async () => {

            /* Get pressable to submit form */
            const pressable = await screen.findByTestId('button-pressable');
            await user.press(pressable);

            /* Check if updateProfile is called one time */
            expect(updateProfileMock).toHaveBeenCalledTimes(1);

            /* Check if updateProfile is called with respective args */
            expect(updateProfileMock).toHaveBeenCalledWith({
                name: testUser.name,
                surname: testUser.surname,
                precursor: testUser.precursor,
                hoursRequirement: testUser.hoursRequirement
            }, expect.any(Object));
        });
    });
});