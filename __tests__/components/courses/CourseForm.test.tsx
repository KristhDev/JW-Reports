import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

/* Components */
import { CourseForm } from '../../../src/components/courses';

/* Features */
import { coursesState, courseSelectedState } from '../../features/courses';

/* Hooks */
import { useCourses, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

const saveCourseMock = jest.fn();
const updateCourseMock = jest.fn();
const setErrorFormMock = jest.fn();

/* Mock hooks */
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <CourseForm /> component', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: coursesState,
        saveCourse: saveCourseMock,
        updateCourse: updateCourseMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    (useTheme as jest.Mock).mockReturnValue({
        state: { colors: darkColors },
        BUTTON_TRANSPARENT_COLOR: 'rgba(255, 255, 255, 0.15)'
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            render(<CourseForm />);
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when the form is empty or invalid', async () => {
        await waitFor(() => {
            render(<CourseForm />);
        });

        await waitFor(() => {

            /* Get submit touchable */
            const touchable = screen.getByTestId('button-touchable');
            fireEvent.press(touchable);

            /* Check if setErrorForm is called one time */
            expect(setErrorFormMock).toHaveBeenCalledTimes(1);
        });
    });

    it('should call saveCourse when the form is valid and selectedCourse is empty', async () => {
        await waitFor(() => {
            render(<CourseForm />);
        });

        const person_name = 'Virginie';
        const person_about = 'Fuga sint rerum voluptatem et quaerat consequatur quas iure.';
        const person_address = 'Commodi dolorem nesciunt vel sunt quo magnam et enim accusamus. Enim error dolorem voluptas et sed accusamus similique quod.';
        const publication = 'eius velit veritatis';

        await act(async() => {
            await waitFor(() => {

                /* Get all text inputs to type person_name, person_about, person_address and publication */
                const inputsText = screen.getAllByTestId('form-field-text-input');
                fireEvent(inputsText[0], 'onChangeText', person_name);
                fireEvent(inputsText[1], 'onChangeText', person_about);
                fireEvent(inputsText[2], 'onChangeText', person_address);
                fireEvent(inputsText[3], 'onChangeText', publication);

                /* Get submit touchable */
                const touchable = screen.getByTestId('button-touchable');
                fireEvent.press(touchable);

                /* Check if setErrorForm is called one time */
                expect(saveCourseMock).toHaveBeenCalledTimes(1);
            });

            /* Get text of submit touchable */
            const btnText = screen.getByTestId('button-text');

            /**
             * Check if text of submit touchable is equal to Guardar and saveCourse
             * is called with respective args
             */
            expect(btnText.props.children).toBe('Guardar');
            expect(saveCourseMock).toHaveBeenCalledWith({ person_name, person_about, person_address, publication });
        });
    });

    it('should call updateCourse when the form is valid and selectedCourse isnt empty', async () => {

        /* Mock data of useCourses */
        (useCourses as jest.Mock).mockReturnValue({
            state: courseSelectedState,
            saveCourse: saveCourseMock,
            updateCourse: updateCourseMock
        });

        await waitFor(() => {
            render(<CourseForm />);
        });

        const person_about = 'Aliquid dolore quae et voluptatibus dicta.';

        await act(async() => {
            await waitFor(() => {

                /* Get text input of about to type new content */
                const inputsText = screen.getAllByTestId('form-field-text-input');
                fireEvent(inputsText[1], 'onChangeText', person_about);

                /* Get submit touchable */
                const touchable = screen.getByTestId('button-touchable');
                fireEvent.press(touchable);

                /* Check if updateCourseMock is called one time */
                expect(updateCourseMock).toHaveBeenCalledTimes(1);
            });

            /* Get text of submit touchable */
            const btnText = screen.getByTestId('button-text');

            /**
             * Check if text of submit touchable is equal to Actualizar and updateCourse
             * is called with respective args
             */
            expect(btnText.props.children).toBe('Actualizar');
            expect(updateCourseMock).toHaveBeenCalledWith({
                person_name: courseSelectedState.selectedCourse.person_name,
                person_about,
                person_address: courseSelectedState.selectedCourse.person_address,
                publication: courseSelectedState.selectedCourse.publication
            });
        });
    });
});