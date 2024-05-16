import React from 'react';
import { act, render, screen, waitFor, userEvent } from '@testing-library/react-native';

/* Mocks */
import { setErrorFormMock, testUser, updateProfileMock, wifiMock } from '../../../../mocks';

/* Modules */
import { ProfileForm, useAuth } from '../../../../../src/modules/auth';
import { useNetwork, useStatus } from '../../../../../src/modules/shared';

/* Hooks */
jest.mock('../../../../../src/modules/auth/hooks/useAuth.ts');
jest.mock('../../../../../src/modules/shared/hooks/useNetwork.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

const user = userEvent.setup();
const renderComponent = () => render(<ProfileForm />);

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

    it('should to match snapshot', async () => {
        await waitFor(() => {
            renderComponent();
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when form is invalid', async () => {
        await waitFor(() => {
            renderComponent();
        });

        /* Get text inputs to type empty content */
        const inputsText = await screen.findAllByTestId('form-field-text-input');
        await user.clear(inputsText[0]);

        /* Get touchable to submit form */
        const pressable = screen.getByTestId('button-touchable');
        await user.press(pressable);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call updateProfile when the form is valid', async () => {
        await waitFor(() => {
            renderComponent();
        });

        await act(async () => {

            /* Get touchable to submit form */
            const pressable = await screen.findByTestId('button-touchable');
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