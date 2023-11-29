import { act } from '@testing-library/react-native';

/* Hooks */
import { useNetwork } from '../../../src/hooks';

/* Setup */
import { getMockStore, render, testCourse } from './setup';

/* Mocks */
import { initialAuthStateMock, initialCoursesStateMock, initialStatusStateMock, testCredentials, wifiMock } from '../../mocks';

/* Mock hooks */
jest.mock('../../../src/hooks/useNetwork.ts');

describe('Test useCourses hook loadLessons', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should load lessons successfully', async () => {
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
            await result.current.useCourses.loadLessons({});
        });

        /* Check if courses state contain courses and selectedLesson */
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
                lastLesson: undefined,
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
                finished: expect.any(Boolean),
                publication: expect.any(String),
                lastLesson: undefined,
                suspended: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

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
            await result.current.useCourses.loadLessons({});
        });

        /**
         * Check if courses state is equal to initial state and status
         * state is equal to respective status
         */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });

    it('should fail when selectedCourse is empty', async () => {
        const mockStore = getMockStore({ auth: initialAuthStateMock, courses: initialCoursesStateMock, status: initialStatusStateMock });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.loadLessons({});
        });

        /**
         * Check if courses state is equal to initial state and status
         * state is equal to respective status
         */
        expect(result.current.useCourses.state).toEqual(initialCoursesStateMock);
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay un curso seleccionado.'
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});