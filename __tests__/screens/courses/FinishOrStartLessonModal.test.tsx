import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import hexToRgba from 'hex-to-rgba';

/* Screens */
import { FinishOrStartLessonModal } from '../../../src/screens/courses';

/* Hooks */
import { useCourses, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Setup */
import { onCloseMock } from '../../../jest.setup';

/* Mock */
import { finishOrStartLessonMock, lessonSelectedStateMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <FinishOrStartLessonModal /> screen', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: lessonSelectedStateMock,
        finishOrStartLesson: finishOrStartLessonMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSLUCENT_COLOR: hexToRgba(darkColors.button, 0.50)
    });

    beforeEach(() => {
        render(
            <FinishOrStartLessonModal
                isOpen
                onClose={ onCloseMock }
            />
        );
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective texts when selectedLesson isnt done', () => {

        /* Get msg and touchable */
        const msg = screen.getByTestId('modal-text');
        const touchable = screen.getAllByTestId('button-touchable')[1];

        /* Check if msg and touchable are rendered and containt respective values */
        expect(msg).toBeTruthy();
        expect(msg.props.children).toBe('¿Está seguro de terminar esta clase?');
        expect(touchable).toBeTruthy();
        expect(touchable.props.children[0].props.children[1].props.children[0].props.children).toBe('TERMINAR');
    });

    it('should call finishOrStartLesson when confirm button is pressed', () => {

        /* Get touchable */
        const touchable = screen.getAllByTestId('button-touchable')[1];
        fireEvent.press(touchable);

        /* Check if finishOrStartLesson was called one time with respective arg */
        expect(finishOrStartLessonMock).toHaveBeenCalledTimes(1);
        expect(finishOrStartLessonMock).toHaveBeenCalledWith(expect.any(Date), expect.any(Function));
    });

    it('should call onClose when cancel button is pressed', () => {

        /* Get touchable */
        const touchable = screen.getAllByTestId('button-touchable')[0];
        fireEvent.press(touchable);

        /* Check if onClose is called one time */
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should render loader when isLessonLoading is true', () => {
        (useCourses as jest.Mock).mockReturnValue({
            state: {
                ...lessonSelectedStateMock,
                isLessonLoading: true
            },
            finishOrStartLesson: finishOrStartLessonMock
        });

        render(
            <FinishOrStartLessonModal
                isOpen
                onClose={ onCloseMock }
            />
        );

        /* Get loader and check if exists */
        const loader = screen.getByTestId('modal-loading');
        expect(loader).toBeTruthy();
    });
});