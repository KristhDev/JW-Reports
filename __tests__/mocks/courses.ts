import { INIT_COURSE, INIT_LESSON } from '../../src/features';
import { Course, CoursesState, Lesson } from '../../src/interfaces';

export const activeOrSuspendCourseMock = jest.fn();
export const deleteCourseMock = jest.fn();
export const deleteLessonMock = jest.fn();
export const finishOrStartCourseMock = jest.fn();
export const finishOrStartLessonMock = jest.fn();
export const loadCoursesMock = jest.fn();
export const loadLessonsMock = jest.fn();
export const removeCoursesMock = jest.fn();
export const removeLessonsMock = jest.fn();
export const saveCourseMock = jest.fn();
export const saveLessonMock = jest.fn();
export const setCoursesPaginationMock = jest.fn();
export const setCoursesScreenHistoryMock = jest.fn();
export const setLessonsPaginationMock = jest.fn();
export const setRefreshCoursesMock = jest.fn();
export const setSelectedCourseMock = jest.fn();
export const setSelectedLessonMock = jest.fn();
export const updateCourseMock = jest.fn();
export const updateLessonMock = jest.fn();

export const lessonsMock: Lesson[] = [
    {
        id: '0fb579e4-de87-4336-9375-76611c889f76',
        courseId: '8ea3baf8-6b47-4222-8ed1-c62d5755b9a5',
        description: 'Nemo et et non nesciunt ipsum sed rerum vero. Nostrum quae officiis qui nihil dignissimos consectetur aperiam. Vel harum ex. Ipsum ratione necessitatibus eum sint vero enim et consequatur. Ab autem rerum numquam ut. Laboriosam nihil est exercitationem unde aut reiciendis odit.',
        nextLesson: '2021-01-01T00:00:00.000Z',
        done: false,
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z',
    },
    {
        id: '55b56e87-e3db-4ea6-a94d-84acccdcd74f',
        courseId: 'ab57ec1c-6b2c-4cc8-8a49-452fcdfa4042',
        description: 'Nemo et et non nesciunt ipsum sed rerum vero. Nostrum quae officiis qui nihil dignissimos consectetur aperiam. Vel harum ex. Ipsum ratione necessitatibus eum sint vero enim et consequatur. Ab autem rerum numquam ut. Laboriosam nihil est exercitationem unde aut reiciendis odit.',
        nextLesson: '2021-01-01T00:00:00.000Z',
        done: false,
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z',
    },
    {
        id: 'e8a5760f-67ef-46f3-8925-ad509d724b75',
        courseId: 'd872759d-2cce-42eb-a1a8-16de81bafd22',
        description: 'Nemo et et non nesciunt ipsum sed rerum vero. Nostrum quae officiis qui nihil dignissimos consectetur aperiam. Vel harum ex. Ipsum ratione necessitatibus eum sint vero enim et consequatur. Ab autem rerum numquam ut. Laboriosam nihil est exercitationem unde aut reiciendis odit.',
        nextLesson: '2021-01-01T00:00:00.000Z',
        done: false,
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z',
    },
    {
        id: '4a312777-a5c4-4276-8b5b-c4f7a83a3ac2',
        courseId: '0bb1b3c6-e5ff-4f01-8071-0f71d1f544b9',
        description: 'Nemo et et non nesciunt ipsum sed rerum vero. Nostrum quae officiis qui nihil dignissimos consectetur aperiam. Vel harum ex. Ipsum ratione necessitatibus eum sint vero enim et consequatur. Ab autem rerum numquam ut. Laboriosam nihil est exercitationem unde aut reiciendis odit.',
        nextLesson: '2021-01-01T00:00:00.000Z',
        done: false,
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z',
    }
];

export const coursesMock: Course[] = [
    {
        id: '8ea3baf8-6b47-4222-8ed1-c62d5755b9a5',
        userId: '26ee1755-975d-4a00-9fe5-fa417eb07748',
        personName: 'Fred Cremin',
        personAbout: 'Voluptatem dolorem neque quia omnis odit quos non. Sed rerum est est rem et. Ut aut repellat expedita commodi ipsum. In quisquam excepturi rerum debitis. Beatae rem saepe aut molestiae.',
        personAddress: 'Non ut fuga dolores. Laborum veniam quae minus consequuntur quisquam temporibus et. Est accusamus omnis facere facilis labore.',
        publication: 'animi voluptas omnis',
        lastLesson: lessonsMock[0],
        suspended: false,
        finished: false,
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z'
    },
    {
        id: 'ab57ec1c-6b2c-4cc8-8a49-452fcdfa4042',
        userId: '26ee1755-975d-4a00-9fe5-fa417eb07748',
        personName: 'Fred Cremin',
        personAbout: 'Voluptatem dolorem neque quia omnis odit quos non. Sed rerum est est rem et. Ut aut repellat expedita commodi ipsum. In quisquam excepturi rerum debitis. Beatae rem saepe aut molestiae.',
        personAddress: 'Non ut fuga dolores. Laborum veniam quae minus consequuntur quisquam temporibus et. Est accusamus omnis facere facilis labore.',
        publication: 'animi voluptas omnis',
        lastLesson: lessonsMock[1],
        suspended: false,
        finished: false,
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z'
    },
    {
        id: 'd872759d-2cce-42eb-a1a8-16de81bafd22',
        userId: '26ee1755-975d-4a00-9fe5-fa417eb07748',
        personName: 'Fred Cremin',
        personAbout: 'Voluptatem dolorem neque quia omnis odit quos non. Sed rerum est est rem et. Ut aut repellat expedita commodi ipsum. In quisquam excepturi rerum debitis. Beatae rem saepe aut molestiae.',
        personAddress: 'Non ut fuga dolores. Laborum veniam quae minus consequuntur quisquam temporibus et. Est accusamus omnis facere facilis labore.',
        publication: 'animi voluptas omnis',
        lastLesson: lessonsMock[2],
        suspended: false,
        finished: false,
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z'
    },
    {
        id: '0bb1b3c6-e5ff-4f01-8071-0f71d1f544b9',
        userId: '26ee1755-975d-4a00-9fe5-fa417eb07748',
        personName: 'Fred Cremin',
        personAbout: 'Voluptatem dolorem neque quia omnis odit quos non. Sed rerum est est rem et. Ut aut repellat expedita commodi ipsum. In quisquam excepturi rerum debitis. Beatae rem saepe aut molestiae.',
        personAddress: 'Non ut fuga dolores. Laborum veniam quae minus consequuntur quisquam temporibus et. Est accusamus omnis facere facilis labore.',
        publication: 'animi voluptas omnis',
        lastLesson: lessonsMock[3],
        suspended: false,
        finished: false,
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z'
    }
];

export const initialCoursesStateMock: CoursesState = {
    courseFilter: 'all',
    courses: [],
    coursesPagination: {
        from: 0,
        to: 9
    },
    coursesScreenHistory: [],
    hasMoreCourses: true,
    hasMoreLessons: true,
    isLastLessonLoading: false,
    isCourseDeleting: false,
    isCourseLoading: false,
    isCoursesLoading: false,
    isLessonDeleting: false,
    isLessonLoading: false,
    isLessonsLoading: false,
    lastLesson: {
        ...INIT_LESSON,
        course: {
            ...INIT_COURSE,
            createdAt: '2021-08-26T15:00:00.000Z',
            updatedAt: '2021-08-26T15:00:00.000Z'
        },
        nextLesson: '2021-08-26T15:00:00.000Z',
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z'
    },
    lessons: [],
    lessonsPagination: {
        from: 0,
        to: 9
    },
    refreshCourses: false,
    refreshLessons: false,
    selectedCourse: {
        ...INIT_COURSE,
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z'
    },
    selectedLesson: {
        ...INIT_LESSON,
        nextLesson: '2021-08-26T15:00:00.000Z',
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z'
    }
}

export const coursesStateMock: CoursesState = {
    courseFilter: 'all',
    courses: coursesMock,
    coursesPagination: {
        from: 0,
        to: 9
    },
    coursesScreenHistory: [],
    hasMoreCourses: false,
    hasMoreLessons: false,
    isCourseDeleting: false,
    isCourseLoading: false,
    isCoursesLoading: false,
    isLastLessonLoading: false,
    isLessonDeleting: false,
    isLessonLoading: false,
    isLessonsLoading: false,
    lastLesson: {
        ...INIT_LESSON,
        course: {
            ...INIT_COURSE,
            createdAt: '2021-08-26T15:00:00.000Z',
            updatedAt: '2021-08-26T15:00:00.000Z'
        },
        nextLesson: '2021-08-26T15:00:00.000Z',
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z'
    },
    lessons: [],
    lessonsPagination: {
        from: 0,
        to: 9
    },
    refreshCourses: false,
    refreshLessons: false,
    selectedCourse: INIT_COURSE,
    selectedLesson: INIT_LESSON
}

export const courseSelectedInitStateMock: CoursesState = {
    courseFilter: 'all',
    courses: coursesMock,
    coursesPagination: {
        from: 0,
        to: 9
    },
    coursesScreenHistory: [],
    hasMoreCourses: false,
    hasMoreLessons: false,
    isCourseDeleting: false,
    isCourseLoading: false,
    isCoursesLoading: false,
    isLastLessonLoading: false,
    isLessonDeleting: false,
    isLessonLoading: false,
    isLessonsLoading: false,
    lastLesson: {
        ...INIT_LESSON,
        course: {
            ...INIT_COURSE,
            createdAt: '2021-08-26T15:00:00.000Z',
            updatedAt: '2021-08-26T15:00:00.000Z'
        },
        nextLesson: '2021-08-26T15:00:00.000Z',
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z'
    },
    lessons: [],
    lessonsPagination: {
        from: 0,
        to: 9
    },
    refreshCourses: false,
    refreshLessons: false,
    selectedCourse: INIT_COURSE,
    selectedLesson: INIT_LESSON
}

export const courseSelectedStateMock: CoursesState = {
    courseFilter: 'all',
    courses: coursesMock,
    coursesPagination: {
        from: 0,
        to: 9
    },
    coursesScreenHistory: [],
    hasMoreCourses: false,
    hasMoreLessons: false,
    isCourseDeleting: false,
    isCourseLoading: false,
    isCoursesLoading: false,
    isLastLessonLoading: false,
    isLessonDeleting: false,
    isLessonLoading: false,
    isLessonsLoading: false,
    lastLesson: {
        ...INIT_LESSON,
        course: {
            ...INIT_COURSE,
            createdAt: '2021-08-26T15:00:00.000Z',
            updatedAt: '2021-08-26T15:00:00.000Z'
        },
        nextLesson: '2021-08-26T15:00:00.000Z',
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z'
    },
    lessons: [],
    lessonsPagination: {
        from: 0,
        to: 9
    },
    refreshCourses: false,
    refreshLessons: false,
    selectedCourse: coursesMock[0],
    selectedLesson: INIT_LESSON
}

export const lessonsStateMock: CoursesState = {
    courseFilter: 'all',
    courses: coursesMock,
    coursesPagination: {
        from: 0,
        to: 9
    },
    coursesScreenHistory: [],
    hasMoreCourses: false,
    hasMoreLessons: false,
    isCourseDeleting: false,
    isCourseLoading: false,
    isCoursesLoading: false,
    isLastLessonLoading: false,
    isLessonDeleting: false,
    isLessonLoading: false,
    isLessonsLoading: false,
    lastLesson: {
        ...INIT_LESSON,
        course: {
            ...INIT_COURSE,
            createdAt: '2021-08-26T15:00:00.000Z',
            updatedAt: '2021-08-26T15:00:00.000Z'
        },
        nextLesson: '2021-08-26T15:00:00.000Z',
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z'
    },
    lessons: [ lessonsMock[0] ],
    lessonsPagination: {
        from: 0,
        to: 9
    },
    refreshCourses: false,
    refreshLessons: false,
    selectedCourse: coursesMock[0],
    selectedLesson: INIT_LESSON
}

export const lessonSelectedStateMock: CoursesState = {
    courseFilter: 'all',
    courses: coursesMock,
    coursesPagination: {
        from: 0,
        to: 9
    },
    coursesScreenHistory: [],
    hasMoreCourses: false,
    hasMoreLessons: false,
    isCourseDeleting: false,
    isCourseLoading: false,
    isCoursesLoading: false,
    isLastLessonLoading: false,
    isLessonDeleting: false,
    isLessonLoading: false,
    isLessonsLoading: false,
    lastLesson: {
        ...INIT_LESSON,
        course: {
            ...INIT_COURSE,
            createdAt: '2021-08-26T15:00:00.000Z',
            updatedAt: '2021-08-26T15:00:00.000Z'
        },
        nextLesson: '2021-08-26T15:00:00.000Z',
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z'
    },
    lessons: [ lessonsMock[0] ],
    lessonsPagination: {
        from: 0,
        to: 9
    },
    refreshCourses: false,
    refreshLessons: false,
    selectedCourse: coursesMock[0],
    selectedLesson: lessonsMock[0]
}