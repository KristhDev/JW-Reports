import React from 'react';
import { act, render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { mockUseNavigation, useAuthSpy, useStatusSpy } from '../../../../../jest.setup';

/* Mocks */
import { setErrorFormMock, signInMock } from '../../../../mocks';

/* Modules */
import { LoginForm } from '../../../../../src/modules/auth';

const user = userEvent.setup();
const renderComponent = () => render(<LoginForm />);

describe('Test in <LoginForm /> component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    useAuthSpy.mockImplementation(() => ({
        state: { isAuthLoading: false },
        signIn: signInMock
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setErrorForm: setErrorFormMock
    }) as any);

    it('should to match snapshot', async () => {
        renderComponent();

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when the form is empty or invalid', async () => {
        renderComponent();

        /* Get touchable to submit form */
        const pressable = await screen.findByTestId('button-touchable');
        await user.press(pressable);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call signIn when the form is valid', async () => {
        renderComponent();

        const email = 'tester@gmail.com';
        const password = 'testerpass1234';

        /* Get text inputs to type email and password */
        const inputsText = await screen.findAllByTestId('form-field-text-input');
        await user.type(inputsText[0], email);
        await user.type(inputsText[1], password);

        /* Get touchable to submit form */
        const pressable = await screen.findByTestId('button-touchable');
        await user.press(pressable);

        /* Check if signIn is called one time */
        expect(signInMock).toHaveBeenCalledTimes(1);
    });

    it('should call navigate of useNavigation with respective values', async () => {
        render(<LoginForm />);

        /* Get touchable to navigate of RegisterScreen */
        const touchableSignUp = await screen.findByTestId('login-form-sign-up');
        await user.press(touchableSignUp);

        /* Check if navigate is called with respective arg */
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('RegisterScreen');

        /* Get touchable to navigate of ForgotPasswordScreen */
        const touchableForgotPass = await screen.findByTestId('login-form-forgor-pass');
        await user.press(touchableForgotPass);

        /* Check if navigate is called with respective arg */
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('ForgotPasswordScreen');
    });

    it('should disabled button then isAuthLoading is true', async () => {
        /* Mock data of useAuth */
        useAuthSpy.mockImplementation(() => ({
            state: { isAuthLoading: true },
            signIn: signInMock
        }) as any);

        render(<LoginForm />);

        /* Get submit touchable and check if disabled */
        const pressable = await screen.findByTestId('button-touchable');
        expect(pressable.props.accessibilityState.disabled).toBeTruthy();
    });
});