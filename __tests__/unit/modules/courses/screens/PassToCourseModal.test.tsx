import React from 'react';
import { act, render, screen, waitFor, userEvent } from '@testing-library/react-native';

/* Setup */
import { onCloseMock } from '../../../../../jest.setup';

/* Mocks */
import { saveCourseMock, selectedRevisitStateMock, setStatusMock } from '../../../../mocks';

/* Modules */
import { PassToCourseModal, useCourses } from '../../../../../src/modules/courses';
import { useRevisits } from '../../../../../src/modules/revisits';
import { useStatus } from '../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../src/modules/courses/hooks/useCourses.ts');
jest.mock('../../../../../src/modules/revisits/hooks/useRevisits.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

const user = userEvent.setup();
const renderScreen = () => render(
    <PassToCourseModal
        isOpen
        onClose={ onCloseMock }
    />
);

describe('Test in <PassToCourseModal />', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: { isCourseLoading: false },
        saveCourse: saveCourseMock
    });

    (useRevisits as jest.Mock).mockReturnValue({
        state: selectedRevisitStateMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setStatus: setStatusMock
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            renderScreen();
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render person name of revisit', async () => {
        await waitFor(() => {
            renderScreen();
        });

        /* Get modal title */
        const title = await screen.findByTestId('modal-text');

        /* Check if title exists and contain respective value */
        expect(title).toBeOnTheScreen();
        expect(title).toHaveTextContent(`¿Está seguro de comenzar un curso bíblico con ${ selectedRevisitStateMock.selectedRevisit.personName }?`);
    });

    it('should call setStatus when form is invalid', async () => {
        await waitFor(() => {
            renderScreen();
        });

        /* Get touchable */
        const pressable = (await screen.findAllByTestId('button-touchable'))[1];
        await user.press(pressable);

        /* Check if setStatus is called one time */
        expect(setStatusMock).toHaveBeenCalledTimes(1);
    });

    it('should call saveCourse when form is valid', async () => {
        await waitFor(() => {
            renderScreen();
        });

        const pubName = 'Regional Interactions Assistant';

        /* Get touchable */
        const pressable = screen.getAllByTestId('button-touchable')[1];
        await user.press(pressable);

        /* Get text input and type new value */
        const input = screen.getByTestId('form-field-text-input');
        await user.type(input, pubName);

        /* Get confirm touchable */
        const pressableConfirm = screen.getAllByTestId('button-touchable')[1];
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