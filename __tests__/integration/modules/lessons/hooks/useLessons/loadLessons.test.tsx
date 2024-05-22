import { act } from '@testing-library/react-native';

/* Supabase admin client */
import { supabase } from '../../../../../config';

/* Setup */
import { useNetworkSpy } from '../../../../../../jest.setup';
import { getMockStoreUseLessons, renderUseLessons } from '../../../../../setups';

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

describe('Test in useLessons hook - loadLessons', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }));

    let mockStore = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStore = getMockStoreUseLessons({
            auth: initialAuthStateMock,
            courses: initialCoursesStateMock,
            lessons: initialLessonsStateMock,
            status: initialStatusStateMock
        });
    });

    it('should load lessons successfully', async () => {
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
            await result.current.useLessons.loadLessons({});
        });

        /* Check lessons state */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            lessons: expect.any(Array),
            hasMoreLessons: false
        });

        result.current.useLessons.state.lessons.map((lesson) => {
            expect(lesson).toEqual({
                id: expect.any(String),
                courseId: result.current.useCourses.state.selectedCourse.id,
                description: expect.any(String),
                done: expect.any(Boolean),
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            })
        });

        await supabase.from('courses')
            .delete()
            .eq('user_id', result.current.useAuth.state.user.id);

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild when user inst authenticated', async () => {
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useLessons.loadLessons({});
        });

        /* Check if lessons state is equal to initial state and status state is equal to respective status */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: 'Para realizar está acción debe iniciar sesión.'
        });
    });

    it('should faild when selectedCourse is empty', async () => {
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useLessons.loadLessons({});
        });

        /* Check if lessons state is equal to initial state and status state is equal to respective status */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'No hay un curso seleccionado.'
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});