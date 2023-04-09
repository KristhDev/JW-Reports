import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react-native';

/* Screens */
import { AddOrEditPreaching } from '../../../src/screens/preaching';

/* Features */
import { INIT_PREACHING } from '../../../src/features/preaching';
import { preachingsState } from '../../features/preaching';

/* Hooks */
import { usePreaching, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mock hooks */
jest.mock('../../../src/hooks/usePreaching.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <AddOrEditPreaching /> screen', () => {
    (usePreaching as jest.Mock).mockReturnValue({
        state: {
            ...preachingsState,
            seletedPreaching: {
                ...INIT_PREACHING,
                day: '2022-12-29 00:00:00',
                init_hour: '2022-12-30 09:00:00',
                final_hour: '2022-12-30 09:00:00'
            }
        },
        savePreaching: jest.fn(),
        updatePreaching: jest.fn()
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: jest.fn()
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<AddOrEditPreaching />);
        });

        await act(async () => {
            await waitFor(() => {
                expect(screen.toJSON()).toMatchSnapshot();
            });
        });
    });

    it('should render respective title when seletedPreaching is empty', async () => {
        await waitFor(() => {
            render(<AddOrEditPreaching />);
        });

        await act(async () => {
            await waitFor(() => {

                /* Get title */
                const title = screen.getByTestId('title-text');

                /* Check if title exists and contain value pass by props */
                expect(title).toBeTruthy();
                expect(title.props.children).toBe('Agregar día de predicación');
            });
        })
    });

    it('should render respective title when seletedPreaching isnt empty', async () => {

        /* Mock data in usePreaching */
        (usePreaching as jest.Mock).mockReturnValue({
            state: {
                ...preachingsState,
                seletedPreaching: {
                    ...INIT_PREACHING,
                    id: '0c0d257e-5031-4111-9f0b-d10cdb2efb92',
                    user_id: 'f366c803-37cc-43c9-91c1-c78ec6a0718d',
                    day: '2022-12-29 00:00:00',
                    init_hour: '2022-12-30 09:00:00',
                    final_hour: '2022-12-30 10:30:00'
                }
            },
            savePreaching: jest.fn(),
            updatePreaching: jest.fn()
        });

        await waitFor(() => {
            render(<AddOrEditPreaching />);
        });

        await act(async () => {
            await waitFor(() => {

                /* Get title */
                const title = screen.getByTestId('title-text');

                /* Check if title exists and contain value pass by props */
                expect(title).toBeTruthy();
                expect(title.props.children).toBe('Editar día de predicación');
            });
        });
    });
});