import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { CredentialsForm } from '../../../src/components/auth';

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

const updateEmailMock = jest.fn();
const updatePasswordMock = jest.fn().mockImplementation(() => Promise.resolve());
const setErrorFormMock = jest.fn();

jest.mock('../../../src/hooks/useAuth.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <CredentialsForm /> component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    (useAuth as jest.Mock).mockReturnValue({
        state: { isAuthLoading: false, user: testUser },
        updateEmail: updateEmailMock,
        updatePassword: updatePasswordMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<CredentialsForm />);
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render user.email in form', async () => {
        await waitFor(() => {
            render(<CredentialsForm />);
        });

        await act(async() => {
            await waitFor(() => {
                const inputsText = screen.getAllByTestId('form-field-text-input');
                expect(inputsText[0].props.value).toBe(testUser.email);
            });
        });
    });

    it('should call setErrorForm then email isnt change', async () => {
        await waitFor(() => {
            render(<CredentialsForm />);
        });

        await act(async() => {
            await waitFor(() => {
                const touchables = screen.getAllByTestId('button-touchable');
                fireEvent.press(touchables[0]);

                expect(setErrorFormMock).toHaveBeenCalledTimes(1);
            });
        });
    });

    it('should call updateEmail then email form is valid', async () => {
        await waitFor(() => {
            render(<CredentialsForm />);
        });

        const newEmail = 'tester@gmail.com';

        await act(async() => {
            await waitFor(() => {
                const inputsText = screen.getAllByTestId('form-field-text-input');
                fireEvent(inputsText[0], 'onChangeText', newEmail);

                const touchables = screen.getAllByTestId('button-touchable');
                fireEvent.press(touchables[0]);

                expect(updateEmailMock).toHaveBeenCalledTimes(1);
            });

            expect(updateEmailMock).toHaveBeenCalledWith({ email: newEmail }, expect.any(Function));
        });
    });

    it('should disabled button when isAuthLoading and loadingEmail is true', async () => {
        (useAuth as jest.Mock).mockReturnValue({
            state: { isAuthLoading: true, user: testUser },
            updateEmail: updateEmailMock,
            updatePassword: updatePasswordMock
        });

        await waitFor(() => {
            render(<CredentialsForm />);
        });

        const newEmail = 'tester@gmail.com';

        await act(async() => {
            await waitFor(() => {
                const inputsText = screen.getAllByTestId('form-field-text-input');
                fireEvent(inputsText[0], 'onChangeText', newEmail);

                const touchables = screen.getAllByTestId('button-touchable');
                fireEvent.press(touchables[0]);

                expect(touchables[0].props.accessibilityState.disabled).toBeTruthy();
            });
        });
    });

    it('should call setErrorForm when password form is empty or invalid', async () => {
        await waitFor(() => {
            render(<CredentialsForm />);
        });

        await act(async() => {
            await waitFor(() => {
                const touchables = screen.getAllByTestId('button-touchable');
                fireEvent.press(touchables[1]);

                expect(setErrorFormMock).toHaveBeenCalledTimes(1);
            });
        });
    });

    it('should call updatePassword when password form is valid', async () => {
        await waitFor(() => {
            render(<CredentialsForm />);
        });

        const newPass = 'new-password-1234';

        await act(async() => {
            await waitFor(() => {
                const inputsText = screen.getAllByTestId('form-field-text-input');
                fireEvent(inputsText[1], 'onChangeText', newPass);
                fireEvent(inputsText[2], 'onChangeText', newPass);

                const touchables = screen.getAllByTestId('button-touchable');
                fireEvent.press(touchables[1]);

                expect(updatePasswordMock).toHaveBeenCalledTimes(1);
            });

            expect(updatePasswordMock).toHaveBeenCalledWith({ password: newPass }, expect.any(Function));
        });
    });

    it('should disabled button when isAuthLoading and loadingPassword is true', async () => {
        (useAuth as jest.Mock).mockReturnValue({
            state: { isAuthLoading: true, user: testUser },
            updateEmail: updateEmailMock,
            updatePassword: updatePasswordMock
        });

        await waitFor(() => {
            render(<CredentialsForm />);
        });

        const newPass = 'new-password-1234';

        await act(async() => {
            await waitFor(() => {
                const inputsText = screen.getAllByTestId('form-field-text-input');
                fireEvent(inputsText[1], 'onChangeText', newPass);
                fireEvent(inputsText[2], 'onChangeText', newPass);

                const touchables = screen.getAllByTestId('button-touchable');
                fireEvent.press(touchables[1]);

                expect(touchables[1].props.accessibilityState.disabled).toBeTruthy();
            });
        });
    });
});