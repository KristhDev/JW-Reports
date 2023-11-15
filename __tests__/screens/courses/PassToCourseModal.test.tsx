import React from 'react';
import { act, render, screen, waitFor, fireEvent } from '@testing-library/react-native';

/* Screens */
import { PassToCourseModal } from '../../../src/screens/courses';

/* Hooks */
import { useCourses, useRevisits, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Setup */
import { onCloseMock } from '../../../jest.setup';

/* Mocks */
import { saveCourseMock, selectedRevisitStateMock, setStatusMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useRevisits.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

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

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSPARENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(
                <PassToCourseModal
                    isOpen
                    onClose={ onCloseMock }
                />
            );
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should render person name of revisit', async () => {
        await waitFor(() => {
            render(
                <PassToCourseModal
                    isOpen
                    onClose={ onCloseMock }
                />
            );
        });

        await act(async () => {
            await waitFor(() => {

                /* Get modal title */
                const title = screen.getByTestId('modal-text');

                /* Check if title exists and contain respective value */
                expect(title).toBeTruthy();
                expect(title.props.children.join('')).toBe(`¿Está seguro de comenzar un curso bíblico con ${ selectedRevisitStateMock.selectedRevisit.personName }?`);
            });
        });
    });

    it('should call setStatus when form is invalid', async () => {
        await waitFor(() => {
            render(
                <PassToCourseModal
                    isOpen
                    onClose={ onCloseMock }
                />
            );
        });

        await act(async () => {
            await waitFor(() => {

                /* Get touchable */
                const touchable = screen.getAllByTestId('button-touchable')[1];
                fireEvent.press(touchable);

                /* Check if setStatus is called one time */
                expect(setStatusMock).toHaveBeenCalledTimes(1);
            });
        });
    });

    it('should call saveCourse when form is valid', async () => {
        await waitFor(() => {
            render(
                <PassToCourseModal
                    isOpen
                    onClose={ onCloseMock }
                />
            );
        });

        const pubName = 'Regional Interactions Assistant';

        await act(async () => {
            await waitFor(() => {

                /* Get touchable */
                const touchable = screen.getAllByTestId('button-touchable')[1];
                fireEvent.press(touchable);

                /* Get text input and type new value */
                const input = screen.getByTestId('form-field-text-input');
                fireEvent(input, 'onChangeText', pubName);

                /* Get confirm touchable */
                const touchableConfirm = screen.getAllByTestId('button-touchable')[1];
                fireEvent.press(touchableConfirm);

                /* Check if saveCourse is called */
                expect(saveCourseMock).toHaveBeenCalled();
            });

            /* Check if saveCourse is called with respective values */
            expect(saveCourseMock).toHaveBeenCalledWith({
                personName: selectedRevisitStateMock.selectedRevisit.personName,
                personAbout: selectedRevisitStateMock.selectedRevisit.about,
                personAddress: selectedRevisitStateMock.selectedRevisit.address,
                publication: pubName
            }, onCloseMock);
        });
    });
});