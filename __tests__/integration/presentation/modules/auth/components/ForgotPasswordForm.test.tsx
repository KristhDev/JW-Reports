import React from 'react';
import { act, render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { mockUseNavigation } from '@test-setup';

/* Mocks */
import { initialUIStateMock, resetPasswordMock, setErrorFormMock, useAuthSpy, useStatusSpy, useUISpy } from '@mocks';

/* Modules */
import { ForgotPasswordForm } from '@auth';

const user = userEvent.setup();
const renderComponent = () => render(<ForgotPasswordForm />);

describe('Test in <ForgotPasswordForm /> component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    useAuthSpy.mockImplementation(() => ({
        state: { isAuthLoading: false },
        resetPassword: resetPasswordMock
    }) as any);

    useStatusSpy.mockImplementation(() => ({ setErrorForm: setErrorFormMock }) as any);
    useUISpy.mockImplementation(() => ({ state: initialUIStateMock }) as any);

    it('should to match snapshot', async () => {
        renderComponent();

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when the form is empty or invalid', async () => {
        renderComponent();

        /* Get submit pressable */
        const pressable = await screen.findByTestId('button-pressable');
        await user.press(pressable);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call resetPassword when the form is valid', async () => {
        renderComponent();

        const email = 'tester@gmail.com';

        /* Get text input to type email */
        const inputText = await screen.findByTestId('form-field-text-input');
        await user.type(inputText, email);

        /* Get submit pressable */
        const pressable = await screen.findByTestId('button-pressable');
        await user.press(pressable);

        /* Check if resetPassword is called one time */
        expect(resetPasswordMock).toHaveBeenCalledTimes(1);
    });

    it('should call navigate of useNavigation with respective values', async () => {
        renderComponent();

        /* Get sign in touchable to return of LoginScreen */
        const touchableSignIn = await screen.findByTestId('forgot-pass-form-sign-in');
        await user.press(touchableSignIn);

        /* Check if navigate is called with respective arg */
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('LoginScreen');
    });

    it('should disabled button then isAuthLoading is true', async () => {

        /* Mock data of useAuth */
        useAuthSpy.mockImplementation(() => ({
            state: { isAuthLoading: true },
            resetPassword: resetPasswordMock
        }) as any);

        renderComponent();

        /* Get submit pressable and check if disabled */
        const pressable = await screen.findByTestId('button-pressable');
        expect(pressable.props.accessibilityState.disabled).toBeTruthy();
    });
});