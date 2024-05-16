import { act } from '@testing-library/react-native';

/* Setups */
import { useNavigationMock } from '../../../../../jest.setup';
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

describe('Test in useLessons hook - updateLesson', () => {
    (useNetwork as jest.Mock).mockReturnValue({
        wifi: wifiMock
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update lesson successfully', async () => {
        const { result } = renderUseLessons(mockStore);

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
            await result.current.useLessons.saveLesson(testLesson);
        });

        await act(async () => {
            await result.current.useLessons.loadLessons({});
        });

        await act(() => {
            result.current.useLessons.setSelectedLesson(result.current.useLessons.state.lessons[0]);
        });

        await act(async () => {
            await result.current.useLessons.updateLesson({
                ...testLesson,
                description: 'Quisquam blanditiis sapiente et amet quia mollitia.'
            });
        });

        /* Check if lessons state contain selectedLesson, lastLesson and lessons updated
         */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            selectedLesson: {
                id: expect.any(String),
                courseId: result.current.useCourses.state.selectedCourse.id,
                description: 'Quisquam blanditiis sapiente et amet quia mollitia.',
                done: false,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            lastLesson: {
                id: expect.any(String),
                courseId: result.current.useCourses.state.selectedCourse.id,
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
                description: 'Quisquam blanditiis sapiente et amet quia mollitia.',
                done: false,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            lessons: [{
                id: expect.any(String),
                courseId: result.current.useCourses.state.selectedCourse.id,
                description: 'Quisquam blanditiis sapiente et amet quia mollitia.',
                done: false,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }],
            hasMoreLessons: false
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: 'Haz actualizado la clase correctamente.'
        });

        /* Check if goBack is called one time */
        expect(useNavigationMock.goBack).toHaveBeenCalledTimes(1);

        await act(async () => {
            await result.current.useCourses.deleteCourse();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild when user inst authenticate', async () => {
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useLessons.updateLesson(testLesson);
        });

        /* Check if lessons state is equal to initial state */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);

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
            await result.current.useCourses.saveCourse(testCourse);
        });

        await act(async () => {
            await result.current.useLessons.updateLesson(testLesson);
        });

        /* Check if lessons state is equal to initial state */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay una clase seleccionada para actualizar.'
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

    it('should faild when data is invalid', async () => {
        const { result } = renderUseLessons(mockStore);

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
            await result.current.useLessons.saveLesson(testLesson);
        });

        await act(async () => {
            await result.current.useLessons.loadLessons({});
        });

        await act(() => {
            result.current.useLessons.setSelectedLesson(result.current.useLessons.state.lessons[0]);
        });

        await act(async () => {
            await result.current.useLessons.updateLesson({
                ...testLesson,
                nextLesson: new Date('invalid')
            });
        });

        /* Check if lessons state isnt changed by updateLesson */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            selectedLesson: {
                id: expect.any(String),
                courseId: result.current.useCourses.state.selectedCourse.id,
                description: testLesson.description,
                done: false,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            lastLesson: {
                id: expect.any(String),
                courseId: result.current.useCourses.state.selectedCourse.id,
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
                description: testLesson.description,
                done: false,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            lessons: [{
                id: expect.any(String),
                courseId: result.current.useCourses.state.selectedCourse.id,
                description: testLesson.description,
                done: false,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }],
            hasMoreLessons: false
        });

        /* Check if courses state isnt changed by updateLesson */
        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            selectedCourse: {
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                ...testCourse,
                lastLesson: {
                    id: expect.any(String),
                    courseId: result.current.useCourses.state.selectedCourse.id,
                    description: testLesson.description,
                    done: false,
                    nextLesson: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                suspended: false,
                finished: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            courses: [{
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                ...testCourse,
                lastLesson: {
                    id: expect.any(String),
                    courseId: result.current.useCourses.state.selectedCourse.id,
                    description: testLesson.description,
                    done: false,
                    nextLesson: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                suspended: false,
                finished: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }],
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