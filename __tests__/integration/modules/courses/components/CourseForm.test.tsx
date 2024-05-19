import React from 'react';
import { act, render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { useCoursesSpy, useStatusSpy } from '../../../../../jest.setup';

/* Mocks */
import { courseSelectedStateMock, coursesStateMock, saveCourseMock, setErrorFormMock, updateCourseMock } from '../../../../mocks';

/* Modules */
import { CourseForm } from '../../../../../src/modules/courses';

const user = userEvent.setup();
const renderComponent = () => render(<CourseForm />);

describe('Test in <CourseForm /> component', () => {
    useCoursesSpy.mockImplementation(() => ({
        state: coursesStateMock,
        saveCourse: saveCourseMock,
        updateCourse: updateCourseMock
    }) as any);

    useStatusSpy.mockImplementation(() => ({
        setErrorForm: setErrorFormMock
    }) as any);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', async () => {
        renderComponent();

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when the form is empty or invalid', async () => {
        renderComponent();

        const pressable = await screen.findByTestId('button-touchable');
        await user.press(pressable);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call saveCourse when the form is valid and selectedCourse is empty', async () => {
        renderComponent();

        const personName = 'Virginie';
        const personAbout = 'Fuga sint rerum voluptatem et quaerat consequatur quas iure.';
        const personAddress = 'Commodi dolorem nesciunt vel sunt quo magnam et enim accusamus. Enim error dolorem voluptas et sed accusamus similique quod.';
        const publication = 'eius velit veritatis';

        const inputsText = await  screen.findAllByTestId('form-field-text-input');

        await user.type(inputsText[0], personName);
        await user.type(inputsText[1], personAbout);
        await user.type(inputsText[2], personAddress);
        await user.type(inputsText[3], publication);

        /* Get submit pressable */
        const pressable = await screen.findByTestId('button-touchable');
        await user.press(pressable);

        /* Check if setErrorForm is called one time */
        expect(saveCourseMock).toHaveBeenCalledTimes(1);

        /* Check if text of pressable is equal to Guardar */
        expect(pressable).toHaveTextContent('Guardar');

        /* check if saveCourse is called with respective args */
        expect(saveCourseMock).toHaveBeenCalledTimes(1);
        expect(saveCourseMock).toHaveBeenCalledWith({ personName, personAbout, personAddress, publication });
    });

    it('should call updateCourse when the form is valid and selectedCourse isnt empty', async () => {

        /* Mock data of useCourses */
        useCoursesSpy.mockImplementation(() => ({
            state: courseSelectedStateMock,
            saveCourse: saveCourseMock,
            updateCourse: updateCourseMock
        }) as any);

        renderComponent();

        const personAbout = 'Aliquid dolore quae et voluptatibus dicta.';

        const inputsText = await screen.findAllByTestId('form-field-text-input');
        await user.clear(inputsText[1]);
        await user.type(inputsText[1], personAbout);

        /* Get submit touchable */
        const pressable = await screen.findByTestId('button-touchable');
        await user.press(pressable);

        /* Check if text of pressable is equal to Actualizar */
        expect(pressable).toHaveTextContent('Actualizar');

        /* Check if updateCourse is called with respective args */
        expect(updateCourseMock).toHaveBeenCalledTimes(1);
        expect(updateCourseMock).toHaveBeenCalledWith({
            personName: courseSelectedStateMock.selectedCourse.personName,
            personAbout: personAbout,
            personAddress: courseSelectedStateMock.selectedCourse.personAddress,
            publication: courseSelectedStateMock.selectedCourse.publication
        });
    });
});