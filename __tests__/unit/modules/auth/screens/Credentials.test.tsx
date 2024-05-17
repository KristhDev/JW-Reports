import React from 'react';
import { act, render, screen } from '@testing-library/react-native';

/* Setup */
import { useAuthSpy, useStatusSpy } from '../../../../../jest.setup';

/* Mocks */
import { setErrorFormMock, testUser, updateEmailMock, updatePasswordMock } from '../../../../mocks';

/* Modules */
import { Credentials } from '../../../../../src/modules/auth';

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
        expect(title).toHaveTextContent('Credenciales');
    });
});