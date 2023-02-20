import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { ProfileForm } from '../../../src/components/auth';

import { useAuth, useStatus, useTheme } from '../../../src/hooks';

import { User } from '../../../src/interfaces/auth';

import { darkColors } from '../../../src/theme';

const testUser: User = {
    id: '05ef0d0c-0f7a-4512-b705-6da279d88503',
    name: 'Celestino',
    surname: 'Wilderman',
    email: 'Ernestine_Doyle@yahoo.com',
    precursor: 'ninguno',
    createdAt: '2021-03-10T12:00:00.000Z',
    updatedAt: '2021-03-10T12:00:00.000Z',
}

const updateProfileMock = jest.fn();
const setErrorFormMock = jest.fn();

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
                const inputsText = screen.getAllByTestId('form-field-text-input');
                fireEvent(inputsText[0], 'onChangeText', '');

                const touchable = screen.getByTestId('button-touchable');
                fireEvent.press(touchable);

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
                const touchable = screen.getByTestId('button-touchable');
                fireEvent.press(touchable);

                expect(updateProfileMock).toHaveBeenCalledTimes(1);
            });

            expect(updateProfileMock).toHaveBeenCalledWith({
                name: testUser.name,
                surname: testUser.surname,
                precursor: testUser.precursor,
            }, expect.any(Object));
        });
    });
});