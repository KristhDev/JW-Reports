import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';

/* Mocks */
import { preachingsStateMock } from '../../../../mocks';

/* Modules */
import { AddOrEditPreaching, INIT_PREACHING, usePreaching } from '../../../../../src/modules/preaching';
import { useStatus } from '../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../src/modules/preaching/hooks/usePreaching.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

const renderScreen = () => render(<AddOrEditPreaching />);

describe('Test in <AddOrEditPreaching /> screen', () => {
    (usePreaching as jest.Mock).mockReturnValue({
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
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: jest.fn()
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            renderScreen();
        });

        await waitFor(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render respective title when seletedPreaching is empty', async () => {
        await waitFor(() => {
            renderScreen();
        });

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent('Agregar día de predicación');
    });

    it('should render respective title when seletedPreaching isnt empty', async () => {

        /* Mock data in usePreaching */
        (usePreaching as jest.Mock).mockReturnValue({
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
        });

        await waitFor(() => {
            renderScreen();
        });

        /* Get title */
        const title = await screen.findByTestId('title-text');

        /* Check if title exists and contain value pass by props */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent('Editar día de predicación');
    });
});