import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { ForgotPasswordForm } from '../../../src/components/auth';

import { useAuth, useStatus, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';
import { navigateMock } from '../../../jest.setup';

const resetPasswordMock = jest.fn();
const setErrorFormMock = jest.fn();

jest.mock('../../../src/hooks/useAuth.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <ForgotPasswordForm /> component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    (useAuth as jest.Mock).mockReturnValue({
        state: { isAuthLoading: false },
        resetPassword: resetPasswordMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<ForgotPasswordForm />);
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when the form is empty or invalid', async () => {
        await waitFor(() => {
            render(<ForgotPasswordForm />);
        });

        await waitFor(() => {
            const touchable = screen.getByTestId('button-touchable');
            fireEvent.press(touchable);

            expect(setErrorFormMock).toHaveBeenCalledTimes(1);
        });
    });

    it('should call resetPassword when the form is valid', async () => {
        await waitFor(() => {
            render(<ForgotPasswordForm />);
        });

        const email = 'tester@gmail.com';

        await act(async() => {
            await waitFor(() => {
                const inputText = screen.getByTestId('form-field-text-input');
                fireEvent(inputText, 'onChangeText', email);

                const touchable = screen.getByTestId('button-touchable');
                fireEvent.press(touchable);

                expect(resetPasswordMock).toHaveBeenCalledTimes(1);
            });
        });
    });

    it('should call navigate of useNavigation with respective values', async () => {
        await waitFor(() => {
            render(<ForgotPasswordForm />);
        });

        await act(async() => {
            await waitFor(() => {
                const touchableSignIn = screen.getByTestId('forgot-pass-form-sign-in');
                fireEvent.press(touchableSignIn);

                expect(navigateMock).toHaveBeenCalledWith('LoginScreen');
            });
        });
    });

    it('should disabled button then isAuthLoading is true', async () => {
        (useAuth as jest.Mock).mockReturnValue({
            state: { isAuthLoading: true },
            resetPassword: resetPasswordMock
        });

        await waitFor(() => {
            render(<ForgotPasswordForm />);
        });

        await act(async() => {
            await waitFor(() => {
                const touchable = screen.getByTestId('button-touchable');
                expect(touchable.props.accessibilityState.disabled).toBeTruthy();
            });
        });
    });
});