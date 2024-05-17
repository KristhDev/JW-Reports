import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { onCloseMock, useLessonsSpy } from '../../../../../jest.setup';

/* Mock */
import { finishOrStartLessonMock, lessonSelectedStateMock } from '../../../../mocks';

/* Modules */
import { FinishOrStartLessonModal } from '../../../../../src/modules/lessons';

const user = userEvent.setup();
const renderScreen = () => render(
    <FinishOrStartLessonModal
        isOpen
        onClose={ onCloseMock }
    />
);

describe('Test in <FinishOrStartLessonModal /> screen', () => {
    useLessonsSpy.mockImplementation(() => ({
        state: lessonSelectedStateMock,
        finishOrStartLesson: finishOrStartLessonMock
    }) as any);

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective texts when selectedLesson isnt done', () => {
        renderScreen();

        /* Get msg and touchable */
        const msg = screen.getByTestId('modal-text');
        const pressable = screen.getAllByTestId('button-touchable')[1];

        /* Check if msg and touchable are rendered and containt respective values */
        expect(msg).toBeOnTheScreen();
        expect(msg).toHaveTextContent('¿Está seguro de terminar esta clase?');
        expect(pressable).toBeOnTheScreen();
        expect(pressable).toHaveTextContent('TERMINAR');
    });

    it('should call finishOrStartLesson when confirm button is pressed', async () => {
        renderScreen();

        /* Get touchable */
        const pressable = screen.getAllByTestId('button-touchable')[1];
        await user.press(pressable);

        /* Check if finishOrStartLesson was called one time with respective arg */
        expect(finishOrStartLessonMock).toHaveBeenCalledTimes(1);
        expect(finishOrStartLessonMock).toHaveBeenCalledWith(expect.any(Date), expect.any(Function));
    });

    it('should call onClose when cancel button is pressed', async () => {
        renderScreen();

        /* Get touchable */
        const pressable = screen.getAllByTestId('button-touchable')[0];
        await user.press(pressable);

        /* Check if onClose is called one time */
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should render loader when isLessonLoading is true', () => {
        useLessonsSpy.mockImplementation(() => ({
            state: {
                ...lessonSelectedStateMock,
                isLessonLoading: true
            },
            finishOrStartLesson: finishOrStartLessonMock
        }) as any);

        renderScreen();

        /* Get loader and check if exists */
        const loader = screen.getByTestId('modal-loading');
        expect(loader).toBeOnTheScreen();
    });
});