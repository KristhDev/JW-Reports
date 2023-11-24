import { act } from '@testing-library/react-native';

/* Features */
import { initialState as authInitState, testCredentials } from '../../features/auth';
import { initialState as coursesInitState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render, testCourse, testLesson } from './setup';
import { goBackMock } from '../../../jest.setup';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook updateLesson', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        isConnected: true,
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update lesson successfully', async () => {
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
            await result.current.useCourses.updateLesson({
                ...testLesson,
                description: 'Quisquam blanditiis sapiente et amet quia mollitia.'
            });
        });

        /**
         * Check if courses state contain selectedCourse, selectedLesson,
         * lessons and courses are updated
         */
        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            selectedCourse: {
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                ...testCourse,
                last_lesson: {
                    id: expect.any(String),
                    course_id: result.current.useCourses.state.selectedCourse.id,
                    description: 'Quisquam blanditiis sapiente et amet quia mollitia.',
                    done: false,
                    next_lesson: expect.any(String),
                    created_at: expect.any(String),
                    updated_at: expect.any(String)
                },
                suspended: false,
                finished: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            },
            selectedLesson: {
                id: expect.any(String),
                course_id: result.current.useCourses.state.selectedCourse.id,
                description: 'Quisquam blanditiis sapiente et amet quia mollitia.',
                done: false,
                next_lesson: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            },
            courses: [{
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                ...testCourse,
                last_lesson: {
                    id: expect.any(String),
                    course_id: result.current.useCourses.state.selectedCourse.id,
                    description: 'Quisquam blanditiis sapiente et amet quia mollitia.',
                    done: false,
                    next_lesson: expect.any(String),
                    created_at: expect.any(String),
                    updated_at: expect.any(String)
                },
                suspended: false,
                finished: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }],
            lessons: [{
                id: expect.any(String),
                course_id: result.current.useCourses.state.selectedCourse.id,
                description: 'Quisquam blanditiis sapiente et amet quia mollitia.',
                done: false,
                next_lesson: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }],
            hasMoreLessons: false
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: 'Haz actualizado la clase correctamente.'
        });

        /* Check if goBack is called one time */
        expect(goBackMock).toHaveBeenCalledTimes(1);

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user inst authenticate', async () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.updateLesson(testLesson);
        });

        /* Check if courses state is equal to initial state */
        expect(result.current.useCourses.state).toEqual(coursesInitState);

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
            await result.current.useCourses.saveCourse(testCourse);
        });

        await act(async () => {
            await result.current.useCourses.updateLesson(testLesson);
        });

        /* Check if courses state contain courses */
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

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay una clase seleccionada para actualizar.'
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
            await result.current.useCourses.saveLesson(testLesson);
        });

        await act(async () => {
            await result.current.useCourses.loadLessons({});
        });

        await act(async () => {
            await result.current.useCourses.setSelectedLesson(result.current.useCourses.state.lessons[0]);
        });

        await act(async () => {
            await result.current.useCourses.updateLesson({
                ...testLesson,
                next_lesson: new Date('invalid')
            });
        });

        /* Check if courses state isnt changed by updateLesson */
        expect(result.current.useCourses.state).toEqual({
            ...coursesInitState,
            selectedCourse: {
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                ...testCourse,
                last_lesson: {
                    id: expect.any(String),
                    course_id: result.current.useCourses.state.selectedCourse.id,
                    description: testLesson.description,
                    done: false,
                    next_lesson: expect.any(String),
                    created_at: expect.any(String),
                    updated_at: expect.any(String)
                },
                suspended: false,
                finished: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            },
            selectedLesson: {
                id: expect.any(String),
                course_id: result.current.useCourses.state.selectedCourse.id,
                description: testLesson.description,
                done: false,
                next_lesson: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            },
            courses: [{
                id: expect.any(String),
                user_id: result.current.useAuth.state.user.id,
                ...testCourse,
                last_lesson: {
                    id: expect.any(String),
                    course_id: result.current.useCourses.state.selectedCourse.id,
                    description: testLesson.description,
                    done: false,
                    next_lesson: expect.any(String),
                    created_at: expect.any(String),
                    updated_at: expect.any(String)
                },
                suspended: false,
                finished: false,
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }],
            lessons: [{
                id: expect.any(String),
                course_id: result.current.useCourses.state.selectedCourse.id,
                description: testLesson.description,
                done: false,
                next_lesson: expect.any(String),
                created_at: expect.any(String),
                updated_at: expect.any(String)
            }],
            hasMoreLessons: false
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String)
        });

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});