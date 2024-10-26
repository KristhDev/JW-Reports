import React from 'react';
import { act, render, screen } from '@testing-library/react-native';

/* Mocks */
import { setErrorFormMock, testUser, useAuthSpy, useStatusSpy, useUISpy, updateEmailMock, updatePasswordMock } from '@mocks';

/* Features */
import { UI_INITIAL_STATE } from '@application/features';

/* Modules */
import { Credentials } from '@auth';

const renderScreen = () => render(<Credentials />);

describe('Test in <ForgotPassword /> screen', () => {
    useAuthSpy.mockImplementation(() => ({
        state: { isAuthLoading: false, user: testUser },
        updateEmail: updateEmailMock,
        updatePassword: updatePasswordMock
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setErrorForm: setErrorFormMock
    }) as any);

    useUISpy.mockImplementation(() => ({
        state: UI_INITIAL_STATE
    }) as any);

    it('should to match snapshot', async () => {
        renderScreen()

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render respective title', async () => {
        renderScreen();

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeTruthy();
        expect(title).toHaveTextContent('CREDENCIALES');
    });
});