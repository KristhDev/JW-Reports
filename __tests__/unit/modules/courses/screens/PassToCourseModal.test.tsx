import React from 'react';
import { act, render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { onCloseMock, useCoursesSpy, useRevisitsSpy, useStatusSpy } from '../../../../../jest.setup';

/* Mocks */
import { saveCourseMock, selectedRevisitStateMock, setStatusMock } from '../../../../mocks';

/* Modules */
import { PassToCourseModal } from '../../../../../src/modules/courses';

const user = userEvent.setup();
const renderScreen = () => render(
    <PassToCourseModal
        isOpen
        onClose={ onCloseMock }
    />
);

describe('Test in <PassToCourseModal /> screen', () => {
    useCoursesSpy.mockImplementation(() => ({
        state: { isCourseLoading: false },
        saveCourse: saveCourseMock
    }) as any);

    useRevisitsSpy.mockImplementation(() => ({
        state: selectedRevisitStateMock
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setStatus: setStatusMock
    }) as any);

    it('should to match snapshot', async () => {
        renderScreen();

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render person name of revisit', async () => {
        renderScreen();

        /* Get modal title */
        const title = await screen.findByTestId('modal-text');

        /* Check if title exists and contain respective value */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent(`¿Está seguro de comenzar un curso bíblico con ${ selectedRevisitStateMock.selectedRevisit.personName }?`);
    });

    it('should call setStatus when form is invalid', async () => {
        renderScreen();

        /* Get pressable */
        const pressable = (await screen.findAllByTestId('button-pressable'))[1];
        await user.press(pressable);

        /* Get confirm pressable */
        const pressableConfirm = screen.getAllByTestId('button-pressable')[1];
        await user.press(pressableConfirm);

        /* Check if setStatus is called one time */
        expect(setStatusMock).toHaveBeenCalledTimes(1);
    });

    it('should call saveCourse when form is valid', async () => {
        renderScreen();

        const pubName = 'Regional Interactions Assistant';

        /* Get pressable */
        const pressable = screen.getAllByTestId('button-pressable')[1];
        await user.press(pressable);

        /* Get text input and type new value */
        const input = screen.getByTestId('form-field-text-input');
        await user.type(input, pubName);

        /* Get confirm pressable */
        const pressableConfirm = screen.getAllByTestId('button-pressable')[1];
        await user.press(pressableConfirm);

        /* Check if saveCourse is called */
        expect(saveCourseMock).toHaveBeenCalled();

        /* Check if saveCourse is called with respective values */
        expect(saveCourseMock).toHaveBeenCalledWith({
            personName: selectedRevisitStateMock.selectedRevisit.personName,
            personAbout: selectedRevisitStateMock.selectedRevisit.about,
            personAddress: selectedRevisitStateMock.selectedRevisit.address,
            publication: pubName
        }, onCloseMock);
    });
});