import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

/* Components */
import { CourseForm } from '../../../src/components/courses';

/* Hooks */
import { useCourses, useStatus, useTheme } from '../../../src/hooks';

/* Theme */
import { darkColors } from '../../../src/theme';

/* Mocks */
import { courseSelectedStateMock, coursesStateMock, saveCourseMock, setErrorFormMock, updateCourseMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useCourses.ts');
jest.mock('../../../src/hooks/useStatus.ts');
jest.mock('../../../src/hooks/useTheme.ts');

describe('Test in <CourseForm /> component', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: coursesStateMock,
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

        const touchable = await screen.findByTestId('button-touchable');

        await waitFor(() => {
            /* Get submit touchable */
            fireEvent.press(touchable);
        });

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call saveCourse when the form is valid and selectedCourse is empty', async () => {
        await waitFor(() => {
            render(<CourseForm />);
        });

        const personName = 'Virginie';
        const personAbout = 'Fuga sint rerum voluptatem et quaerat consequatur quas iure.';
        const personAddress = 'Commodi dolorem nesciunt vel sunt quo magnam et enim accusamus. Enim error dolorem voluptas et sed accusamus similique quod.';
        const publication = 'eius velit veritatis';

        const inputsText = await  screen.findAllByTestId('form-field-text-input');

        await waitFor(() => {

            /* Get all text inputs to type person_name, person_about, person_address and publication */
            fireEvent(inputsText[0], 'onChangeText', personName);
            fireEvent(inputsText[1], 'onChangeText', personAbout);
            fireEvent(inputsText[2], 'onChangeText', personAddress);
            fireEvent(inputsText[3], 'onChangeText', publication);
        });

        /* Get submit touchable */
        const touchable = await screen.findByTestId('button-touchable');

        await waitFor(() => {
            fireEvent.press(touchable);
        });

        /* Check if setErrorForm is called one time */
        expect(saveCourseMock).toHaveBeenCalledTimes(1);

        /* Get text of submit touchable */
        const btnText = await screen.findByTestId('button-text');

        /**
         * Check if text of submit touchable is equal to Guardar and saveCourse
         * is called with respective args
         */
        expect(btnText.props.children).toBe('Guardar');
        expect(saveCourseMock).toHaveBeenCalledWith({ personName, personAbout, personAddress, publication });
    });

    it('should call updateCourse when the form is valid and selectedCourse isnt empty', async () => {

        /* Mock data of useCourses */
        (useCourses as jest.Mock).mockReturnValue({
            state: courseSelectedStateMock,
            saveCourse: saveCourseMock,
            updateCourse: updateCourseMock
        });

        await waitFor(() => {
            render(<CourseForm />);
        });

        const personAbout = 'Aliquid dolore quae et voluptatibus dicta.';
        const inputsText = await screen.findAllByTestId('form-field-text-input');

        await waitFor(() => {

            /* Get text input of about to type new content */
            fireEvent(inputsText[1], 'onChangeText', personAbout);
        });

        /* Get submit touchable */
        const touchable = await screen.findByTestId('button-touchable');

        await waitFor(() => {
            fireEvent.press(touchable);
        });

        /* Check if updateCourseMock is called one time */
        expect(updateCourseMock).toHaveBeenCalledTimes(1);

        /* Get text of submit touchable */
        const btnText = await screen.findByTestId('button-text');

        /**
         * Check if text of submit touchable is equal to Actualizar and updateCourse
         * is called with respective args
         */
        expect(btnText.props.children).toBe('Actualizar');
        expect(updateCourseMock).toHaveBeenCalledWith({
            personName: courseSelectedStateMock.selectedCourse.personName,
            personAbout: personAbout,
            personAddress: courseSelectedStateMock.selectedCourse.personAddress,
            publication: courseSelectedStateMock.selectedCourse.publication
        });
    });
});