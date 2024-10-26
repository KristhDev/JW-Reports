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
    lessonMock,
    LessonsServiceSpy,
    onFinishMock,
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Features */
import { INIT_COURSE, INIT_LESSON } from '@application/features';

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
    userId: authenticateStateMock.user.id
}

describe('Test in useLessons hook - deleteLesson', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete lesson successfully', async () => {
        LessonsServiceSpy.delete.mockImplementationOnce(() => Promise.resolve());
        CoursesServiceSpy.getCourseIdsByUserId.mockImplementationOnce(() => Promise.resolve([ courseMockOwner.id ]));
        LessonsServiceSpy.getLastLessonByCoursesId.mockImplementationOnce(() => Promise.resolve({ ...INIT_LESSON, course: INIT_COURSE }));

        const mockStore = authStoreMock();
        const { result } = renderUseLessons(mockStore);

        await act(() => {
            result.current.useCourses.setSelectedCourse(courseMockOwner);
        });

        await act(() => {
            result.current.useLessons.setSelectedLesson(lessonMock);
        });

        await act(async () => {
            await result.current.useLessons.deleteLesson(true, onFinishMock);
        });

        /* Check is state contain selectedCourse, selectedLesson, etc */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            selectedLesson: {
                ...initialLessonsStateMock.selectedLesson,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            lastLesson: {
                id: expect.any(String),
                courseId: expect.any(String),
                description: expect.any(String),
                done: expect.any(Boolean),
                course: {
                    id: expect.any(String),
                    userId: expect.any(String),
                    personName: expect.any(String),
                    personAbout: expect.any(String),
                    personAddress: expect.any(String),
                    publication: expect.any(String),
                    finished: expect.any(Boolean),
                    lastLesson: undefined,
                    suspended: expect.any(Boolean),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: lessonsMessages.DELETED_SUCCESS
        });

        /* Check if onFinish and goBack is called with respective arg */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(mockUseNavigation.goBack).toHaveBeenCalledTimes(1);
    });

    it('should faild if user isnt authenticated', async () => {
        const mockStore = initialStoreMock();
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useLessons.deleteLesson(true, onFinishMock);
        });

        /* Check if courses state is equal to initial state and check onFinish is called one time  */
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
            await result.current.useLessons.deleteLesson(true, onFinishMock);
        });

        /* Check if courses state is equal to initial state and check onFinish is called one time */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: lessonsMessages.UNSELECTED_DELETE
        });
    });
});