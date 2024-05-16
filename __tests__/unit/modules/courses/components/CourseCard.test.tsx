import React from 'react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { MenuProvider } from 'react-native-popup-menu';

/* Setup */
import { useNavigationMock } from '../../../../../jest.setup';

/* Mocks */
import { coursesStateMock, lessonSelectedStateMock, setSelectedCourseMock, setSelectedLessonMock } from '../../../../mocks';

/* Modules */
import { CourseCard, useCourses } from '../../../../../src/modules/courses';
import { useLessons } from '../../../../../src/modules/lessons';

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

/* Mock hooks */
jest.mock('../../../../../src/modules/courses/hooks/useCourses.ts');
jest.mock('../../../../../src/modules/lessons/hooks/useLessons.ts');

describe('Test in <CourseCard /> component', () => {
    (useCourses as jest.Mock).mockReturnValue({
        state: coursesStateMock
    });

    (useLessons as jest.Mock).mockReturnValue({
        state: lessonSelectedStateMock,
        setSelectedLesson: setSelectedLessonMock
    });

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
        expect(statusText).toBeTruthy();
        expect(statusText.props.children).toBe('En Curso');
        expect(personNameText).toBeTruthy();
        expect(personNameText.props.children).toBe(course.personName);
        expect(publicationText).toBeTruthy();
        expect(publicationText.props.children).toBe(course.publication);
        expect(aboutText).toBeTruthy();
        expect(typeof aboutText.props.children).toBe('string');
    });

    it('should call setSelectedCourse and navigate when card is pressed', async () => {
        renderComponent();

        /* Get touchable of navigate */
        const touchable = screen.getByTestId('course-card-touchable');
        await user.press(touchable);

        /* Check if setSelectedCourse and Navigate is called with respective args */
        expect(setSelectedCourseMock).toHaveBeenCalledTimes(1);
        expect(setSelectedCourseMock).toHaveBeenCalledWith(course);
        expect(useNavigationMock.navigate).toHaveBeenCalledTimes(1);
        expect(useNavigationMock.navigate).toHaveBeenCalledWith('CourseDetailScreen');
    });
});