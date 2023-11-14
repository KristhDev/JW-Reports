import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

/* Components */
import { CredentialsForm } from '../../../src/components/auth';

/* Hooks */
import { useAuth, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mocks */
import { setErrorFormMock, testUser, updateEmailMock, updatePasswordMock } from '../../mocks';

/* Mocked hooks */
jest.mock('../../../src/hooks/useAuth.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <CredentialsForm /> component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    (useAuth as jest.Mock).mockReturnValue({
        state: { isAuthLoading: false, user: testUser },
        updateEmail: updateEmailMock,
        updatePassword: updatePasswordMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors }
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<CredentialsForm />);
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render user.email in form', async () => {
        await waitFor(() => {
            render(<CredentialsForm />);
        });

        await act(async() => {
            await waitFor(() => {
                /**
                 * This code is testing that the `CredentialsForm` component is rendering
                 * the user's email correctly in the email input field.
                 */
                const inputsText = screen.getAllByTestId('form-field-text-input');
                expect(inputsText[0].props.value).toBe(testUser.email);
            });
        });
    });

    it('should call setErrorForm then email isnt change', async () => {
        await waitFor(() => {
            render(<CredentialsForm />);
        });

        await act(async() => {
            await waitFor(() => {

                /* Find touchable to submit form */
                const touchables = screen.getAllByTestId('button-touchable');
                fireEvent.press(touchables[0]);

                /* Check if setErrorForm is called one time */
                expect(setErrorFormMock).toHaveBeenCalledTimes(1);
            });
        });
    });

    it('should call updateEmail then email form is valid', async () => {
        await waitFor(() => {
            render(<CredentialsForm />);
        });

        const newEmail = 'tester@gmail.com';

        await act(async() => {
            await waitFor(() => {

                /* Get input text of email to type new email */
                const inputsText = screen.getAllByTestId('form-field-text-input');
                fireEvent(inputsText[0], 'onChangeText', newEmail);

                /* Get touchable submit to send request of change email */
                const touchables = screen.getAllByTestId('button-touchable');
                fireEvent.press(touchables[0]);

                /* Check if updateEmail is called one time */
                expect(updateEmailMock).toHaveBeenCalledTimes(1);
            });

            /**
             * Check if updateEmail is called with respective args
             */
            expect(updateEmailMock).toHaveBeenCalledWith({ email: newEmail }, expect.any(Function));
        });
    });

    it('should disabled button when isAuthLoading and loadingEmail is true', async () => {

        /* Mock data of useAuth  */
        (useAuth as jest.Mock).mockReturnValue({
            state: { isAuthLoading: true, user: testUser },
            updateEmail: updateEmailMock,
            updatePassword: updatePasswordMock
        });

        await waitFor(() => {
            render(<CredentialsForm />);
        });

        const newEmail = 'tester@gmail.com';

        await act(async() => {
            await waitFor(() => {

                /* Get input text of email to type new email */
                const inputsText = screen.getAllByTestId('form-field-text-input');
                fireEvent(inputsText[0], 'onChangeText', newEmail);

                /* Get touchable submit to send request of change email */
                const touchables = screen.getAllByTestId('button-touchable');
                fireEvent.press(touchables[0]);

                /* Check if touchable is disabled */
                expect(touchables[0].props.accessibilityState.disabled).toBeTruthy();
            });
        });
    });

    it('should call setErrorForm when password form is empty or invalid', async () => {
        await waitFor(() => {
            render(<CredentialsForm />);
        });

        await act(async() => {
            await waitFor(() => {

                /* Get touchable submit to send request of change password */
                const touchables = screen.getAllByTestId('button-touchable');
                fireEvent.press(touchables[1]);

                /* Check if setErrorForm is called one time */
                expect(setErrorFormMock).toHaveBeenCalledTimes(1);
            });
        });
    });

    it('should call updatePassword when password form is valid', async () => {
        await waitFor(() => {
            render(<CredentialsForm />);
        });

        const newPass = 'new-password-1234';

        await act(async() => {
            await waitFor(() => {

                /* Get text inputs of change passowrd */
                const inputsText = screen.getAllByTestId('form-field-text-input');
                fireEvent(inputsText[1], 'onChangeText', newPass);
                fireEvent(inputsText[2], 'onChangeText', newPass);

                /* Get touchable submit to send request of change password */
                const touchables = screen.getAllByTestId('button-touchable');
                fireEvent.press(touchables[1]);

                /* Check if updatedPassword is called one time */
                expect(updatePasswordMock).toHaveBeenCalledTimes(1);
            });

            /* Check if updatedPassword is called with respective args */
            expect(updatePasswordMock).toHaveBeenCalledWith({ password: newPass }, expect.any(Function));
        });
    });

    it('should disabled button when isAuthLoading and loadingPassword is true', async () => {

        /* Mock data of useAuth  */
        (useAuth as jest.Mock).mockReturnValue({
            state: { isAuthLoading: true, user: testUser },
            updateEmail: updateEmailMock,
            updatePassword: updatePasswordMock
        });

        await waitFor(() => {
            render(<CredentialsForm />);
        });

        const newPass = 'new-password-1234';

        await act(async() => {
            await waitFor(() => {

                /* Get text inputs of change passowrd */
                const inputsText = screen.getAllByTestId('form-field-text-input');
                fireEvent(inputsText[1], 'onChangeText', newPass);
                fireEvent(inputsText[2], 'onChangeText', newPass);

                /* Get touchable submit to send request of change password */
                const touchables = screen.getAllByTestId('button-touchable');
                fireEvent.press(touchables[1]);

                /* Check if submit touchable is disabled */
                expect(touchables[1].props.accessibilityState.disabled).toBeTruthy();
            });
        });
    });
});