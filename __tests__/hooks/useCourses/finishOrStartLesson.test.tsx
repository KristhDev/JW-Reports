import { act } from '@testing-library/react-native';

import { initialState as authInitState, testCredentials } from '../../features/auth';
import { initialState as coursesInitState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, onFinishMock, render, testCourse, testLesson } from './setup';

describe('Test useCourses hook finishOrStartLesson', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should finish or start lesson successfully', async () => {
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
            await result.current.useCourses.saveLesson(testLesson);
        });

        await act(async () => {
            await result.current.useCourses.loadLessons({});
        });

        await act(async () => {
            await result.current.useCourses.setSelectedLesson(result.current.useCourses.state.lessons[0]);
        });

        await act(async () => {
            await result.current.useCourses.finishOrStartLesson(new Date(), onFinishMock);
        });

        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            hasMoreLessons: false,
            courses: [{
                ...coursesInitState.selectedCourse,
                id: expect.any(String),
                user_id: expect.any(String),
                person_name: expect.any(String),
                person_about: expect.any(String),
                person_address: expect.any(String),
                finished: expect.any(Boolean),
                publication: expect.any(String),
                last_lesson: {
                    id: expect.any(String),
                    course_id: expect.any(String),
                    description: expect.any(String),
                    done: true,
                    next_lesson: expect.any(String),
                    created_at: expect.any(String),
                    updated_at: expect.any(String)
                },
                suspended: expect.any(Boolean),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }],
            lessons: [{
                ...coursesInitState.selectedLesson,
                id: expect.any(String),
                course_id: expect.any(String),
                description: expect.any(String),
                done: true,
                next_lesson: expect.any(String),
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
                last_lesson: {
                    id: expect.any(String),
                    course_id: expect.any(String),
                    description: expect.any(String),
                    done: true,
                    next_lesson: expect.any(String),
                    created_at: expect.any(String),
                    updated_at: expect.any(String)
                },
                suspended: expect.any(Boolean),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            },
            selectedLesson: {
                ...coursesInitState.selectedLesson,
                id: expect.any(String),
                course_id: expect.any(String),
                description: expect.any(String),
                done: true,
                next_lesson: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }
        });

        expect(result.current.useStatus.state).toEqual({
            msg: 'Haz terminado la clase correctamente.',
            code: 200
        });

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
            await result.current.useCourses.finishOrStartLesson(new Date(), onFinishMock);
        });

        expect(result.current.useCourses.state).toEqual(coursesInitState);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

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
            await result.current.useCourses.finishOrStartLesson(new Date(), onFinishMock);
        });

        expect(result.current.useCourses.state).toEqual(coursesInitState);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay una clase seleccionada.'
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when course is suspend or finished', async () => {
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
            await result.current.useCourses.saveLesson(testLesson);
        });

        await act(async () => {
            await result.current.useCourses.finishOrStartCourse();
        });

        await act(async () => {
            await result.current.useCourses.loadLessons({});
        });

        await act(async () => {
            await result.current.useCourses.setSelectedLesson(result.current.useCourses.state.lessons[0]);
        });

        await act(async () => {
            await result.current.useCourses.finishOrStartLesson(new Date(), onFinishMock);
        });

        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            hasMoreLessons: false,
            courses: [{
                ...coursesInitState.selectedCourse,
                id: expect.any(String),
                user_id: expect.any(String),
                person_name: expect.any(String),
                person_about: expect.any(String),
                person_address: expect.any(String),
                finished: expect.any(Boolean),
                publication: expect.any(String),
                last_lesson: {
                    id: expect.any(String),
                    course_id: expect.any(String),
                    description: expect.any(String),
                    done: false,
                    next_lesson: expect.any(String),
                    created_at: expect.any(String),
                    updated_at: expect.any(String)
                },
                suspended: expect.any(Boolean),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }],
            lessons: [{
                ...coursesInitState.selectedLesson,
                id: expect.any(String),
                course_id: expect.any(String),
                description: expect.any(String),
                done: false,
                next_lesson: expect.any(String),
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
                last_lesson: {
                    id: expect.any(String),
                    course_id: expect.any(String),
                    description: expect.any(String),
                    done: false,
                    next_lesson: expect.any(String),
                    created_at: expect.any(String),
                    updated_at: expect.any(String)
                },
                suspended: expect.any(Boolean),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            },
            selectedLesson: {
                ...coursesInitState.selectedLesson,
                id: expect.any(String),
                course_id: expect.any(String),
                description: expect.any(String),
                done: false,
                next_lesson: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No pudes terminar o reprogramar de nuevo una clase de un curso suspendido o terminado.'
        });

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});