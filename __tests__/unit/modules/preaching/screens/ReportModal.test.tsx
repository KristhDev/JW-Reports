import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setups */
import { onCloseMock, shareSpy, useAuthSpy, useCoursesSpy, usePreachingSpy } from '@test-setup';

/* Mocks */
import {
    authenticateLDCMock,
    authenticatePrecursorMock,
    authenticateStateMock,
    coursesStateMock,
    preachingsStateMock
} from '@mocks';

/* Modules */
import { ReportModal, ReportModalProps } from '@preaching';

/* Utils */
import { date } from '@utils';

useAuthSpy.mockImplementation(() => ({
    state: authenticateStateMock
}) as any);

usePreachingSpy.mockImplementation(() => ({
    state: preachingsStateMock
}) as any);

useCoursesSpy.mockImplementation(() => ({
    state: coursesStateMock
}) as any);

const renderModal = (props: ReportModalProps) => render(<ReportModal { ...props } />);

describe('Test in <ReportModal /> modal', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', () => {
        renderModal({
            isOpen: true,
            month: 'Enero',
            onClose: onCloseMock
        });

        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render values and elements of user without precursor', () => {
        renderModal({
            isOpen: true,
            month: 'Enero',
            onClose: onCloseMock
        });

        const usernameText = screen.getByTestId('report-modal-username-text');
        const monthText = screen.getByTestId('report-modal-month-text');
        const totalCoursesText = screen.getByTestId('report-modal-courses-text');

        const totalCourses = coursesStateMock.courses.filter(c => !c.suspended && !c.finished)?.length;

        expect(usernameText).toHaveTextContent(`${ authenticateStateMock.user.name } ${ authenticateStateMock.user.surname }`);
        expect(monthText).toHaveTextContent('Enero');
        expect(totalCoursesText).toHaveTextContent(totalCourses.toString());
    });

    it('should render hours if user is a precursor', () => {
        useAuthSpy.mockImplementation(() => ({
            state: authenticatePrecursorMock
        }) as any);

        renderModal({
            isOpen: true,
            month: 'Enero',
            onClose: onCloseMock
        });

        const hoursText = screen.queryByTestId('report-modal-hours-text');
        const totalHours = date.sumHours(preachingsStateMock.preachings.map(p => ({ init: p.initHour, finish: p.finalHour })));

        expect(hoursText).toBeOnTheScreen();
        expect(hoursText).toHaveTextContent(totalHours.toString());
    });

    it('should render hours LDC text input if user is a precursor and hoursLDC is true', () => {
        useAuthSpy.mockImplementation(() => ({
            state: authenticateLDCMock
        }) as any);

        renderModal({
            isOpen: true,
            month: 'Enero',
            onClose: onCloseMock
        });

        const hoursLDCInputText = screen.queryByTestId('report-modal-hours-ldc-text-input');
        expect(hoursLDCInputText).toBeOnTheScreen();
    });

    it('should call onClose when close button is pressed', async () => {
        renderModal({
            isOpen: true,
            month: 'Enero',
            onClose: onCloseMock
        });

        const closePressable = screen.getAllByTestId('button-pressable')[0];
        await userEvent.press(closePressable);

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should call onClose and share when send button is pressed', async () => {
        shareSpy.mockResolvedValue({ action: 'sharedAction' });

        renderModal({
            isOpen: true,
            month: 'Enero',
            onClose: onCloseMock
        });

        const sendPressable = screen.getAllByTestId('button-pressable')[1];
        await userEvent.press(sendPressable);

        expect(shareSpy).toHaveBeenCalledTimes(1);
        expect(shareSpy).toHaveBeenCalledWith({ message: expect.any(String) });

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it('should not clean comment text input if action of shared is dismissedAction', async () => {
        shareSpy.mockResolvedValue({ action: 'dismissedAction' });

        renderModal({
            isOpen: true,
            month: 'Enero',
            onClose: onCloseMock
        });

        const comment = 'This is a comment';
        const commentTextInput = screen.getByTestId('report-modal-comment-text-input');
        await userEvent.type(commentTextInput, comment);

        const sendPressable = screen.getAllByTestId('button-pressable')[1];
        await userEvent.press(sendPressable);

        expect(shareSpy).toHaveBeenCalledTimes(1);
        expect(shareSpy).toHaveBeenCalledWith({ message: expect.any(String) });

        expect(onCloseMock).toHaveBeenCalledTimes(1);
        expect(commentTextInput).toHaveDisplayValue(comment);
    });
});