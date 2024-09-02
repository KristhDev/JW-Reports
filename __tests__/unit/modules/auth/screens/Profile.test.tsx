import React from 'react';
import { act, render, screen } from '@testing-library/react-native';

/* Setup */
import { useAuthSpy, useStatusSpy, useUISpy } from '@test-setup';

/* Mocks */
import { setErrorFormMock, testUser, updateProfileMock } from '@mocks';

/* Modules */
import { Profile } from '@auth';
import { UI_INITIAL_STATE } from '@ui';

const renderScreen = () => render(<Profile />);

describe('Test in <Profile /> screen', () => {
    useAuthSpy.mockImplementation(() => ({
        state: { user: testUser, isAuthLoading: false },
        updateProfile: updateProfileMock
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
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent('Mi perfil');
    });
});