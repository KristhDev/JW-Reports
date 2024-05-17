import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { render, screen, userEvent } from '@testing-library/react-native';

/* Setup */
import { mockUseNavigation, useCoursesSpy, useLessonsSpy } from '../../../../../jest.setup';

/* Mocks */
import { coursesStateMock, lessonSelectedStateMock, setSelectedCourseMock, setSelectedLessonMock } from '../../../../mocks';

/* Modules */
import { CourseCard } from '../../../../../src/modules/courses';

const course = coursesStateMock.courses[0];

const user = userEvent.setup();

const renderComponent = () => render(
    <MenuProvider>
        <CourseCard
            course={ course }
            onActiveOrSuspend={ jest.fn() }
            onDelete={ jest.fn() }
            onFinishOrStart={ jest.fn() }
        />
    </MenuProvider>
);

describe('Test in <CourseCard /> component', () => {
    useCoursesSpy.mockImplementation(() => ({
        state: coursesStateMock,
        setSelectedCourse: setSelectedCourseMock
    }) as any);

    useLessonsSpy.mockImplementation(() => ({
        state: lessonSelectedStateMock,
        setSelectedLesson: setSelectedLessonMock
    }) as any);

    it('should to match snapshot', () => {
        renderComponent();
        expect(screen.toJSON()).toMatchSnapshot();
    });

    it('should render data of course', () => {
        renderComponent();

        /* Get elements with data of component */
        const statusText = screen.getByTestId('course-card-status-text');
        const personNameText = screen.getByTestId('course-card-name-text');
        const publicationText = screen.getByTestId('course-card-publication-text');
        const aboutText = screen.getByTestId('course-card-about-text');

        /* Check data in respective elements */
        expect(statusText).toBeOnTheScreen();
        expect(statusText).toHaveTextContent('En Curso');
        expect(personNameText).toBeOnTheScreen();
        expect(personNameText).toHaveTextContent(course.personName);
        expect(publicationText).toBeOnTheScreen();
        expect(publicationText).toHaveTextContent(course.publication);
        expect(aboutText).toBeOnTheScreen();
        expect(aboutText.type).toBe('Text');
    });

    it('should call setSelectedCourse and navigate when card is pressed', async () => {
        renderComponent();

        /* Get touchable of navigate */
        const touchable = screen.getByTestId('course-card-touchable');
        await user.press(touchable);

        /* Check if setSelectedCourse and Navigate is called with respective args */
        expect(setSelectedCourseMock).toHaveBeenCalledTimes(1);
        expect(setSelectedCourseMock).toHaveBeenCalledWith(course);
        expect(mockUseNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('CourseDetailScreen');
    });
});