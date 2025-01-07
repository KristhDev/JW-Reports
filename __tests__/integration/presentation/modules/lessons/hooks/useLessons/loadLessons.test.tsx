import { act } from '@testing-library/react-native';

/* Setup */
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
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Constants */
import { authMessages, coursesMessages } from '@application/constants';

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

describe('Test in useLessons hook - loadLessons', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should load lessons successfully', async () => {
        const lessonsOfCourse = lessonsMock.map(lesson => ({ ...lesson, courseId: courseMockOwner.id }));
        LessonsServiceSpy.paginateByCourseId.mockImplementationOnce(() => Promise.resolve(lessonsOfCourse));

        const mockStore = authStoreMock();
        const { result } = renderUseLessons(mockStore);

        await act(() => {
            result.current.useCourses.setSelectedCourse(courseMockOwner);
        });

        await act(async () => {
            await result.current.useLessons.loadLessons({});
        });

        /* Check lessons state */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            lessons: expect.any(Array),
            hasMoreLessons: lessonsMock.length >= 10
        });

        result.current.useLessons.state.lessons.map((lesson) => {
            expect(lesson).toEqual({
                id: expect.any(String),
                courseId: result.current.useCourses.state.selectedCourse.id,
                description: expect.any(String),
                done: expect.any(Boolean),
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            })
        });
    });

    it('should faild if user inst authenticated', async () => {
        const mockStore = initialStoreMock();
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useLessons.loadLessons({});
        });

        /* Check if lessons state is equal to initial state and status state is equal to respective status */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });
    });

    it('should faild if selectedCourse is empty', async () => {
        const mockStore = authStoreMock();
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useLessons.loadLessons({});
        });

        /* Check if lessons state is equal to initial state and status state is equal to respective status */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: coursesMessages.UNSELECTED
        });
    });
});