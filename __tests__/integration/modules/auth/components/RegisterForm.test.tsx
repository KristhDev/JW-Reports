import React from 'react';
import { act, render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { mockUseNavigation, useAuthSpy, useStatusSpy, useUISpy } from '@test-setup';

/* Mocks */
import { setErrorFormMock, signUpMock } from '@mocks';

/* Modules */
import { RegisterForm } from '@auth';

const user = userEvent.setup();
const renderComponent = () => render(<RegisterForm />);

describe('Test in <RegisterForm /> component', () => {
    useAuthSpy.mockImplementation(() => ({
        state: { isAuthLoading: false },
        signUp: signUpMock
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setErrorForm: setErrorFormMock
    }) as any);

    useUISpy.mockImplementation(() => ({
        state: {
            isKeyboardVisible: false
        }
    }) as any);

    it('should to match snapshot', async () => {
        renderComponent();

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when the form is empty or invalid', async () => {
        renderComponent();

        const pressable = await screen.findByTestId('button-pressable');
        await user.press(pressable);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call signUp when the form is valid', async () => {
        renderComponent();

        const name = 'Test';
        const surname = 'Tester';
        const email = 'tester@gmail.com';
        const password = 'pass-test-1234';

        const inputsText = await screen.findAllByTestId('form-field-text-input');
        await user.type(inputsText[0], name);
        await user.type(inputsText[1], surname);
        await user.type(inputsText[2], email);
        await user.type(inputsText[3], password);
        await user.type(inputsText[4], password);

        /* Get pressable to submit form */
        const pressable = await screen.findByTestId('button-pressable');
        await user.press(pressable);

        /* Check if signUp is called one time */
        expect(signUpMock).toHaveBeenCalledTimes(1);
        expect(signUpMock).toHaveBeenCalledWith({
            name,
            surname,
            email,
            password,
            confirmPassword: password
        }, expect.any(Function));
    });

    it('should call navigate of useNavigation with respective values', async () => {
        renderComponent();

        const touchableSignIn = await screen.findByTestId('register-form-sign-in');
        await user.press(touchableSignIn);

        /* Check if navigate is called with respective arg */
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('LoginScreen');
    });

    it('should disabled button then isAuthLoading is true', async () => {

        /* Mock data of useAuth */
        useAuthSpy.mockImplementation(() => ({
            state: { isAuthLoading: true },
            signUp: signUpMock
        }) as any);

        renderComponent();

        /* Get submit pressable and check if disabled */
        const pressable = await screen.findByTestId('button-pressable');
        expect(pressable).toBeDisabled();
    });
});