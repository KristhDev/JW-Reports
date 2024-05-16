import { act } from '@testing-library/react-native';

/* Setups */
import { onFinishMock, useNavigationMock } from '../../../../../jest.setup';
import { getMockStoreUseLessons, renderUseLessons } from '../../../../setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    testCourse,
    testCredentials,
    testLesson,
    wifiMock
} from '../../../../mocks';

/* Modules */
import { useNetwork } from '../../../../../src/modules/shared';

/* Mock hooks */
jest.mock('../../../../../src/modules/shared/hooks/useNetwork.ts');

const mockStore = getMockStoreUseLessons({
    auth: initialAuthStateMock,
    courses: initialCoursesStateMock,
    lessons: initialLessonsStateMock,
    status: initialStatusStateMock
});

describe('Test in useLessons hook - deleteLesson', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete lesson successfully', async () => {
        const { result } = renderUseLessons(mockStore);

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
            await result.current.useLessons.saveLesson(testLesson);
        });

        await act(async () => {
            await result.current.useLessons.loadLessons({});
        });

        await act(() => {
            result.current.useLessons.setSelectedLesson(result.current.useLessons.state.lessons[0]);
        });

        await act(async () => {
            await result.current.useLessons.deleteLesson(true, onFinishMock);
        });

        /* Check is state contain selectedCourse, selectedLesson, etc */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            hasMoreLessons: false,
            selectedLesson: {
                ...initialLessonsStateMock.selectedLesson,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            lastLesson: {
                ...initialLessonsStateMock.lastLesson,
                course: {
                    ...initialLessonsStateMock.lastLesson.course,
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
        expect(useNavigationMock.navigate).toHaveBeenCalledTimes(2);
        expect(useNavigationMock.navigate).toHaveBeenCalledWith('LessonsScreen');

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild when user isnt authenticated', async () => {
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useLessons.deleteLesson(true, onFinishMock);
        });

        /* Check if courses state is equal to initial state and check onFinish is called one time  */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });

    it('should faild when selectedLesson is empty', async () => {
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useLessons.deleteLesson(true, onFinishMock);
        });

        /* Check if courses state is equal to initial state and check onFinish is called one time */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay una clase seleccionada para eliminar.'
        });
    });
});