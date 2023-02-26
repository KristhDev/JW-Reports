import React from 'react';
import { act, render, screen, waitFor, fireEvent } from '@testing-library/react-native';

import { PassToCourseModal } from '../../../src/screens/courses';

import { selectedRevisitState } from '../../features/revisits';

import { useCourses, useRevisits, useStatus, useTheme } from '../../../src/hooks';

import { darkColors } from '../../../src/theme';

const saveCourseMock = jest.fn();
const setStatusMock = jest.fn();
const onCloseMock = jest.fn();

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
        state: selectedRevisitState
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
                const title = screen.getByTestId('modal-text');

                expect(title).toBeTruthy();
                expect(title.props.children.join('')).toBe(`¿Está seguro de comenzar un curso bíblico con ${ selectedRevisitState.selectedRevisit.person_name }?`);
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
                const touchable = screen.getAllByTestId('button-touchable')[1];
                fireEvent.press(touchable);

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
                const touchable = screen.getAllByTestId('button-touchable')[1];
                fireEvent.press(touchable);

                const input = screen.getByTestId('form-field-text-input');
                fireEvent(input, 'onChangeText', pubName);

                const touchableConfirm = screen.getAllByTestId('button-touchable')[1];
                fireEvent.press(touchableConfirm);

                expect(saveCourseMock).toHaveBeenCalled();
            });

            expect(saveCourseMock).toHaveBeenCalledWith({
                person_name: selectedRevisitState.selectedRevisit.person_name,
                person_about: selectedRevisitState.selectedRevisit.about,
                person_address: selectedRevisitState.selectedRevisit.address,
                publication: pubName
            }, onCloseMock);
        });
    });
});