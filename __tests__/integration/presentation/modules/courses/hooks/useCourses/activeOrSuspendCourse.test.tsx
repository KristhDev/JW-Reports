import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseCourses, renderUseCourses } from '@setups';

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
    onFinishMock,
    testCredentials,
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Modules */
import { authMessages } from '@auth';
import { coursesMessages } from '@courses';

describe('Test in useCourses hook - activeOrSuspendCourse', () => {
    CoursesServiceSpy.activeOrSuspend.mockResolvedValue({ ...courseMock, suspended: true });

    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock,
    }));

    let mockStore = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStore = getMockStoreUseCourses({
            auth: authenticateStateMock,
            lessons: initialLessonsStateMock,
            courses: initialCoursesStateMock,
            status: initialStatusStateMock
        });
    });

    it('should active or suspend course successfully', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            result.current.useCourses.setSelectedCourse(courseMock);
        });

        await act(async () => {
            await result.current.useCourses.activeOrSuspendCourse(onFinishMock);
        });

        /* Check is state contain courses and selectedCourse */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            selectedCourse: {
                ...result.current.useCourses.state.selectedCourse,
                suspended: true,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: coursesMessages.SUSPENDED_SUCCESS
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
    });

    it('should faild if user inst authenticated', async () => {
        const mockStore = getMockStoreUseCourses({
            auth: initialAuthStateMock,
            lessons: initialLessonsStateMock,
            courses: initialCoursesStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.activeOrSuspendCourse(onFinishMock);
        });

        /**
         * Check if courses state is equal to initial state and if onFinish
         * is called one time
         */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });
    });

    it('should faild if selectedCourse is empty', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.activeOrSuspendCourse(onFinishMock);
        });

        /**
         * Check if courses state is equal to initial state and if onFinish
         * is called one time
         */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: coursesMessages.UNSELECTED
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild if selectedCourse is finished', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(() => {
            result.current.useCourses.setSelectedCourse({ ...courseMock, finished: true });
        });

        await act(async () => {
            await result.current.useCourses.activeOrSuspendCourse(onFinishMock);
        });

        /* Check if courses state contain courses and selectedCourse */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            selectedCourse: {
                ...result.current.useCourses.state.selectedCourse,
                finished: true,
                suspended: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: coursesMessages.FINISHED
        });
    });
});