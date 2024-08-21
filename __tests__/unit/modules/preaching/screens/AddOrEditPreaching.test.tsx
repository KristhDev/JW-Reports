import React from 'react';
import { act, render, screen } from '@testing-library/react-native';

/* Setup */
import { usePreachingSpy, useStatusSpy, useUISpy } from '../../../../../jest.setup';

/* Mocks */
import { preachingsStateMock } from '../../../../mocks';

/* Modules */
import { AddOrEditPreaching, INIT_PREACHING } from '../../../../../src/modules/preaching';
import { UI_INITIAL_STATE } from '../../../../../src/modules/ui';

const renderScreen = () => render(<AddOrEditPreaching />);

describe('Test in <AddOrEditPreaching /> screen', () => {
    usePreachingSpy.mockImplementation(() => ({
        state: {
            ...preachingsStateMock,
            seletedPreaching: {
                ...INIT_PREACHING,
                day: '2022-12-29 00:00:00',
                initHour: '2022-12-30 09:00:00',
                finalHour: '2022-12-30 09:00:00'
            }
        },
        savePreaching: jest.fn(),
        updatePreaching: jest.fn()
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setErrorForm: jest.fn()
    }) as any);

    useUISpy.mockImplementation(() => ({
        state: UI_INITIAL_STATE
    }) as any);

    it('should to match snapshot', async () => {
        renderScreen();

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render respective title when seletedPreaching is empty', async () => {
        renderScreen();

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent('Agregar día de predicación');
    });

    it('should render respective title when seletedPreaching isnt empty', async () => {

        /* Mock data in usePreaching */
        usePreachingSpy.mockImplementation(() => ({
            state: {
                ...preachingsStateMock,
                seletedPreaching: {
                    ...INIT_PREACHING,
                    id: '0c0d257e-5031-4111-9f0b-d10cdb2efb92',
                    userId: 'f366c803-37cc-43c9-91c1-c78ec6a0718d',
                    day: '2022-12-29 00:00:00',
                    initHour: '2022-12-30 09:00:00',
                    finalHour: '2022-12-30 10:30:00'
                }
            },
            savePreaching: jest.fn(),
            updatePreaching: jest.fn()
        }) as any);

        renderScreen();

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent('Editar día de predicación');
    });
});