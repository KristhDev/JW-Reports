import { act } from '@testing-library/react-native';

import { initialState as authInitState, testCredentials } from '../../features/auth';
import { initialState as coursesInitState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, render, testCourse, testLesson } from './setup';
import { goBackMock } from '../../../jest.setup';

describe('Test useCourses hook updateLesson', () => {
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

        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: 'Haz actualizado la clase correctamente.'
        });

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

        expect(result.current.useCourses.state).toEqual(coursesInitState);

        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });

    // it('should fail when selectedCourse is empty', async () => {
    //     const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
    //     const { result } = render(mockStore);

    //     await act(async () => {
    //         await result.current.useAuth.signIn(testCredentials);
    //     });

    //     await act(async () => {
    //         await result.current.useCourses.saveCourse(testCourse);
    //     });

    //     await act(async () => {
    //         await result.current.useCourses.updateCourse({
    //             ...testCourse,
    //             person_name: 'Alvah Simonis'
    //         });
    //     });

    //     expect(result.current.useCourses.state).toEqual({
    //         ...coursesInitState,
    //         courses: [{
    //             id: expect.any(String),
    //             user_id: result.current.useAuth.state.user.id,
    //             ...testCourse,
    //             suspended: false,
    //             finished: false,
    //             created_at: expect.any(String),
    //             updated_at: expect.any(String)
    //         }]
    //     });

    //     expect(result.current.useStatus.state).toEqual({
    //         code: 400,
    //         msg: 'No hay un curso seleccionado para actualizar.'
    //     });

    //     await act(async () => {
    //         await result.current.useCourses.setSelectedCourse(result.current.useCourses.state.courses[0]);
    //     });

    //     await act(async () => {
    //         await result.current.useCourses.deleteCourse();
    //     });

    //     await act(async () => {
    //         await result.current.useAuth.signOut();
    //     });
    // });

    // it('should fail when data is invalid', async () => {
    //     const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
    //     const { result } = render(mockStore);

    //     await act(async () => {
    //         await result.current.useAuth.signIn(testCredentials);
    //     });

    //     await act(async () => {
    //         await result.current.useCourses.saveCourse(testCourse);
    //     });

    //     await act(async () => {
    //         await result.current.useCourses.setSelectedCourse(result.current.useCourses.state.courses[0]);
    //     });

    //     await act(async () => {
    //         await result.current.useCourses.updateCourse({
    //             ...testCourse,
    //             person_name: undefined as any,
    //         });
    //     });

    //     expect(result.current.useCourses.state).toEqual({
    //         ...coursesInitState,
    //         selectedCourse: {
    //             id: expect.any(String),
    //             user_id: result.current.useAuth.state.user.id,
    //             ...testCourse,
    //             suspended: false,
    //             finished: false,
    //             created_at: expect.any(String),
    //             updated_at: expect.any(String)
    //         },
    //         courses: [{
    //             id: expect.any(String),
    //             user_id: result.current.useAuth.state.user.id,
    //             ...testCourse,
    //             suspended: false,
    //             finished: false,
    //             created_at: expect.any(String),
    //             updated_at: expect.any(String)
    //         }]
    //     });

    //     expect(result.current.useStatus.state).toEqual({
    //         code: expect.any(Number),
    //         msg: expect.any(String)
    //     });

    //     await act(async () => {
    //         await result.current.useCourses.deleteCourse();
    //     });

    //     await act(async () => {
    //         await result.current.useAuth.signOut();
    //     });
    // });
});