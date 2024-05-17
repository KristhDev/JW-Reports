import React from 'react';
import { act, render, screen, userEvent, waitFor } from '@testing-library/react-native';

/* Setup */
import { mockUseNavigation } from '../../../../../jest.setup';

/* Mocks */
import { setErrorFormMock, signUpMock } from '../../../../mocks';

/* Modules */
import { RegisterForm, useAuth } from '../../../../../src/modules/auth';
import { useStatus } from '../../../../../src/modules/shared';

const user = userEvent.setup();
const renderComponent = () => render(<RegisterForm />);

/* Mock hooks */
jest.mock('../../../../../src/modules/auth/hooks/useAuth.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

describe('Test in <RegisterForm /> component', () => {
    (useAuth as jest.Mock).mockReturnValue({
        state: { isAuthLoading: false },
        signUp: signUpMock
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

        const pressable = await screen.findByTestId('button-touchable');
        await user.press(pressable);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call signUp when the form is valid', async () => {
        await waitFor(() => {
            renderComponent();
        });

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

        /* Get touchable to submit form */
        const pressable = await screen.findByTestId('button-touchable');
        await user.press(pressable);

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
            renderComponent();
        });

        const touchableSignIn = await screen.findByTestId('register-form-sign-in');
        await user.press(touchableSignIn);

        /* Check if navigate is called with respective arg */
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('LoginScreen');
    });

    it('should disabled button then isAuthLoading is true', async () => {

        /* Mock data of useAuth */
        (useAuth as jest.Mock).mockReturnValue({
            state: { isAuthLoading: true },
            signUp: signUpMock
        });

        await waitFor(() => {
            renderComponent();
        });

        /* Get submit touchable and check if disabled */
        const touchable = await screen.findByTestId('button-touchable');
        expect(touchable.props.accessibilityState.disabled).toBeTruthy();
    });
});