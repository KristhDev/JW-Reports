import React from 'react';
import { act, render, screen } from '@testing-library/react-native';

import { useEmailSpy, useStatusSpy, useUISpy } from '@test-setup';

import { FeedbackScreen } from '@shared';

const renderScreen = () => render(<FeedbackScreen />);

useEmailSpy.mockImplementation(() => ({
    sendFeedbackEmail: jest.fn()
}) as any);

useStatusSpy.mockImplementation(() => ({
    setErrorForm: jest.fn()
}) as any);

useUISpy.mockImplementation(() => ({
    state: {
        isKeyboardVisible: false
    }
}) as any);

describe('Test in <FeedbackScreen /> screen', () => {
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
        expect(title).toHaveTextContent('SUGERENCIAS');
    });
});