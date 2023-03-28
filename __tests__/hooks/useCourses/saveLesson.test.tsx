import { act } from '@testing-library/react-native';

import { initialState as authInitState, testCredentials } from '../../features/auth';
import { initialState as coursesInitState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, onFinishMock, render, testCourse, testLesson } from './setup';
import { navigateMock } from '../../../jest.setup';

describe('Test useCourses hook saveLesson', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should save lesson successfully', async () => {
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

        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            selectedCourse: {
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                ...testCourse,
                suspended: false,
                finished: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            },
            courses: [{
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                ...testCourse,
                suspended: false,
                finished: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }]
        });

        expect(result.current.useStatus.state).toEqual({
            code: 201,
            msg: 'Haz agregado una clase al curso correctamente.'
        });

        expect(navigateMock).toHaveBeenCalledTimes(2);
        expect(navigateMock).toHaveBeenCalledWith('LessonsScreen');

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user inst autenticated', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.saveLesson(testLesson);
        });

        expect(result.current.useCourses.state).toEqual(coursesInitState);

        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });

        expect(navigateMock).not.toHaveBeenCalled();
    });

    it('should fail when selectedCourse is empty', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse);
        });

        await act(async () => {
            await result.current.useCourses.saveLesson(testLesson);
        });

        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            courses: [{
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                ...testCourse,
                suspended: false,
                finished: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }]
        });

        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String),
        });

        await act(async () => {
            await result.current.useCourses.setSelectedCourse(result.current.useCourses.state.courses[0]);
        });

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when data is invalid', async () => {
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
            await result.current.useCourses.saveLesson({
                ...testLesson,
                next_lesson: new Date('invalid')
            });
        });

        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            selectedCourse: {
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                ...testCourse,
                suspended: false,
                finished: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            },
            courses: [{
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                ...testCourse,
                suspended: false,
                finished: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }]
        });

        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String),
        });

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});