import React from 'react';
import { act, render, screen, waitFor, userEvent } from '@testing-library/react-native';

/* Mocks */
import { setErrorFormMock, testUser, updateEmailMock, updatePasswordMock } from '../../../../mocks';

/* Modules */
import { CredentialsForm, useAuth } from '../../../../../src/modules/auth';
import { useStatus } from '../../../../../src/modules/shared';

/* Mocked hooks */
jest.mock('../../../../../src/modules/auth/hooks/useAuth.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

const user = userEvent.setup();
const renderComponent = () => render(<CredentialsForm />);

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

    it('should to match snapshot', async () => {
        await waitFor(() => {
            renderComponent();
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render user.email in form', async () => {
        await waitFor(() => {
            renderComponent();
        });

        /**
         * This code is testing that the `CredentialsForm` component is rendering
         * the user's email correctly in the email input field.
         */
        const inputsText = await screen.findAllByTestId('form-field-text-input');
        expect(inputsText[0]).toHaveTextContent(testUser.email);
    });

    it('should call setErrorForm then email isnt change', async () => {
        await waitFor(() => {
            renderComponent();
        });


        /* Find touchable to submit form */
        const pressables = await screen.findAllByTestId('button-touchable');
        await user.press(pressables[0]);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call updateEmail then email form is valid', async () => {
        await waitFor(() => {
            renderComponent();
        });

        const newEmail = 'tester@gmail.com';

        /* Get input text of email to type new email */
        const inputsText = await screen.findAllByTestId('form-field-text-input');
        await user.type(inputsText[0], newEmail);

        /* Get touchable submit to send request of change email */
        const pressables = screen.getAllByTestId('button-touchable');
        await user.press(pressables[0]);

        /* Check if updateEmail is called one time */
        expect(updateEmailMock).toHaveBeenCalledTimes(1);

        /* Check if updateEmail is called with respective args */
        expect(updateEmailMock).toHaveBeenCalledWith({ email: newEmail }, expect.any(Function));
    });

    it('should disabled button when isAuthLoading and loadingEmail is true', async () => {

        /* Mock data of useAuth  */
        (useAuth as jest.Mock).mockReturnValue({
            state: { isAuthLoading: true, user: testUser },
            updateEmail: updateEmailMock,
            updatePassword: updatePasswordMock
        });

        await waitFor(() => {
            renderComponent();
        });

        const newEmail = 'tester@gmail.com';

        /* Get input text of email to type new email */
        const inputsText = await screen.findAllByTestId('form-field-text-input');
        await user.type(inputsText[0], newEmail);

        /* Get touchable submit to send request of change email */
        const pressables = screen.getAllByTestId('button-touchable');
        await user.press(pressables[0]);

        /* Check if touchable is disabled */
        expect(pressables[0].props.accessibilityState.disabled).toBeTruthy();
    });

    it('should call setErrorForm when password form is empty or invalid', async () => {
        await waitFor(() => {
            renderComponent();
        });

        /* Get touchable submit to send request of change password */
        const pressables = await screen.findAllByTestId('button-touchable');
        await user.press(pressables[1]);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call updatePassword when password form is valid', async () => {
        await waitFor(() => {
            renderComponent();
        });

        const newPass = 'new-password-1234';

        /* Get text inputs of change passowrd */
        const inputsText = await screen.findAllByTestId('form-field-text-input');
        await user.type(inputsText[1], newPass);
        await user.type(inputsText[2], newPass);

        /* Get touchable submit to send request of change password */
        const pressables = screen.getAllByTestId('button-touchable');
        await user.press(pressables[1]);

        /* Check if updatedPassword is called one time and with respective args */
        expect(updatePasswordMock).toHaveBeenCalledTimes(1);
        expect(updatePasswordMock).toHaveBeenCalledWith({ password: newPass }, expect.any(Function));
    });

    it('should disabled button when isAuthLoading and loadingPassword is true', async () => {

        /* Mock data of useAuth  */
        (useAuth as jest.Mock).mockReturnValue({
            state: { isAuthLoading: true, user: testUser },
            updateEmail: updateEmailMock,
            updatePassword: updatePasswordMock
        });

        await waitFor(() => {
            renderComponent();
        });

        const newPass = 'new-password-1234';

        /* Get text inputs of change passowrd */
        const inputsText = await screen.findAllByTestId('form-field-text-input');
        await user.type(inputsText[1], newPass);
        await user.type(inputsText[2], newPass);

        /* Get touchable submit to send request of change password */
        const pressables = await screen.findAllByTestId('button-touchable');
        await user.press(pressables[1]);

        /* Check if submit touchable is disabled */
        expect(pressables[1].props.accessibilityState.disabled).toBeTruthy();
    });
});