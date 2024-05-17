import React from 'react';
import { act, render, screen, waitFor, userEvent } from '@testing-library/react-native';

/* Setup */
import { mockUseNavigation } from '../../../../../jest.setup';

/* Mocks */
import { setErrorFormMock, signInMock } from '../../../../mocks';

/* Modules */
import { LoginForm, useAuth } from '../../../../../src/modules/auth';
import { useStatus } from '../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../src/modules/auth/hooks/useAuth.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

const user = userEvent.setup();
const renderComponent = () => render(<LoginForm />);

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

    it('should to match snapshot', async () => {
        await waitFor(() => {
            renderComponent();
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when the form is empty or invalid', async () => {
        await waitFor(() => {
            renderComponent();
        });

        /* Get touchable to submit form */
        const pressable = await screen.findByTestId('button-touchable');
        await user.press(pressable);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call signIn when the form is valid', async () => {
        await waitFor(() => {
            renderComponent();
        });

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
        await waitFor(() => {
            render(<LoginForm />);
        });

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
        (useAuth as jest.Mock).mockReturnValue({
            state: { isAuthLoading: true },
            signIn: signInMock
        });

        await waitFor(() => {
            render(<LoginForm />);
        });

        /* Get submit touchable and check if disabled */
        const pressable = await screen.findByTestId('button-touchable');
        expect(pressable.props.accessibilityState.disabled).toBeTruthy();
    });
});