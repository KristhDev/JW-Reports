import { initialState as authInitState } from '../../features/auth';
import { initialState as coursesInitState } from '../../features/courses';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, render } from './setup';

describe('Test useCourses hook', () => {
    it('should return respective props', () => {
        const mockStore = getMockStore({ auth: authInitState, courses: coursesInitState, status: statusInitState });
        const { result } = render(mockStore);

        expect(result.current.useCourses).toEqual({
            state: coursesInitState,
            clearCourses: expect.any(Function),
            removeCourses: expect.any(Function),
            removeLessons: expect.any(Function),
            setCoursesPagination: expect.any(Function),
            setCoursesScreenHistory: expect.any(Function),
            setLessonsPagination: expect.any(Function),
            setRefreshCourses: expect.any(Function),
            setSelectedCourse: expect.any(Function),
            setSelectedLesson: expect.any(Function),
            activeOrSuspendCourse: expect.any(Function),
            deleteCourse: expect.any(Function),
            deleteLesson: expect.any(Function),
            finishOrStartCourse: expect.any(Function),
            finishOrStartLesson: expect.any(Function),
            loadCourses: expect.any(Function),
            loadLessons: expect.any(Function),
            saveCourse: expect.any(Function),
            saveLesson: expect.any(Function),
            updateCourse: expect.any(Function),
            updateLesson: expect.any(Function)
        });
    });
});