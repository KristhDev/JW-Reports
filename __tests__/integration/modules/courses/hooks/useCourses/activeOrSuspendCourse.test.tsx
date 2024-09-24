import { act } from '@testing-library/react-native';

/* Supabase */
import { supabase } from '@test-config';

/* Setups */
import { onFinishMock, useNetworkSpy } from '@test-setup';
import { getMockStoreUseCourses, renderUseCourses } from '@setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    testCourse,
    testCredentials,
    wifiMock
} from '@mocks';

/* Modules */
import { authMessages } from '@auth';
import { coursesMessages } from '@courses';

describe('Test in useCourses hook - activeOrSuspendCourse', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }));

    let mockStore = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStore = getMockStoreUseCourses({
            auth: initialAuthStateMock,
            lessons: initialLessonsStateMock,
            courses: initialCoursesStateMock,
            status: initialStatusStateMock
        });
    });

    it('should active or suspend course successfully', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse);
        });

        await act(async () => {
            result.current.useCourses.setSelectedCourse(result.current.useCourses.state.courses[0]);
        });

        await act(async () => {
            await result.current.useCourses.activeOrSuspendCourse(onFinishMock);
        });

        /* Check is state contain courses and selectedCourse */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            courses: [{
                ...initialCoursesStateMock.selectedCourse,
                id: expect.any(String),
                userId: expect.any(String),
                personName: expect.any(String),
                personAbout: expect.any(String),
                personAddress: expect.any(String),
                finished: expect.any(Boolean),
                publication: expect.any(String),
                suspended: true,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }],
            selectedCourse: {
                ...initialCoursesStateMock.selectedCourse,
                id: expect.any(String),
                userId: expect.any(String),
                personName: expect.any(String),
                personAbout: expect.any(String),
                personAddress: expect.any(String),
                finished: expect.any(Boolean),
                publication: expect.any(String),
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

        await supabase.from('courses')
            .delete()
            .eq('user_id', result.current.useAuth.state.user.id);

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild when user inst authenticated', async () => {
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

    it('should faild when selectedCourse is empty', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

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

    it('should faild when selectedCourse is finished', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse);
        });

        await act(() => {
            result.current.useCourses.setSelectedCourse(result.current.useCourses.state.courses[0]);
        });

        await act(async () => {
            await result.current.useCourses.finishOrStartCourse();
        });

        await act(async () => {
            await result.current.useCourses.activeOrSuspendCourse(onFinishMock);
        });

        /* Check if courses state contain courses and selectedCourse */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            courses: [{
                ...initialCoursesStateMock.selectedCourse,
                id: expect.any(String),
                userId: expect.any(String),
                personName: expect.any(String),
                personAbout: expect.any(String),
                personAddress: expect.any(String),
                finished: true,
                publication: expect.any(String),
                suspended: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }],
            selectedCourse: {
                ...initialCoursesStateMock.selectedCourse,
                id: expect.any(String),
                userId: expect.any(String),
                personName: expect.any(String),
                personAbout: expect.any(String),
                personAddress: expect.any(String),
                finished: true,
                publication: expect.any(String),
                suspended: expect.any(Boolean),
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

        await supabase.from('courses')
            .delete()
            .eq('user_id', result.current.useAuth.state.user.id);

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});