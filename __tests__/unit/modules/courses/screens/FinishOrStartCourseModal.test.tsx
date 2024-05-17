import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { onCloseMock, useCoursesSpy } from '../../../../../jest.setup';

/* Mocks */
import { courseSelectedStateMock, finishOrStartCourseMock } from '../../../../mocks';

/* Modules */
import { FinishOrStartCourseModal } from '../../../../../src/modules/courses';

const user = userEvent.setup();
const renderScreen = () => render(
    <FinishOrStartCourseModal
        isOpen
        onClose={ onCloseMock }
    />
);

describe('Test in <FinishOrStartCourseModal /> screen', () => {
    useCoursesSpy.mockImplementation(() => ({
        state: courseSelectedStateMock,
        finishOrStartCourse: finishOrStartCourseMock
    }) as any);

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective texts when selectedCourse isnt finished', () => {
        renderScreen();

        /* Get msg and pressable */
        const msg = screen.getByTestId('modal-text');
        const pressable = screen.getAllByTestId('button-touchable')[1];

        /* Check if msg and pressable are rendered and containt respective values */
        expect(msg).toBeOnTheScreen();
        expect(msg).toHaveTextContent('¿Está seguro de terminar este curso?');
        expect(pressable).toBeOnTheScreen();
        expect(pressable).toHaveTextContent('TERMINAR');
    });

    it('should call activeOrSuspendCourse when confirm button is pressed', async () => {
        renderScreen();

        /* Get pressable */
        const pressable = screen.getAllByTestId('button-touchable')[1];
        await user.press(pressable);

        /* Check if finishOrStartCourse is called one time with onClose */
        expect(finishOrStartCourseMock).toHaveBeenCalledTimes(1);
        expect(finishOrStartCourseMock).toHaveBeenCalledWith(onCloseMock);
    });

    it('should call onClose when cancel button is pressed', async () => {
        renderScreen();

        /* Get pressable */
        const pressable = screen.getAllByTestId('button-touchable')[0];
        await user.press(pressable);

        /* Check if onClose is called one time */
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should render loader when isCourseLoading is true', () => {
        useCoursesSpy.mockImplementation(() => ({
            state: {
                ...courseSelectedStateMock,
                isCourseLoading: true
            },
            finishOrStartCourse: finishOrStartCourseMock
        }) as any);

        renderScreen();

        /* Get loader and check if exists */
        const loader = screen.getByTestId('modal-loading');
        expect(loader).toBeOnTheScreen();
    });
});