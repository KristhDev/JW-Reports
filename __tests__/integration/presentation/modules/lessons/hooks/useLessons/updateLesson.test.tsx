import { act } from '@testing-library/react-native';

/* Setups */
import { mockUseNavigation, useNetworkSpy } from '@test-setup';
import { getMockStoreUseLessons, renderUseLessons } from '@setups';

/* Mocks */
import {
    authenticateStateMock,
    courseMock,
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    lessonsMock,
    LessonsServiceSpy,
    testLesson,
    wifiMock
} from '@mocks';

/* Errors */
import { RequestError } from '@domain/errors';

/* Modules */
import { authMessages } from '@auth';
import { lessonsMessages } from '@lessons';

const initialStoreMock = () => getMockStoreUseLessons({
    auth: initialAuthStateMock,
    courses: initialCoursesStateMock,
    lessons: initialLessonsStateMock,
    status: initialStatusStateMock
});

const authStoreMock = () => getMockStoreUseLessons({
    auth: authenticateStateMock,
    courses: initialCoursesStateMock,
    lessons: initialLessonsStateMock,
    status: initialStatusStateMock
});

const courseMockOwner = {
    ...courseMock,
    userId: authenticateStateMock.user.id,
    lastLesson: {
        ...lessonsMock[0],
        ...testLesson,
        courseId: courseMock.id,
        nextLesson: testLesson.nextLesson.toISOString()
    }
}

const lessonMock = {
    ...lessonsMock[0],
    ...testLesson,
    courseId: courseMockOwner.id,
    nextLesson: testLesson.nextLesson.toISOString()
}

const lessonUpdatedMock = {
    ...lessonMock,
    description: 'Voluptate ex consequat quis sit ut esse sit amet in fugiat.'
}

describe('Test in useLessons hook - updateLesson', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update lesson successfully', async () => {
        LessonsServiceSpy.getAllByCourseId.mockResolvedValueOnce([ lessonMock ]);
        LessonsServiceSpy.update.mockResolvedValueOnce(lessonUpdatedMock);

        const mockStore = authStoreMock();
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useCourses.setSelectedCourse(courseMockOwner);
        });

        await act(async () => {
            await result.current.useLessons.loadLessons({});
        });

        await act(async () => {
            await result.current.useLessons.setSelectedLesson(lessonMock);
        });

        await act(async () => {
            await result.current.useLessons.updateLesson({
                ...testLesson,
                description: lessonUpdatedMock.description
            });
        });

        /* Check if lessons state contain selectedLesson, lastLesson and lessons updated */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            selectedLesson: expect.any(Object),
            lastLesson: expect.any(Object),
            lessons: expect.any(Array),
            hasMoreLessons: false
        });

        const updatedLesson = result.current.useLessons.state.selectedLesson;
        const updatedLessonInLessons = result.current.useLessons.state.lessons.find(lesson => lesson.id === updatedLesson.id);

        expect(updatedLesson).toEqual(lessonUpdatedMock);
        if (updatedLessonInLessons) expect(updatedLessonInLessons).toEqual(lessonUpdatedMock);

        if (updatedLesson.id === result.current.useLessons.state.lastLesson.id) {
            expect(result.current.useLessons.state.lastLesson).toEqual({
                ...lessonUpdatedMock,
                course: {
                    ...courseMockOwner,
                    lastLesson: undefined
                },
            });
        }

        const selectedCourse = result.current.useCourses.state.selectedCourse;

        expect(selectedCourse).toEqual({
            ...courseMockOwner,
            lastLesson: lessonUpdatedMock
        });

        const courseInCourses = result.current.useCourses.state.courses.find(course => course.id === selectedCourse.id);

        if (courseInCourses) {
            expect(courseInCourses).toEqual({
                ...courseMockOwner,
                lastLesson: lessonUpdatedMock
            });
        }

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: lessonsMessages.UPDATED_SUCCESS
        });

        /* Check if goBack is called one time */
        expect(mockUseNavigation.goBack).toHaveBeenCalledTimes(1);
    });

    it('should if user inst authenticate', async () => {
        const mockStore = initialStoreMock();
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useLessons.updateLesson(testLesson);
        });

        /* Check if lessons state is equal to initial state */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });
    });

    it('should if selectedLesson is empty', async () => {
        const mockStore = authStoreMock();
        const { result } = renderUseLessons(mockStore);

        await act(() => {
            result.current.useCourses.setSelectedCourse(courseMockOwner);
        });

        await act(async () => {
            await result.current.useLessons.updateLesson(testLesson);
        });

        /* Check if lessons state is equal to initial state */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: lessonsMessages.UNSELECTED_UPDATE
        });
    });

    it('should faild when data is invalid', async () => {
        LessonsServiceSpy.update.mockRejectedValueOnce(new RequestError('Invalid date', 400, 'invalid_date'));

        const mockStore = authStoreMock();
        const { result } = renderUseLessons(mockStore);

        await act(() => {
            result.current.useCourses.setSelectedCourse(courseMockOwner);
        });

        await act(() => {
            result.current.useLessons.setSelectedLesson(lessonMock);
        });

        await act(async () => {
            await result.current.useLessons.updateLesson({
                ...testLesson,
                nextLesson: new Date('invalid')
            });
        });

        /* Check if lessons state isnt changed by updateLesson */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            selectedLesson: lessonMock
        });

        /* Check if courses state isnt changed by updateLesson */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            selectedCourse: courseMockOwner,
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String)
        });
    });
});