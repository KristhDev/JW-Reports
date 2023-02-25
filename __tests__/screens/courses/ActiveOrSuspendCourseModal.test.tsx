import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import hexToRgba from 'hex-to-rgba';

import { ActiveOrSuspendCourseModal } from '../../../src/screens/courses';

import { courseSelectedState } from '../../features/courses';

import { useCourses, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const onCloseMock = jest.fn();
const activeOrSuspendCourseMock = jest.fn();

jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <ActiveOrSuspendCourseModal /> screen', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: courseSelectedState,
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
        const msg = screen.getByTestId('modal-text');
        const touchable = screen.getAllByTestId('button-touchable')[1];

        expect(msg).toBeTruthy();
        expect(msg.props.children).toBe('¿Está seguro de suspender este curso?');
        expect(touchable).toBeTruthy();
        expect(touchable.props.children[0].props.children[0].props.children).toBe('SUSPENDER');
    });

    it('should call activeOrSuspendCourse when confirm button is pressed', () => {
        const touchable = screen.getAllByTestId('button-touchable')[1];
        fireEvent.press(touchable);

        expect(activeOrSuspendCourseMock).toHaveBeenCalledTimes(1);
        expect(activeOrSuspendCourseMock).toHaveBeenCalledWith(onCloseMock);
    });

    it('should call onClose when cancel button is pressed', () => {
        const touchable = screen.getAllByTestId('button-touchable')[0];
        fireEvent.press(touchable);

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should render loader when isCourseLoading is true', () => {
        (useCourses as jest.Mock).mockReturnValue({
            state: {
                ...courseSelectedState,
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

        const loader = screen.getByTestId('modal-loading');
        expect(loader).toBeTruthy();
    });
});