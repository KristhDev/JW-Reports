import React from 'react';
import { act, render, screen, waitFor, userEvent } from '@testing-library/react-native';

/* Mocks */
import {
    preachingSelectedStateMock,
    preachingsStateMock,
    savePreachingMock,
    setErrorFormMock,
    updatePreachingMock
} from '../../../../mocks';

/* Modules */
import { INIT_PREACHING, PreachingForm, usePreaching } from '../../../../../src/modules/preaching';
import { useStatus } from '../../../../../src/modules/shared';

const preachingDay = '2022-12-29 00:00:00';
const initHour = '2022-12-30 09:00:00';
const finalHour = '2022-12-30 11:30:00';

/* Mock hooks */
jest.mock('../../../../../src/modules/preaching/hooks/usePreaching.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

const user = userEvent.setup();
const renderComponent = () => render(<PreachingForm />);

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

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            renderComponent();
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
            renderComponent();
        });

        const pressable = (await screen.findAllByTestId('button-touchable'))[3];
        await user.press(pressable);

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
            renderComponent();
        });

        const pressable = (await screen.findAllByTestId('button-touchable'))[3];
        await user.press(pressable);

        /* Get text of submit pressable and check if text is equal to Guardar */
        const btnText = (await screen.findAllByTestId('button-text'))[3];
        expect(btnText).toHaveTextContent('Guardar');

        /* Check if savePreaching is called with respective args */
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
            renderComponent();
        });

        const pressable = (await screen.findAllByTestId('button-touchable'))[3];
        await user.press(pressable);

        /* Get text of submit pressable and check if text is equal to Actualizar */
        const btnText = (await screen.findAllByTestId('button-text'))[3];
        expect(btnText).toHaveTextContent('Actualizar');

        /* Check if updatePreaching is called with respective args */
        expect(updatePreachingMock).toHaveBeenCalledTimes(1);
        expect(updatePreachingMock).toHaveBeenCalledWith({
            day: new Date(preachingSelectedStateMock.seletedPreaching.day),
            initHour: new Date(preachingSelectedStateMock.seletedPreaching.initHour),
            finalHour: new Date(preachingSelectedStateMock.seletedPreaching.finalHour),
        });
    });
});