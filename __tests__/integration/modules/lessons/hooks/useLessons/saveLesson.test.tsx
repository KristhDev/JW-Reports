import { act } from '@testing-library/react-native';

/* Supabase */
import { supabase } from '@test-config';

/* Setups */
import { onFinishMock, mockUseNavigation, useNetworkSpy } from '@test-setup';
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

describe('Test in useLessons hook - saveLesson', () => {
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

    it('should save lesson successfully', async () => {
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

        /* Check if lessons state contain selectedCouerse and courses */
        expect(result.current.useLessons.state).toEqual({
            ...initialLessonsStateMock,
            lastLesson: expect.any(Object),
        });

        const newLesson = result.current.useLessons.state.lastLesson;
        const newLessonInLessons = result.current.useLessons.state.lessons.find(lesson => lesson.id === newLesson.id);

        if (newLessonInLessons) {
            expect(newLessonInLessons).toEqual({
                id: expect.any(String),
                courseId: result.current.useCourses.state.selectedCourse.id,
                description: testLesson.description,
                done: false,
                nextLesson: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
        }

        const courseOfLesson = result.current.useCourses.state.courses.find(course => course.id === newLesson.courseId);

        if (courseOfLesson) {
            expect(courseOfLesson).toEqual({
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                ...testCourse,
                lastLesson: {
                    id: newLesson.id,
                    courseId: courseOfLesson.id,
                    course: undefined,
                    description: newLesson.description,
                    done: false,
                    nextLesson: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                suspended: false,
                finished: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
        }

        if (courseOfLesson?.id === result.current.useCourses.state.selectedCourse.id) {
            expect(result.current.useCourses.state.selectedCourse).toEqual({
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                ...testCourse,
                lastLesson: {
                    id: newLesson.id,
                    courseId: courseOfLesson.id,
                    course: undefined,
                    description: newLesson.description,
                    done: false,
                    nextLesson: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                },
                suspended: false,
                finished: false,
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            });
        }

        expect(result.current.useCourses.state).toEqual({
            ...initialCoursesStateMock,
            selectedCourse: expect.any(Object),
            courses: expect.any(Array)
        });

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 201,
            msg: 'Has agregado una clase al curso correctamente.'
        });

        /* Check if navigate is called two times with respectve args */
        expect(mockUseNavigation.navigate).toHaveBeenCalledTimes(2);
        expect(mockUseNavigation.navigate).toHaveBeenCalledWith('LessonsScreen');

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

    it('should faild when user inst autenticated', async () => {
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useLessons.saveLesson(testLesson);
        });

        /* Check if lessons state is equal to initial state */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });

        /* Check if navigate isnt called */
        expect(mockUseNavigation.navigate).not.toHaveBeenCalled();
    });

    it('should faild when selectedCourse is empty', async () => {
        const { result } = renderUseLessons(mockStore);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.useCourses.saveCourse(testCourse);
        });

        await act(async () => {
            await result.current.useLessons.saveLesson(testLesson);
        });

        /* Check if lessons state is equal to initial state */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String),
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

    it('should faild when data is invalid', async () => {
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
            await result.current.useLessons.saveLesson({
                ...testLesson,
                nextLesson: new Date('invalid')
            });
        });

        /* Check if lessons state is equal to initial state */
        expect(result.current.useLessons.state).toEqual(initialLessonsStateMock);

        /* Check if status state is equal to respective status */
        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String),
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