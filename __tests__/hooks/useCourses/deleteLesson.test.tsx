import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState, testCredentials } from '../../features/auth';
import { initialState as coursesInitState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, onFinishMock, render, testCourse, testLesson } from './setup';
import { navigateMock } from '../../../jest.setup';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook deleteLesson', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete lesson successfully', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse, onFinishMock);
        });

        await act(async () => {
            await result.current.useCourses.setSelectedCourse(result.current.useCourses.state.courses[0]);
        });

        await act(async () => {
            await result.current.useCourses.saveLesson(testLesson);
        });

        await act(async () => {
            await result.current.useCourses.loadLessons({});
        });

        await act(async () => {
            await result.current.useCourses.setSelectedLesson(result.current.useCourses.state.lessons[0]);
        });

        await act(async () => {
            await result.current.useCourses.deleteLesson(true, onFinishMock);
        });

        /* Check is state contain selectedCourse, selectedLesson, etc */
        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            courses: expect.any(Array),
            hasMoreLessons: false,
            selectedCourse: {
                ...coursesInitState.selectedCourse,
                id: expect.any(String),
                user_id: expect.any(String),
                person_name: expect.any(String),
                person_about: expect.any(String),
                person_address: expect.any(String),
                finished: expect.any(Boolean),
                publication: expect.any(String),
                suspended: expect.any(Boolean),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            },
            selectedLesson: {
                ...coursesInitState.selectedLesson,
                next_lesson: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: 'Has eliminado la clase correctamente.'
        });

        /* Check if onFinish and navigate is called with respective arg */
        expect(onFinishMock).toHaveBeenCalledTimes(2);
        expect(navigateMock).toHaveBeenCalledTimes(3);
        expect(navigateMock).toHaveBeenCalledWith('LessonsScreen');

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user isnt authenticated', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.deleteLesson(true, onFinishMock);
        });

        /**
         * Check if courses state is equal to initial state and
         * CheckonFinish is called one time
         */
        expect(result.current.useCourses.state).toEqual(coursesInitState);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });

    it('should fail when selectedLesson is empty', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.deleteLesson(true, onFinishMock);
        });

        /**
         * Check if courses state is equal to initial state and
         * CheckonFinish is called one time
         */
        expect(result.current.useCourses.state).toEqual(coursesInitState);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay una clase seleccionada para eliminar.'
        });
    });
});