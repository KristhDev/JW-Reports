import React from 'react';
import { act, render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { useAuthSpy, useStatusSpy, useUISpy } from '@test-setup';

/* Mocks */
import { setErrorFormMock, testUser, updateEmailMock, updatePasswordMock } from '@mocks';

/* Modules */
import { CredentialsForm } from '@auth';

const user = userEvent.setup();
const renderComponent = () => render(<CredentialsForm />);

describe('Test in <CredentialsForm /> component', () => {
    useAuthSpy.mockImplementation(() => ({
        state: { isAuthLoading: false, user: testUser },
        updateEmail: updateEmailMock,
        updatePassword: updatePasswordMock
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setErrorForm: setErrorFormMock
    }) as any);

    useUISpy.mockImplementation(() => ({
        state: {
            isKeyboardVisible: false
        }
    }) as any);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', async () => {
        renderComponent();

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render user.email in form', async () => {
        renderComponent();

        /**
         * This code is testing that the `CredentialsForm` component is rendering
         * the user's email correctly in the email input field.
         */
        const inputsText = await screen.findAllByTestId('form-field-text-input');
        expect(inputsText[0]).toHaveDisplayValue(testUser.email);
    });

    it('should call setErrorForm then email isnt change', async () => {
        renderComponent();

        /* Find pressable to submit form */
        const pressables = await screen.findAllByTestId('button-pressable');
        await user.press(pressables[0]);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call updateEmail then email form is valid', async () => {
        renderComponent();

        const newEmail = 'tester@gmail.com';

        /* Get input text of email to type new email */
        const inputsText = await screen.findAllByTestId('form-field-text-input');
        await user.clear(inputsText[0]);
        await user.type(inputsText[0], newEmail);

        /* Get pressable submit to send request of change email */
        const pressable = (await screen.findAllByTestId('button-pressable'))[0];
        await user.press(pressable);

        /* Check if updateEmail is called one time and with respective args */
        expect(updateEmailMock).toHaveBeenCalledTimes(1);
        expect(updateEmailMock).toHaveBeenCalledWith({ email: newEmail }, expect.any(Function));
    });

    it('should disabled button when isAuthLoading and isloadingEmail is true', async () => {

        /* Mock data of useAuth  */
        useAuthSpy.mockImplementation(() => ({
            state: { isAuthLoading: true, user: testUser },
            updateEmail: updateEmailMock,
            updatePassword: updatePasswordMock
        }) as any);

        renderComponent();

        const newEmail = 'tester@gmail.com';

        /* Get input text of email to type new email */
        const inputsText = await screen.findAllByTestId('form-field-text-input');
        await user.clear(inputsText[0]);
        await user.type(inputsText[0], newEmail);

        /* Get pressable submit to send request of change email */
        const pressables = screen.getAllByTestId('button-pressable');
        await user.press(pressables[0]);

        /* Check if pressable is disabled */
        expect(pressables[0]).toBeDisabled();
    });

    it('should call setErrorForm when password form is empty or invalid', async () => {

        /* Mock data of useAuth  */
        useAuthSpy.mockImplementation(() => ({
            state: { isAuthLoading: false, user: testUser },
            updateEmail: updateEmailMock,
            updatePassword: updatePasswordMock
        }) as any);

        renderComponent();

        /* Get pressable submit to send request of change password */
        const pressables = await screen.findAllByTestId('button-pressable');
        await user.press(pressables[1]);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call updatePassword when password form is valid', async () => {

        /* Mock data of useAuth  */
        useAuthSpy.mockImplementation(() => ({
            state: { isAuthLoading: false, user: testUser },
            updateEmail: updateEmailMock,
            updatePassword: updatePasswordMock
        }) as any);

        renderComponent();

        const newPass = 'new-password-1234';

        /* Get text inputs of change passowrd */
        const inputsText = await screen.findAllByTestId('form-field-text-input');
        await user.type(inputsText[1], newPass);
        await user.type(inputsText[2], newPass);

        /* Get pressable submit to send request of change password */
        const pressable = (await screen.findAllByTestId('button-pressable'))[1];
        await user.press(pressable);

        /* Check if updatedPassword is called one time and with respective args */
        expect(updatePasswordMock).toHaveBeenCalledTimes(1);
        expect(updatePasswordMock).toHaveBeenCalledWith({ password: newPass }, expect.any(Function));
    });

    it('should disabled button when isAuthLoading and isloadingPassword is true', async () => {

        /* Mock data of useAuth  */
        useAuthSpy.mockImplementation(() => ({
            state: { isAuthLoading: true, user: testUser },
            updateEmail: updateEmailMock,
            updatePassword: updatePasswordMock
        }) as any);

        renderComponent();

        const newPass = 'new-password-1234';

        /* Get text inputs of change passowrd */
        const inputsText = await screen.findAllByTestId('form-field-text-input');
        await user.type(inputsText[1], newPass);
        await user.type(inputsText[2], newPass);

        /* Get pressable submit to send request of change password */
        const pressables = await screen.findAllByTestId('button-pressable');
        await user.press(pressables[1]);

        /* Check if submit pressable is disabled */
        expect(pressables[1]).toBeDisabled();
    });
});