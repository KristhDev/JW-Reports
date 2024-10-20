import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { onCloseMock, useCoursesSpy } from '@test-setup';

/* Mocks */
import { activeOrSuspendCourseMock, courseSelectedStateMock } from '@mocks';

/* Modules */
import { ActiveOrSuspendCourseModal } from '@courses';

const user = userEvent.setup();

const renderScreen = () => render(
    <ActiveOrSuspendCourseModal
        isOpen
        onClose={ onCloseMock }
    />
);

describe('Test in <ActiveOrSuspendCourseModal /> screen', () => {
    useCoursesSpy.mockImplementation(() => ({
        state: courseSelectedStateMock,
        activeOrSuspendCourse: activeOrSuspendCourseMock
    }) as any);

    it('should to match snapshot', () => {
        renderScreen();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective texts when selectedCourse isnt suspended', async () => {
        renderScreen();

        /* Get motal text and pressable */
        const msg = screen.queryByTestId('modal-text');
        const pressableText = screen.queryByText('SUSPENDER')

        /* Check if msg and pressable exists and contain respective values */
        expect(msg).toBeOnTheScreen();
        expect(msg).toHaveTextContent('¿Está seguro de suspender este curso?');
        expect(pressableText).toBeOnTheScreen();
        expect(pressableText).toHaveTextContent('SUSPENDER');
    });

    it('should call activeOrSuspendCourse when confirm button is pressed', async () => {
        renderScreen();

        /* Get confirm pressable */
        const pressable = screen.getAllByTestId('button-pressable')[1];
        await user.press(pressable);

        /**
         * Check if activeOrSuspendCourse is called one time with
         * respective args
         */
        expect(activeOrSuspendCourseMock).toHaveBeenCalledTimes(1);
        expect(activeOrSuspendCourseMock).toHaveBeenCalledWith(onCloseMock);
    });

    it('should call onClose when cancel button is pressed', async () => {
        renderScreen();

        /* Get cancel pressable */
        const pressable = screen.getAllByTestId('button-pressable')[0];
        await user.press(pressable);

        /* Check if onClose is called one times */
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should render loader when isCourseLoading is true', () => {

        /* Mock data of useCourses */
        useCoursesSpy.mockImplementation(() => ({
            state: {
                ...courseSelectedStateMock,
                isCourseLoading: true
            },
            activeOrSuspendCourse: activeOrSuspendCourseMock
        }) as any);

        renderScreen();

        /* Get loader and check if exists */
        const loader = screen.queryByTestId('modal-loading');
        expect(loader).toBeOnTheScreen();
    });
});