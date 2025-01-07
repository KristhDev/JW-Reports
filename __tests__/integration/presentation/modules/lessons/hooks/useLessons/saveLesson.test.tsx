import { act } from '@testing-library/react-native';

/* Setups */
import { mockUseNavigation } from '@test-setup';
import { getMockStoreUseLessons, renderUseLessons } from '@setups';

/* Mocks */
import {
    authenticateStateMock,
    courseMock,
    CoursesServiceSpy,
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    lessonsMock,
    LessonsServiceSpy,
    testCourse,
    testLesson,
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Constants */
import { authMessages, lessonsMessages } from '@application/constants';

/* Errors */
import { RequestError } from '@domain/errors';

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
    userId: authenticateStateMock.user.id
}

const lessonMock = {
    ...lessonsMock[0],
    ...testLesson,
    courseId: courseMockOwner.id,
    nextLesson: testLesson.nextLesson.toISOString()
}

describe('Test in useLessons hook - saveLesson', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should save lesson successfully', async () => {
        LessonsServiceSpy.create.mockResolvedValueOnce(lessonMock);
        CoursesServiceSpy.getCourseIdsByUserId.mockResolvedValueOnce([ courseMockOwner.id ]);
        LessonsServiceSpy.getLastLessonByCoursesId.mockResolvedValueOnce({ ...lessonMock, course: courseMockOwner });

        const mockStore = authStoreMock();
        const { result } = renderUseLessons(mockStore);

        await act(() => {
            result.current.useCourses.setSelectedCourse(courseMockOwner);
        });

        await act(async () => {
            await result.current.useLessons.saveLesson(testLesson);
        });

        /* Check if lessons state contain selectedCouerse and courses */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            lastLesson: expect.any(Object),
        });

        const newLesson = result.current.useLessons.state.lessons.find(lesson => lesson.id === lessonMock.id);
        if (newLesson) expect(newLesson).toEqual(lessonMock);

        const courseOfLesson = result.current.useCourses.state.courses.find(course => course.id === newLesson?.courseId);
        if (courseOfLesson) {
            expect(courseOfLesson).toEqual({
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                ...testCourse,
                lastLesson: {
                    id: newLesson!.id,
                    courseId: courseOfLesson.id,
                    course: undefined,
                    description: newLesson!.description,
                    done: false,
                    nextLesson: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                suspended: false,
                finished: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
        }

        if (courseOfLesson?.id === result.current.useCourses.state.selectedCourse.id) {
            expect(result.current.useCourses.state.selectedCourse).toEqual({
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                ...testCourse,
                lastLesson: {
                    id: newLesson!.id,
                    courseId: courseOfLesson.id,
                    course: undefined,
                    description: newLesson!.description,
                    done: false,
                    nextLesson: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                suspended: false,
                finished: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
        }

        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            selectedCourse: expect.any(Object),
            courses: expect.any(Array)
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 201,
            msg: lessonsMessages.ADDED_SUCCESS
        });

        /* Check if navigate is called two times with respectve args */
        expect(mockUseNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('LessonsScreen');
    });

    it('should faild if user inst autenticated', async () => {
        const mockStore = initialStoreMock();
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useLessons.saveLesson(testLesson);
        });

        /* Check if lessons state is equal to initial state */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });

        /* Check if navigate isnt called */
        expect(mockUseNavigation.navigate).not.toHaveBeenCalled();
    });

    it('should faild if selectedCourse is empty', async () => {
        const mockStore = authStoreMock();
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useLessons.saveLesson(testLesson);
        });

        /* Check if lessons state is equal to initial state */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String),
        });
    });

    it('should faild if data is invalid', async () => {
        LessonsServiceSpy.create.mockRejectedValueOnce(new RequestError('Invalid date', 400, 'invalid_date'));

        const mockStore = authStoreMock();
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            result.current.useCourses.setSelectedCourse(courseMockOwner);
        });

        await act(async () => {
            await result.current.useLessons.saveLesson({
                ...testLesson,
                nextLesson: new Date('invalid')
            });
        });

        /* Check if lessons state is equal to initial state */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String),
        });
    });
});