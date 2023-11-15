import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

/* Components */
import { PreachingForm } from '../../../src/components/preaching';

/* Features */
import { INIT_PREACHING } from '../../../src/features';

/* Hooks */
import { usePreaching, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mocks */
import { preachingSelectedStateMock, preachingsStateMock, savePreachingMock, setErrorFormMock, updatePreachingMock } from '../../mocks';

const preachingDay = '2022-12-29 00:00:00';
const initHour = '2022-12-30 09:00:00';
const finalHour = '2022-12-30 11:30:00';

/* Mock hooks */
jest.mock('../../../src/hooks/usePreaching.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <PreachingForm /> component', () => {
    (usePreaching as jest.Mock).mockReturnValue({
        state: {
            ...preachingsStateMock,
            seletedPreaching: {
                ...INIT_PREACHING,
                day: preachingDay,
                init_hour: initHour,
                final_hour: finalHour
            }
        },
        savePreaching: savePreachingMock,
        updatePreaching: updatePreachingMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<PreachingForm />);
        });

        await act(async () => {
            await waitFor(() => {
                expect(screen.toJSON()).toMatchSnapshot();
            });
        });
    });

    it('should call setErrorForm when form is invalid', async () => {

        /* Mock data of usePreaching */
        (usePreaching as jest.Mock).mockReturnValue({
            state: {
                ...preachingsStateMock,
                seletedPreaching: {
                    ...INIT_PREACHING,
                    day: preachingDay,
                    initHour: finalHour,
                    finalHour: initHour
                }
            },
            savePreaching: savePreachingMock,
            updatePreaching: updatePreachingMock
        });

        await waitFor(() => {
            render(<PreachingForm />);
        });

        const touchable = (await screen.findAllByTestId('button-touchable'))[3];

        await waitFor(() => {
            /* Get submit touchable */
            fireEvent.press(touchable);

        });

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call savePreaching when form is valid and selectedPreaching is empty', async () => {

        /* Mock data of usePreaching */
        (usePreaching as jest.Mock).mockReturnValue({
            state: {
                ...preachingsStateMock,
                seletedPreaching: {
                    ...INIT_PREACHING,
                    day: preachingDay,
                    initHour: initHour,
                    finalHour: finalHour
                }
            },
            savePreaching: savePreachingMock,
            updatePreaching: updatePreachingMock
        });

        await waitFor(() => {
            render(<PreachingForm />);
        });

        const touchable = (await screen.findAllByTestId('button-touchable'))[3];

        await waitFor(() => {

            /* Get submit touchable */
            fireEvent.press(touchable);

        });

        /* Get text of submit touchable */
        const btnText = (await screen.findAllByTestId('button-text'))[3];

        /**
         * Check if text of submit touchable is equal to Guardar and savePreaching
         * is called with respective args
         */
        expect(btnText.props.children).toBe('Guardar');
        expect(savePreachingMock).toHaveBeenCalledTimes(1);
        expect(savePreachingMock).toHaveBeenCalledWith({
            day: new Date(preachingDay),
            initHour: new Date(initHour),
            finalHour: new Date(finalHour),
        });
    });

    it('should call updatePreaching when form is valid and selectedPreaching isnt empty', async () => {

        /* Mock data of usePreaching */
        (usePreaching as jest.Mock).mockReturnValue({
            state: preachingSelectedStateMock,
            savePreaching: savePreachingMock,
            updatePreaching: updatePreachingMock
        });

        await waitFor(() => {
            render(<PreachingForm />);
        });

        const touchable = (await screen.findAllByTestId('button-touchable'))[3];

        await waitFor(() => {

            /* Get submit touchable */
            fireEvent.press(touchable);
        });

        /* Get text of submit touchable */
        const btnText = (await screen.findAllByTestId('button-text'))[3];

        /**
         * Check if text of submit touchable is equal to Actualizar and updatePreaching
         * is called with respective args
         */
        expect(btnText.props.children).toBe('Actualizar');
        expect(updatePreachingMock).toHaveBeenCalledTimes(1);
        expect(updatePreachingMock).toHaveBeenCalledWith({
            day: new Date(preachingSelectedStateMock.seletedPreaching.day),
            initHour: new Date(preachingSelectedStateMock.seletedPreaching.initHour),
            finalHour: new Date(preachingSelectedStateMock.seletedPreaching.finalHour),
        });
    });
});