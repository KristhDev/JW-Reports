import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

/* Components */
import { ProfileForm } from '../../../src/components/auth';

/* Hooks */
import { useAuth, useNetwork, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mocks */
import { setErrorFormMock, testUser, updateProfileMock, wifiMock } from '../../mocks';

/* Hooks */
jest.mock('../../../src/hooks/useAuth.ts');
jest.mock('../../../src/hooks/useNetwork.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <ProfileForm /> component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    (useAuth as jest.Mock).mockReturnValue({
        state: { user: testUser, isAuthLoading: false },
        updateProfile: updateProfileMock
    });

    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<ProfileForm />);
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when form is invalid', async () => {
        await waitFor(() => {
            render(<ProfileForm />);
        });

        await act(async () => {
            await waitFor(() => {

                /* Get text inputs to type empty content */
                const inputsText = screen.getAllByTestId('form-field-text-input');
                fireEvent(inputsText[0], 'onChangeText', '');

                /* Get touchable to submit form */
                const touchable = screen.getByTestId('button-touchable');
                fireEvent.press(touchable);

                /* Check if setErrorForm is called one time */
                expect(setErrorFormMock).toHaveBeenCalledTimes(1);
            });
        });
    });

    it('should call updateProfile when the form is valid', async () => {
        await waitFor(() => {
            render(<ProfileForm />);
        });

        await act(async () => {
            await waitFor(() => {

                /* Get touchable to submit form */
                const touchable = screen.getByTestId('button-touchable');
                fireEvent.press(touchable);

                /* Check if updateProfile is called one time */
                expect(updateProfileMock).toHaveBeenCalledTimes(1);
            });

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