import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

/* Components */
import { ProfileForm } from '../../../src/components/auth';

/* Hooks */
import { useAuth, useStatus, useTheme } from '../../../src/hooks';

/* Interfaces */
import { User } from '../../../src/interfaces/auth';

/* Theme */
import { darkColors } from '../../../src/theme';

/* `const testUser: User` is defining a constant variable `testUser` of type `User`, which is an
interface defined in the `auth` module. The object assigned to `testUser` contains properties such
as `id`, `name`, `surname`, `email`, `precursor`, `createdAt`, and `updatedAt`, which represent the
user's information. This object is used in the tests to simulate a user's data. */
const testUser: User = {
    id: '05ef0d0c-0f7a-4512-b705-6da279d88503',
    name: 'Celestino',
    surname: 'Wilderman',
    email: 'Ernestine_Doyle@yahoo.com',
    precursor: 'ninguno',
    hours_requirement: 20,
    createdAt: '2021-03-10T12:00:00.000Z',
    updatedAt: '2021-03-10T12:00:00.000Z',
}

const updateProfileMock = jest.fn();
const setErrorFormMock = jest.fn();

/* Hooks */
jest.mock('../../../src/hooks/useAuth.ts');
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
                hours_requirement: testUser.hours_requirement
            }, expect.any(Object));
        });
    });
});