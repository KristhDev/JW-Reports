import React from 'react';
import { act, render, screen, waitFor, userEvent } from '@testing-library/react-native';

/* Setup */
import { mockUseNavigation } from '../../../../../jest.setup';

/* Mocks */
import { resetPasswordMock, setErrorFormMock } from '../../../../mocks';

/* Modules */
import { ForgotPasswordForm, useAuth } from '../../../../../src/modules/auth';
import { useStatus } from '../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../src/modules/auth/hooks/useAuth.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

const user = userEvent.setup();
const renderComponent = () => render(<ForgotPasswordForm />);

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

        /* Get submit touchable */
        const pressable = await screen.findByTestId('button-touchable');
        await user.press(pressable);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call resetPassword when the form is valid', async () => {
        await waitFor(() => {
            renderComponent();
        });

        const email = 'tester@gmail.com';

        /* Get text input to type email */
        const inputText = await screen.findByTestId('form-field-text-input');
        await user.type(inputText, email);

        /* Get submit touchable */
        const pressable = await screen.findByTestId('button-touchable');
        await user.press(pressable);

        /* Check if resetPassword is called one time */
        expect(resetPasswordMock).toHaveBeenCalledTimes(1);
    });

    it('should call navigate of useNavigation with respective values', async () => {
        await waitFor(() => {
            renderComponent();
        });

        /* Get sign in touchable to return of LoginScreen */
        const touchableSignIn = await screen.findByTestId('forgot-pass-form-sign-in');
        await user.press(touchableSignIn);

        /* Check if navigate is called with respective arg */
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('LoginScreen');
    });

    it('should disabled button then isAuthLoading is true', async () => {

        /* Mock data of useAuth */
        (useAuth as jest.Mock).mockReturnValue({
            state: { isAuthLoading: true },
            resetPassword: resetPasswordMock
        });

        await waitFor(() => {
            renderComponent();
        });

        /* Get submit touchable and check if disabled */
        const pressable = await screen.findByTestId('button-touchable');
        expect(pressable.props.accessibilityState.disabled).toBeTruthy();
    });
});