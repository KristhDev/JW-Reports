import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState, testCredentials } from '../../features/auth';
import { initialState as coursesInitState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, onFinishMock, render, testCourse } from './setup';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook activeOrSuspendCourse', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should active or suspend course successfully', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse);
        });

        await act(async () => {
            await result.current.useCourses.setSelectedCourse(result.current.useCourses.state.courses[0]);
        });

        await act(async () => {
            await result.current.useCourses.activeOrSuspendCourse(onFinishMock);
        });

        /* Check is state contain courses and selectedCourse */
        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            courses: [{
                ...coursesInitState.selectedCourse,
                id: expect.any(String),
                user_id: expect.any(String),
                person_name: expect.any(String),
                person_about: expect.any(String),
                person_address: expect.any(String),
                finished: expect.any(Boolean),
                publication: expect.any(String),
                suspended: true,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }],
            selectedCourse: {
                ...coursesInitState.selectedCourse,
                id: expect.any(String),
                user_id: expect.any(String),
                person_name: expect.any(String),
                person_about: expect.any(String),
                person_address: expect.any(String),
                finished: expect.any(Boolean),
                publication: expect.any(String),
                suspended: true,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: 'Haz suspendido el curso correctamente.'
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user inst authenticated', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.activeOrSuspendCourse(onFinishMock);
        });

        /**
         * Check if courses state is equal to initial state and if onFinish
         * is called one time
         */
        expect(result.current.useCourses.state).toEqual(coursesInitState);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });

    it('should fail when selectedCourse is empty', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

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
        expect(result.current.useCourses.state).toEqual(coursesInitState);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay un curso seleccionado.'
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when selectedCourse is finished', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse);
        });

        await act(async () => {
            await result.current.useCourses.setSelectedCourse(result.current.useCourses.state.courses[0]);
        });

        await act(async () => {
            await result.current.useCourses.finishOrStartCourse();
        });

        await act(async () => {
            await result.current.useCourses.activeOrSuspendCourse(onFinishMock);
        });

        /* Check if courses state contain courses and selectedCourse */
        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            courses: [{
                ...coursesInitState.selectedCourse,
                id: expect.any(String),
                user_id: expect.any(String),
                person_name: expect.any(String),
                person_about: expect.any(String),
                person_address: expect.any(String),
                finished: true,
                publication: expect.any(String),
                suspended: expect.any(Boolean),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }],
            selectedCourse: {
                ...coursesInitState.selectedCourse,
                id: expect.any(String),
                user_id: expect.any(String),
                person_name: expect.any(String),
                person_about: expect.any(String),
                person_address: expect.any(String),
                finished: true,
                publication: expect.any(String),
                suspended: expect.any(Boolean),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No puedes suspender o renovar un curso terminado.'
        });

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});