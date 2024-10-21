import { act } from '@testing-library/react-native';

/* Setups */
import { onFinishMock, useNetworkSpy } from '@test-setup';
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
    wifiMock
} from '@mocks';

/* Modules */
import { authMessages } from '@auth';
import { coursesMessages } from '@courses';

const intitialMockStore = () => getMockStoreUseCourses({
    auth: initialAuthStateMock,
    courses: initialCoursesStateMock,
    lessons: initialLessonsStateMock,
    status: initialStatusStateMock
});

const authMockStore = () => getMockStoreUseCourses({
    auth: authenticateStateMock,
    courses: initialCoursesStateMock,
    lessons: initialLessonsStateMock,
    status: initialStatusStateMock
});

describe('Test in useCourses hook - finishOrStartCourse', () => {
    CoursesServiceSpy.finishOrStart.mockResolvedValue({ ...courseMock, finished: true });

    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should finish or start course successfully', async () => {
        const mockStore = authMockStore();
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            result.current.useCourses.setSelectedCourse(courseMock);
        });

        await act(async () => {
            await result.current.useCourses.finishOrStartCourse(onFinishMock);
        });

        /* Check is courses state contain courses and selectedCourse */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            selectedCourse: {
                ...result.current.useCourses.state.selectedCourse,
                finished: true,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: coursesMessages.FINISHED_SUCCESS
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);
    });

    it('should faild if user inst authenticated', async () => {
        const mockStore = intitialMockStore();
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.finishOrStartCourse(onFinishMock);
        });

        /**
         * Check if courses state is equal to initial state and
         * onFinish is called one time
         */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });
    });

    it('should faild if selectedCourse is empty', async () => {
        const mockStore = authMockStore();
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.finishOrStartCourse(onFinishMock);
        });

        /**
         * Check if courses state is equal to initial state and
         * onFinish is called one time
         */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: coursesMessages.UNSELECTED
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild if selectedCourse is suspended', async () => {
        const mockStore = authMockStore();
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            result.current.useCourses.setSelectedCourse({ ...courseMock, suspended: true });
        });

        await act(async () => {
            await result.current.useCourses.finishOrStartCourse(onFinishMock);
        });

        /* Check if courses state contain courses and selectedCourse */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            selectedCourse: {
                ...result.current.useCourses.state.selectedCourse,
                suspended: true,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: coursesMessages.UNSELECTED_FINISH_OR_START
        });
    });
});