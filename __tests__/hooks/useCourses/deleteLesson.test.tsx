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

describe('Test useCourses hook deleteLesson', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete lesson successfully', async () => {
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

        await act(async () => {
            await result.current.useCourses.loadLessons({});
        });

        await act(() => {
            result.current.useCourses.setSelectedLesson(result.current.useCourses.state.lessons[0]);
        });

        await act(async () => {
            await result.current.useCourses.deleteLesson(true, onFinishMock);
        });

        /* Check is state contain selectedCourse, selectedLesson, etc */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            courses: expect.any(Array),
            hasMoreLessons: false,
            selectedCourse: {
                ...initialCoursesStateMock.selectedCourse,
                id: expect.any(String),
                userId: expect.any(String),
                personName: expect.any(String),
                personAbout: expect.any(String),
                personAddress: expect.any(String),
                finished: expect.any(Boolean),
                publication: expect.any(String),
                suspended: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            selectedLesson: {
                ...initialCoursesStateMock.selectedLesson,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            lastLesson: {
                ...initialCoursesStateMock.lastLesson,
                course: {
                    ...initialCoursesStateMock.lastLesson.course,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: 'Haz eliminado la clase correctamente.'
        });

        /* Check if onFinish and navigate is called with respective arg */
        expect(onFinishMock).toHaveBeenCalledTimes(2);
        expect(navigateMock).toHaveBeenCalledTimes(2);
        expect(navigateMock).toHaveBeenCalledWith('LessonsScreen');

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should fail when user isnt authenticated', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, courses: initialCoursesStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useCourses.deleteLesson(true, onFinishMock);
        });

        /**
         * Check if courses state is equal to initial state and
         * CheckonFinish is called one time
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
            await result.current.useCourses.deleteLesson(true, onFinishMock);
        });

        /**
         * Check if courses state is equal to initial state and
         * CheckonFinish is called one time
         */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay una clase seleccionada para eliminar.'
        });
    });
});