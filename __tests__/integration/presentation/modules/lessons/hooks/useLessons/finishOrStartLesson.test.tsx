import { act } from '@testing-library/react-native';

/* Supabase */
import { supabase } from '@test-config';

/* Setups */
import { onFinishMock, useNetworkSpy } from '@test-setup';
import { getMockStoreUseLessons, renderUseLessons } from '@setups';

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
} from '@mocks';

/* Modules */
import { authMessages } from '@auth';
import { lessonsMessages } from '@lessons';

describe('Test in useLessons hook - finishOrStartLesson', () => {
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

    it('should finish or start lesson successfully', async () => {
        const { result } = renderUseLessons(mockStore);

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
            await result.current.useLessons.saveLesson(testLesson);
        });

        await act(async () => {
            await result.current.useLessons.loadLessons({});
        });

        await act(async () => {
            result.current.useLessons.setSelectedLesson(result.current.useLessons.state.lessons[0]);
        });

        await act(async () => {
            await result.current.useLessons.finishOrStartLesson(new Date(), onFinishMock);
        });

        /* Check if lessons state contain lessons and selectedLesson */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            hasMoreLessons: false,
            lessons: expect.any(Array),
            selectedLesson: {
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
                done: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        const lessonUpdated = result.current.useLessons.state.lessons.find(l => l.id === result.current.useLessons.state.selectedLesson.id);
        const lastLessonUpdated = result.current.useLessons.state.lastLesson;

        if (!lessonUpdated) throw new Error('Lesson finished or started not found');

        expect(lessonUpdated.done).toBeTruthy();

        if (lastLessonUpdated.id === result.current.useLessons.state.selectedLesson.id) {
            expect(lastLessonUpdated.done).toBeTruthy();
        }

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            msg: lessonsMessages.FINISHED_SUCCESS,
            code: 200
        });

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        await supabase.from('lessons')
            .delete()
            .eq('course_id', result.current.useCourses.state.selectedCourse.id);

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
            await result.current.useLessons.finishOrStartLesson(new Date(), onFinishMock);
        });

        /* Check if lessons state is equal to initial state and onFinish is called one time */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });
    });

    it('should faild when selectedLesson is empty', async () => {
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useLessons.finishOrStartLesson(new Date(), onFinishMock);
        });

        /* Check if lessons state is equal to initial state and onFinish is called one time */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: lessonsMessages.UNSELECTED
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild when course is suspend or finished', async () => {
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
            await result.current.useCourses.finishOrStartCourse();
        });

        await act(async () => {
            await result.current.useLessons.loadLessons({});
        });

        await act(() => {
            result.current.useLessons.setSelectedLesson(result.current.useLessons.state.lessons[0]);
        });

        await act(async () => {
            await result.current.useLessons.finishOrStartLesson(new Date(), onFinishMock);
        });

        /**
         * Check if lessons state contain last lesson, lessons and selectedLesson
         */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            hasMoreLessons: false,
            lastLesson: {
                id: expect.any(String),
                courseId: expect.any(String),
                course: {
                    id: expect.any(String),
                    userId: result.current.useAuth.state.user.id,
                    ...testCourse,
                    lastLesson: undefined,
                    suspended: false,
                    finished: expect.any(Boolean),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                description: expect.any(String),
                nextLesson: expect.any(String),
                done: expect.any(Boolean),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            },
            lessons: [{
                id: expect.any(String),
                courseId: expect.any(String),
                description: expect.any(String),
                done: false,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }],
            selectedLesson: {
                id: expect.any(String),
                courseId: expect.any(String),
                description: expect.any(String),
                done: false,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        const lastLesson = result.current.useLessons.state.lastLesson;

        if (lastLesson.id === result.current.useLessons.state.selectedLesson.id) {
            expect(lastLesson).toEqual({
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
            });
        }

        /* Check if onFinish is called one time */
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: lessonsMessages.SUSPENDED_OR_FINISHED
        });

        await supabase.from('lessons')
            .delete()
            .eq('course_id', result.current.useCourses.state.selectedCourse.id);

        await supabase.from('courses')
            .delete()
            .eq('user_id', result.current.useAuth.state.user.id);

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });
});