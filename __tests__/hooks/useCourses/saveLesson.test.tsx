import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, onFinishMock, render } from './setup';
import { navigateMock } from '../../../jest.setup';

/* Mocks */
import { initialAuthStateMock, initialCoursesStateMock, initialStatusStateMock, testCourse, testCredentials, testLesson, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook saveLesson', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should save lesson successfully', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, courses: initialCoursesStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse, onFinishMock);
        });

        await act(() => {
            result.current.useCourses.setSelectedCourse(result.current.useCourses.state.courses[0]);
        });

        await act(async () => {
            await result.current.useCourses.saveLesson(testLesson);
        });

        /* Check if courses state contain selectedCouerse and courses */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            selectedCourse: {
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                ...testCourse,
                lastLesson: undefined,
                suspended: false,
                finished: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            courses: [{
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                ...testCourse,
                lastLesson: undefined,
                suspended: false,
                finished: false,
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
                    finished: false,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                ...testLesson,
                description: expect.any(String),
                nextLesson: expect.any(String),
                done: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 201,
            msg: 'Haz agregado una clase al curso correctamente.'
        });

        /* Check if navigate is called two times with respectve args */
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
        const mockStore = getMockStore({ auth: initialAuthStateMock, courses: initialCoursesStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.saveLesson(testLesson);
        });

        /* Check if courses state is equal to initial state */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });

        /* Check if navigate isnt called */
        expect(navigateMock).not.toHaveBeenCalled();
    });

    it('should fail when selectedCourse is empty', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, courses: initialCoursesStateMock, status: initialStatusStateMock });
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

        /* Check if courses state contain courses */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            courses: [{
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                ...testCourse,
                suspended: false,
                finished: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }]
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String),
        });

        await act(() => {
            result.current.useCourses.setSelectedCourse(result.current.useCourses.state.courses[0]);
        });

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when data is invalid', async () => {
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
            await result.current.useCourses.saveLesson({
                ...testLesson,
                nextLesson: new Date('invalid')
            });
        });

        /* Check if courses state contain selectedCourse and courses */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            selectedCourse: {
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                ...testCourse,
                suspended: false,
                finished: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            courses: [{
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                ...testCourse,
                suspended: false,
                finished: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }]
        });

        /* Check if status state is equal to respective status */
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