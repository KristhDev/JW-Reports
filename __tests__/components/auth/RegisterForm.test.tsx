import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

/* Components */
import { RegisterForm } from '../../../src/components/auth';

/* Hooks */
import { useAuth, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mocks */
import { setErrorFormMock, signUpMock } from '../../mocks';

/* Setup */
import { navigateMock } from '../../../jest.setup';

/* Mock hooks */
jest.mock('../../../src/hooks/useAuth.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <RegisterForm /> component', () => {
    (useAuth as jest.Mock).mockReturnValue({
        state: { isAuthLoading: false },
        signUp: signUpMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<RegisterForm />);
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when the form is empty or invalid', async () => {
        await waitFor(() => {
            render(<RegisterForm />);
        });

        const touchable = await screen.findByTestId('button-touchable');

        await waitFor(() => {
            /* Get touchable to submit form */
            fireEvent.press(touchable);
        });

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call signUp when the form is valid', async () => {
        await waitFor(() => {
            render(<RegisterForm />);
        });

        const name = 'Test';
        const surname = 'Tester';
        const email = 'tester@gmail.com';
        const password = 'pass-test-1234';

        const inputsText = await screen.findAllByTestId('form-field-text-input');

        await waitFor(() => {

            /* Get text inputs to type name, surname, email and password */
            fireEvent(inputsText[0], 'onChangeText', name);
            fireEvent(inputsText[1], 'onChangeText', surname);
            fireEvent(inputsText[2], 'onChangeText', email);
            fireEvent(inputsText[3], 'onChangeText', password);
            fireEvent(inputsText[4], 'onChangeText', password);
        });

        /* Get touchable to submit form */
        const touchable = await screen.findByTestId('button-touchable');

        await waitFor(() => {
            fireEvent.press(touchable);
        });

        /* Check if signUp is called one time */
        expect(signUpMock).toHaveBeenCalledTimes(1);
        expect(signUpMock).toHaveBeenCalledWith({
            name,
            surname,
            email,
            password,
            confirmPassword: password
        }, expect.any(Object));
    });

    it('should call navigate of useNavigation with respective values', async () => {
        await waitFor(() => {
            render(<RegisterForm />);
        });

        const touchableSignIn = await screen.findByTestId('register-form-sign-in');

        await waitFor(() => {
            /* Get touchable to navigate of LoginScreen */
            fireEvent.press(touchableSignIn);
        });

        /* Check if navigate is called with respective arg */
        expect(navigateMock).toHaveBeenCalledWith('LoginScreen');
    });

    it('should disabled button then isAuthLoading is true', async () => {

        /* Mock data of useAuth */
        (useAuth as jest.Mock).mockReturnValue({
            state: { isAuthLoading: true },
            signUp: signUpMock
        });

        await waitFor(() => {
            render(<RegisterForm />);
        });

        /* Get submit touchable and check if disabled */
        const touchable = await screen.findByTestId('button-touchable');
        expect(touchable.props.accessibilityState.disabled).toBeTruthy();
    });
});