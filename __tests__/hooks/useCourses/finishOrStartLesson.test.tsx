import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, onFinishMock, render } from './setup';

/* Mocks */
import { initialAuthStateMock, initialCoursesStateMock, initialStatusStateMock, testCourse, testCredentials, testLesson, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook finishOrStartLesson', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should finish or start lesson successfully', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, courses: initialCoursesStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

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
            await result.current.useCourses.saveLesson(testLesson);
        });

        await act(async () => {
            await result.current.useCourses.loadLessons({});
        });

        await act(async () => {
            result.current.useCourses.setSelectedLesson(result.current.useCourses.state.lessons[0]);
        });

        await act(async () => {
            await result.current.useCourses.finishOrStartLesson(new Date(), onFinishMock);
        });

        /**
         * Check if courses state contain courses, lessons, selectedCourse
         * and selectedLesson
         */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            hasMoreLessons: false,
            courses: [{
                ...initialCoursesStateMock.selectedCourse,
                id: expect.any(String),
                userId: expect.any(String),
                personName: expect.any(String),
                personAbout: expect.any(String),
                personAddress: expect.any(String),
                finished: expect.any(Boolean),
                publication: expect.any(String),
                lastLesson: {
                    id: expect.any(String),
                    courseId: expect.any(String),
                    description: expect.any(String),
                    done: true,
                    nextLesson: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                suspended: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }],
            lessons: [{
                ...initialCoursesStateMock.selectedLesson,
                id: expect.any(String),
                courseId: expect.any(String),
                description: expect.any(String),
                done: true,
                nextLesson: expect.any(String),
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
                lastLesson: {
                    id: expect.any(String),
                    courseId: expect.any(String),
                    description: expect.any(String),
                    done: true,
                    nextLesson: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                suspended: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            selectedLesson: {
                ...initialCoursesStateMock.selectedLesson,
                id: expect.any(String),
                courseId: expect.any(String),
                description: expect.any(String),
                done: true,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            lastLesson: {
                id: expect.any(String),
                courseId: expect.any(String),
                course: {
                    id: expect.any(String),
                    userId: result.current.useAuth.state.user.id,
                    ...testCourse,
                    lastLesson: undefined,
                    suspended: false,
                    finished: false,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                ...testLesson,
                description: expect.any(String),
                nextLesson: expect.any(String),
                done: true,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            msg: 'Haz terminado la clase correctamente.',
            code: 200
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
        const mockStore = getMockStore({ auth: initialAuthStateMock, courses: initialCoursesStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.finishOrStartLesson(new Date(), onFinishMock);
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
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });

    it('should fail when selectedLesson is empty', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, courses: initialCoursesStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.finishOrStartLesson(new Date(), onFinishMock);
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
            msg: 'No hay una clase seleccionada.'
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when course is suspend or finished', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, courses: initialCoursesStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

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
            await result.current.useCourses.saveLesson(testLesson);
        });

        await act(async () => {
            await result.current.useCourses.finishOrStartCourse();
        });

        await act(async () => {
            await result.current.useCourses.loadLessons({});
        });

        await act(() => {
            result.current.useCourses.setSelectedLesson(result.current.useCourses.state.lessons[0]);
        });

        await act(async () => {
            await result.current.useCourses.finishOrStartLesson(new Date(), onFinishMock);
        });

        /**
         * Check if courses state contain courses, lessons, selectedCourse
         * and selectedLesson
         */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            hasMoreLessons: false,
            courses: [{
                ...initialCoursesStateMock.selectedCourse,
                id: expect.any(String),
                userId: expect.any(String),
                personName: expect.any(String),
                personAbout: expect.any(String),
                personAddress: expect.any(String),
                finished: expect.any(Boolean),
                publication: expect.any(String),
                lastLesson: {
                    id: expect.any(String),
                    courseId: expect.any(String),
                    description: expect.any(String),
                    done: false,
                    nextLesson: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                suspended: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }],
            lastLesson: {
                id: expect.any(String),
                courseId: expect.any(String),
                course: {
                    id: expect.any(String),
                    userId: result.current.useAuth.state.user.id,
                    ...testCourse,
                    lastLesson: undefined,
                    suspended: false,
                    finished: true,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                description: expect.any(String),
                nextLesson: expect.any(String),
                done: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            lessons: [{
                ...initialCoursesStateMock.selectedLesson,
                id: expect.any(String),
                courseId: expect.any(String),
                description: expect.any(String),
                done: false,
                nextLesson: expect.any(String),
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
                lastLesson: {
                    id: expect.any(String),
                    courseId: expect.any(String),
                    description: expect.any(String),
                    done: false,
                    nextLesson: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                suspended: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            selectedLesson: {
                ...initialCoursesStateMock.selectedLesson,
                id: expect.any(String),
                courseId: expect.any(String),
                description: expect.any(String),
                done: false,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
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