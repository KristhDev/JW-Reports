import React from 'react';
import { act, render, screen, userEvent, waitFor } from '@testing-library/react-native';

/* Mocks */
import { courseSelectedStateMock, coursesStateMock, saveCourseMock, setErrorFormMock, updateCourseMock } from '../../../../mocks';

/* Modules */
import { CourseForm, useCourses } from '../../../../../src/modules/courses';
import { useStatus } from '../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../src/modules/courses/hooks/useCourses.ts');
jest.mock('../../../../../src/modules/shared/hooks/useStatus.ts');

const user = userEvent.setup();
const renderComponent = () => render(<CourseForm />);

describe('Test in <CourseForm /> component', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: coursesStateMock,
        saveCourse: saveCourseMock,
        updateCourse: updateCourseMock
    });

    (useStatus as jest.Mock).mockReturnValue({
        setErrorForm: setErrorFormMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should to match snapshot', async () => {
        await waitFor(() => {
            renderComponent();
        });

        await act(() => {
            expect(screen.toJSON()).toMatchSnapshot();
        });
    });

    it('should call setErrorForm when the form is empty or invalid', async () => {
        await waitFor(() => {
            renderComponent();
        });

        const pressable = await screen.findByTestId('button-touchable');
        await user.press(pressable);

        /* Check if setErrorForm is called one time */
        expect(setErrorFormMock).toHaveBeenCalledTimes(1);
    });

    it('should call saveCourse when the form is valid and selectedCourse is empty', async () => {
        await waitFor(() => {
            renderComponent();
        });

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

        /* Get text of submit pressable and check if text is equal to Guardar */
        const btnText = await screen.findByTestId('button-text');
        expect(btnText).toHaveTextContent('Guardar');

        /* check if saveCourse is called with respective args */
        expect(saveCourseMock).toHaveBeenCalledTimes(1);
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
            renderComponent();
        });

        const personAbout = 'Aliquid dolore quae et voluptatibus dicta.';

        const inputsText = await screen.findAllByTestId('form-field-text-input');
        await user.type(inputsText[1], personAbout);

        /* Get submit touchable */
        const pressable = await screen.findByTestId('button-touchable');
        await user.press(pressable);

        /* Get text of submit pressable and check if text is equal to Actualizar */
        const btnText = await screen.findByTestId('button-text');
        expect(btnText).toHaveTextContent('Actualizar');

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