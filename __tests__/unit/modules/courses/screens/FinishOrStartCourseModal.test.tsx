import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { onCloseMock } from '../../../../../jest.setup';

/* Mocks */
import { courseSelectedStateMock, finishOrStartCourseMock } from '../../../../mocks';

/* Modules */
import { FinishOrStartCourseModal, useCourses } from '../../../../../src/modules/courses';

/* Mock hooks */
jest.mock('../../../../../src/modules/courses/hooks/useCourses.ts');

const user = userEvent.setup();
const renderScreen = () => render(
    <FinishOrStartCourseModal
        isOpen
        onClose={ onCloseMock }
    />
);

describe('Test in <FinishOrStartCourseModal /> screen', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: courseSelectedStateMock,
        finishOrStartCourse: finishOrStartCourseMock
    });

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
        expect(pressable.props.children[0].props.children[1].props.children[0]).toHaveTextContent('TERMINAR');
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
        (useCourses as jest.Mock).mockReturnValue({
            state: {
                ...courseSelectedStateMock,
                isCourseLoading: true
            },
            finishOrStartCourse: finishOrStartCourseMock
        });

        renderScreen();

        /* Get loader and check if exists */
        const loader = screen.getByTestId('modal-loading');
        expect(loader).toBeOnTheScreen();
    });
});