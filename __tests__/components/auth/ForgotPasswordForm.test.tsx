import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

/* Components */
import { ForgotPasswordForm } from '../../../src/components/auth';

/* Hooks */
import { useAuth, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Setup */
import { navigateMock } from '../../../jest.setup';

const resetPasswordMock = jest.fn();
const setErrorFormMock = jest.fn();

/* Mock hooks */
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

            /* Get submit touchable */
            const touchable = screen.getByTestId('button-touchable');
            fireEvent.press(touchable);

            /* Check if setErrorForm is called one time */
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

                /* Get text input to type email */
                const inputText = screen.getByTestId('form-field-text-input');
                fireEvent(inputText, 'onChangeText', email);

                /* Get submit touchable */
                const touchable = screen.getByTestId('button-touchable');
                fireEvent.press(touchable);

                /* Check if resetPassword is called one time */
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

                /* Get sign in touchable to return of LoginScreen */
                const touchableSignIn = screen.getByTestId('forgot-pass-form-sign-in');
                fireEvent.press(touchableSignIn);

                /* Check if navigate is called with respective arg */
                expect(navigateMock).toHaveBeenCalledWith('LoginScreen');
            });
        });
    });

    it('should disabled button then isAuthLoading is true', async () => {

        /* Mock data of useAuth */
        (useAuth as jest.Mock).mockReturnValue({
            state: { isAuthLoading: true },
            resetPassword: resetPasswordMock
        });

        await waitFor(() => {
            render(<ForgotPasswordForm />);
        });

        await act(async() => {
            await waitFor(() => {

                /* Get submit touchable and check if disabled */
                const touchable = screen.getByTestId('button-touchable');
                expect(touchable.props.accessibilityState.disabled).toBeTruthy();
            });
        });
    });
});