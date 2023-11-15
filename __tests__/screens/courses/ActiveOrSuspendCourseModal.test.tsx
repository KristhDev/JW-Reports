import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import hexToRgba from 'hex-to-rgba';

/* Screens */
import { ActiveOrSuspendCourseModal } from '../../../src/screens/courses';

/* Hooks */
import { useCourses, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Setup */
import { onCloseMock } from '../../../jest.setup';

/* Mocks */
import { activeOrSuspendCourseMock, courseSelectedStateMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <ActiveOrSuspendCourseModal /> screen', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: courseSelectedStateMock,
        activeOrSuspendCourse: activeOrSuspendCourseMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSLUCENT_COLOR: hexToRgba(darkColors.button, 0.50)
    });

    beforeEach(() => {
        render(
            <ActiveOrSuspendCourseModal
                isOpen
                onClose={ onCloseMock }
            />
        );
    });

    it('should to match snapshot', () => {
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render respective texts when selectedCourse isnt suspended', () => {

        /* Get motal text and touchable */
        const msg = screen.getByTestId('modal-text');
        const touchable = screen.getAllByTestId('button-touchable')[1];

        /**
         * Check if msg and touchable exists and contain respective values
         */
        expect(msg).toBeTruthy();
        expect(msg.props.children).toBe('¿Está seguro de suspender este curso?');
        expect(touchable).toBeTruthy();
        expect(touchable.props.children[0].props.children[1].props.children[0].props.children).toBe('SUSPENDER');
    });

    it('should call activeOrSuspendCourse when confirm button is pressed', () => {

        /* Get confirm touchable */
        const touchable = screen.getAllByTestId('button-touchable')[1];
        fireEvent.press(touchable);

        /**
         * Check if activeOrSuspendCourse is called one time with
         * respective args
         */
        expect(activeOrSuspendCourseMock).toHaveBeenCalledTimes(1);
        expect(activeOrSuspendCourseMock).toHaveBeenCalledWith(onCloseMock);
    });

    it('should call onClose when cancel button is pressed', () => {

        /* Get cancel touchable */
        const touchable = screen.getAllByTestId('button-touchable')[0];
        fireEvent.press(touchable);

        /* Check if onClose is called one times */
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should render loader when isCourseLoading is true', () => {

        /* Mock data of useCourses */
        (useCourses as jest.Mock).mockReturnValue({
            state: {
                ...courseSelectedStateMock,
                isCourseLoading: true
            },
            activeOrSuspendCourse: activeOrSuspendCourseMock
        });

        render(
            <ActiveOrSuspendCourseModal
                isOpen
                onClose={ onCloseMock }
            />
        );

        /* Get loader and check if exists */
        const loader = screen.getByTestId('modal-loading');
        expect(loader).toBeTruthy();
    });
});