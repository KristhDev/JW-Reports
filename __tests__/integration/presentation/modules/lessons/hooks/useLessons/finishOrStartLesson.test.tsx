import { act } from '@testing-library/react-native';

/* Setups */
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
    lessonMock,
    LessonsServiceSpy,
    onFinishMock,
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Constants */
import { authMessages, lessonsMessages } from '@application/constants';

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

describe('Test in useLessons hook - finishOrStartLesson', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should finish or start lesson successfully', async () => {
        LessonsServiceSpy.finishOrStart.mockResolvedValue({ ...lessonMock, done: true });
        CoursesServiceSpy.getCourseIdsByUserId.mockImplementationOnce(() => Promise.resolve([ courseMock.id ]));
        LessonsServiceSpy.getLastLessonByCoursesId.mockImplementationOnce(() => Promise.resolve({ ...lessonMock, done: true, course: courseMockOwner }));

        const mockStore = authStoreMock();
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            result.current.useCourses.setSelectedCourse(courseMockOwner);
        });

        await act(async () => {
            result.current.useLessons.setSelectedLesson(lessonMock);
        });

        await act(async () => {
            await result.current.useLessons.finishOrStartLesson(new Date(), onFinishMock);
        });

        /* Check if lessons state contain lessons and selectedLesson */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            selectedLesson: {
                ...result.current.useLessons.state.selectedLesson,
                done: true,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            lastLesson: {
                id: expect.any(String),
                courseId: courseMockOwner.id,
                course: courseMockOwner,
                description: expect.any(String),
                nextLesson: expect.any(String),
                done: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        const lessonUpdated = result.current.useLessons.state.lessons.find(l => l.id === result.current.useLessons.state.selectedLesson.id);
        const lastLessonUpdated = result.current.useLessons.state.lastLesson;

        if (lessonUpdated) expect(lessonUpdated.done).toBeTruthy()
        if (lastLessonUpdated.id === result.current.useLessons.state.selectedLesson.id) {
            expect(lastLessonUpdated.done).toBeTruthy();
        }

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            msg: lessonsMessages.FINISHED_SUCCESS,
            code: 200
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
    });

    it('should faild if user inst authenticated', async () => {
        const mockStore = initialStoreMock();
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useLessons.finishOrStartLesson(new Date(), onFinishMock);
        });

        /* Check if lessons state is equal to initial state and onFinish is called one time */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });
    });

    it('should faild if selectedLesson is empty', async () => {
        const mockStore = authStoreMock();
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useLessons.finishOrStartLesson(new Date(), onFinishMock);
        });

        /* Check if lessons state is equal to initial state and onFinish is called one time */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: lessonsMessages.UNSELECTED
        });
    });

    it('should faild if course is suspend or finished', async () => {
        const mockStore = authStoreMock();
        const { result } = renderUseLessons(mockStore);

        await act(() => {
            result.current.useCourses.setSelectedCourse({ ...courseMockOwner, finished: true });
        });

        await act(() => {
            result.current.useLessons.setSelectedLesson(lessonMock);
        });

        await act(async () => {
            await result.current.useLessons.finishOrStartLesson(new Date(), onFinishMock);
        });

        /**
         * Check if lessons state contain last lesson, lessons and selectedLesson
         */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            selectedLesson: {
                id: expect.any(String),
                courseId: expect.any(String),
                description: expect.any(String),
                done: false,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        const lastLesson = result.current.useLessons.state.lastLesson;

        if (lastLesson.id === result.current.useLessons.state.selectedLesson.id) {
            expect(lastLesson).toEqual({
                id: expect.any(String),
                courseId: expect.any(String),
                course: {
                    ...result.current.useLessons.state.lastLesson.course,
                    id: expect.any(String),
                    userId: result.current.useAuth.state.user.id,
                    lastLesson: undefined,
                    suspended: false,
                    finished: true,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                description: expect.any(String),
                nextLesson: expect.any(String),
                done: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
        }

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: lessonsMessages.SUSPENDED_OR_FINISHED
        });
    });
});