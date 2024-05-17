import { act } from '@testing-library/react-native';

/* Setups */
import { onFinishMock } from '../../../../../../jest.setup';
import { getMockStoreUseCourses, renderUseCourses } from '../../../../../setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    testCourse,
    testCredentials,
    wifiMock
} from '../../../../../mocks';

/* Modules */
import { useNetwork } from '../../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../../src/modules/shared/hooks/useNetwork.ts');

const mockStore = getMockStoreUseCourses({
    auth: initialAuthStateMock,
    courses: initialCoursesStateMock,
    lessons: initialLessonsStateMock,
    status: initialStatusStateMock
});

describe('Test in useCourses hook - finishOrStartCourse', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should finish or start course successfully', async () => {
        const { result } = renderUseCourses(mockStore);

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
            await result.current.useCourses.finishOrStartCourse(onFinishMock);
        });

        /* Check is courses state contain courses and selectedCourse */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            courses: [{
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
                suspended: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: 'Has terminado el curso correctamente.'
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

    it('should faild when user inst authenticated', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.finishOrStartCourse(onFinishMock);
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

    it('should faild when selectedCourse is empty', async () => {
        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.finishOrStartCourse(onFinishMock);
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
            msg: 'No hay un curso seleccionado.'
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild when selectedCourse is suspended', async () => {
        const { result } = renderUseCourses(mockStore);

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
            await result.current.useCourses.activeOrSuspendCourse();
        });

        await act(async () => {
            await result.current.useCourses.finishOrStartCourse(onFinishMock);
        });

        /* Check if courses state contain courses and selectedCourse */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            courses: [{
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
                suspended: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No pudes terminar o comenzar de nuevo un curso suspendido.'
        });

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});