import React from 'react';
import { act, render, screen, waitFor, fireEvent } from '@testing-library/react-native';

/* Components */
import { LoginForm } from '../../../src/components/auth';

/* Hooks */
import { useAuth, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Setup */
import { navigateMock } from '../../../jest.setup';

/* Mocks */
import { setErrorFormMock, signInMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useAuth.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <LoginForm /> component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    (useAuth as jest.Mock).mockReturnValue({
        state: { isAuthLoading: false },
        signIn: signInMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<LoginForm />);
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when the form is empty or invalid', async () => {
        await waitFor(() => {
            render(<LoginForm />);
        });

        await waitFor(() => {

            /* Get touchable to submit form */
            const touchable = screen.getByTestId('button-touchable');
            fireEvent.press(touchable);

            /* Check if setErrorForm is called one time */
            expect(setErrorFormMock).toHaveBeenCalledTimes(1);
        });
    });

    it('should call signIn when the form is valid', async () => {
        await waitFor(() => {
            render(<LoginForm />);
        });

        const email = 'tester@gmail.com';
        const password = 'testerpass1234';

        await act(async() => {
            await waitFor(() => {

                /* Get text inputs to type email and password */
                const inputsText = screen.getAllByTestId('form-field-text-input');
                fireEvent(inputsText[0], 'onChangeText', email);
                fireEvent(inputsText[1], 'onChangeText', password);

                /* Get touchable to submit form */
                const touchable = screen.getByTestId('button-touchable');
                fireEvent.press(touchable);

                /* Check if signIn is called one time */
                expect(signInMock).toHaveBeenCalledTimes(1);
            });
        });
    });

    it('should call navigate of useNavigation with respective values', async () => {
        await waitFor(() => {
            render(<LoginForm />);
        });

        await act(async() => {
            await waitFor(() => {

                /* Get touchable to navigate of RegisterScreen */
                const touchableSignUp = screen.getByTestId('login-form-sign-up');
                fireEvent.press(touchableSignUp);

                /* Check if navigate is called with respective arg */
                expect(navigateMock).toHaveBeenCalledWith('RegisterScreen');

                /* Get touchable to navigate of ForgotPasswordScreen */
                const touchableForgotPass = screen.getByTestId('login-form-forgor-pass');
                fireEvent.press(touchableForgotPass);

                /* Check if navigate is called with respective arg */
                expect(navigateMock).toHaveBeenCalledWith('ForgotPasswordScreen');
            });
        });
    });

    it('should disabled button then isAuthLoading is true', async () => {

        /* Mock data of useAuth */
        (useAuth as jest.Mock).mockReturnValue({
            state: { isAuthLoading: true },
            signIn: signInMock
        });

        await waitFor(() => {
            render(<LoginForm />);
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