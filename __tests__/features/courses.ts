import { INIT_COURSE, INIT_LESSON } from '../../src/features/courses';
import { Course, CoursesState, Lesson } from '../../src/interfaces/courses';

export const lessons: Lesson[] = [
    {
        id: '0fb579e4-de87-4336-9375-76611c889f76',
        course_id: '8ea3baf8-6b47-4222-8ed1-c62d5755b9a5',
        description: 'Nemo et et non nesciunt ipsum sed rerum vero. Nostrum quae officiis qui nihil dignissimos consectetur aperiam. Vel harum ex. Ipsum ratione necessitatibus eum sint vero enim et consequatur. Ab autem rerum numquam ut. Laboriosam nihil est exercitationem unde aut reiciendis odit.',
        next_lesson: '2021-01-01T00:00:00.000Z',
        done: false,
        created_at: '2021-01-01T00:00:00.000Z',
        updated_at: '2021-01-01T00:00:00.000Z',
    },
    {
        id: '55b56e87-e3db-4ea6-a94d-84acccdcd74f',
        course_id: 'ab57ec1c-6b2c-4cc8-8a49-452fcdfa4042',
        description: 'Nemo et et non nesciunt ipsum sed rerum vero. Nostrum quae officiis qui nihil dignissimos consectetur aperiam. Vel harum ex. Ipsum ratione necessitatibus eum sint vero enim et consequatur. Ab autem rerum numquam ut. Laboriosam nihil est exercitationem unde aut reiciendis odit.',
        next_lesson: '2021-01-01T00:00:00.000Z',
        done: false,
        created_at: '2021-01-01T00:00:00.000Z',
        updated_at: '2021-01-01T00:00:00.000Z',
    },
    {
        id: 'e8a5760f-67ef-46f3-8925-ad509d724b75',
        course_id: 'd872759d-2cce-42eb-a1a8-16de81bafd22',
        description: 'Nemo et et non nesciunt ipsum sed rerum vero. Nostrum quae officiis qui nihil dignissimos consectetur aperiam. Vel harum ex. Ipsum ratione necessitatibus eum sint vero enim et consequatur. Ab autem rerum numquam ut. Laboriosam nihil est exercitationem unde aut reiciendis odit.',
        next_lesson: '2021-01-01T00:00:00.000Z',
        done: false,
        created_at: '2021-01-01T00:00:00.000Z',
        updated_at: '2021-01-01T00:00:00.000Z',
    },
    {
        id: '4a312777-a5c4-4276-8b5b-c4f7a83a3ac2',
        course_id: '0bb1b3c6-e5ff-4f01-8071-0f71d1f544b9',
        description: 'Nemo et et non nesciunt ipsum sed rerum vero. Nostrum quae officiis qui nihil dignissimos consectetur aperiam. Vel harum ex. Ipsum ratione necessitatibus eum sint vero enim et consequatur. Ab autem rerum numquam ut. Laboriosam nihil est exercitationem unde aut reiciendis odit.',
        next_lesson: '2021-01-01T00:00:00.000Z',
        done: false,
        created_at: '2021-01-01T00:00:00.000Z',
        updated_at: '2021-01-01T00:00:00.000Z',
    }
];

export const courses: Course[] = [
    {
        id: '8ea3baf8-6b47-4222-8ed1-c62d5755b9a5',
        user_id: '26ee1755-975d-4a00-9fe5-fa417eb07748',
        person_name: 'Fred Cremin',
        person_about: 'Voluptatem dolorem neque quia omnis odit quos non. Sed rerum est est rem et. Ut aut repellat expedita commodi ipsum. In quisquam excepturi rerum debitis. Beatae rem saepe aut molestiae.',
        person_address: 'Non ut fuga dolores. Laborum veniam quae minus consequuntur quisquam temporibus et. Est accusamus omnis facere facilis labore.',
        publication: 'animi voluptas omnis',
        last_lesson: lessons[0],
        suspended: false,
        finished: false,
        created_at: '2021-08-26T15:00:00.000Z',
        updated_at: '2021-08-26T15:00:00.000Z'
    },
    {
        id: 'ab57ec1c-6b2c-4cc8-8a49-452fcdfa4042',
        user_id: '26ee1755-975d-4a00-9fe5-fa417eb07748',
        person_name: 'Fred Cremin',
        person_about: 'Voluptatem dolorem neque quia omnis odit quos non. Sed rerum est est rem et. Ut aut repellat expedita commodi ipsum. In quisquam excepturi rerum debitis. Beatae rem saepe aut molestiae.',
        person_address: 'Non ut fuga dolores. Laborum veniam quae minus consequuntur quisquam temporibus et. Est accusamus omnis facere facilis labore.',
        publication: 'animi voluptas omnis',
        last_lesson: lessons[1],
        suspended: false,
        finished: false,
        created_at: '2021-08-26T15:00:00.000Z',
        updated_at: '2021-08-26T15:00:00.000Z'
    },
    {
        id: 'd872759d-2cce-42eb-a1a8-16de81bafd22',
        user_id: '26ee1755-975d-4a00-9fe5-fa417eb07748',
        person_name: 'Fred Cremin',
        person_about: 'Voluptatem dolorem neque quia omnis odit quos non. Sed rerum est est rem et. Ut aut repellat expedita commodi ipsum. In quisquam excepturi rerum debitis. Beatae rem saepe aut molestiae.',
        person_address: 'Non ut fuga dolores. Laborum veniam quae minus consequuntur quisquam temporibus et. Est accusamus omnis facere facilis labore.',
        publication: 'animi voluptas omnis',
        last_lesson: lessons[2],
        suspended: false,
        finished: false,
        created_at: '2021-08-26T15:00:00.000Z',
        updated_at: '2021-08-26T15:00:00.000Z'
    },
    {
        id: '0bb1b3c6-e5ff-4f01-8071-0f71d1f544b9',
        user_id: '26ee1755-975d-4a00-9fe5-fa417eb07748',
        person_name: 'Fred Cremin',
        person_about: 'Voluptatem dolorem neque quia omnis odit quos non. Sed rerum est est rem et. Ut aut repellat expedita commodi ipsum. In quisquam excepturi rerum debitis. Beatae rem saepe aut molestiae.',
        person_address: 'Non ut fuga dolores. Laborum veniam quae minus consequuntur quisquam temporibus et. Est accusamus omnis facere facilis labore.',
        publication: 'animi voluptas omnis',
        last_lesson: lessons[3],
        suspended: false,
        finished: false,
        created_at: '2021-08-26T15:00:00.000Z',
        updated_at: '2021-08-26T15:00:00.000Z'
    }
];

export const coursesState: CoursesState = {
    courseFilter: 'all',
    courses: courses,
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
    isLessonDeleting: false,
    isLessonLoading: false,
    isLessonsLoading: false,
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

export const courseSelectedInitState: CoursesState = {
    courseFilter: 'all',
    courses: courses,
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
    isLessonDeleting: false,
    isLessonLoading: false,
    isLessonsLoading: false,
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

export const courseSelectedState: CoursesState = {
    courseFilter: 'all',
    courses: courses,
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
    isLessonDeleting: false,
    isLessonLoading: false,
    isLessonsLoading: false,
    lessons: [],
    lessonsPagination: {
        from: 0,
        to: 9
    },
    refreshCourses: false,
    refreshLessons: false,
    selectedCourse: courses[0],
    selectedLesson: INIT_LESSON
}

export const lessonsState: CoursesState = {
    courseFilter: 'all',
    courses: courses,
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
    isLessonDeleting: false,
    isLessonLoading: false,
    isLessonsLoading: false,
    lessons: [ lessons[0] ],
    lessonsPagination: {
        from: 0,
        to: 9
    },
    refreshCourses: false,
    refreshLessons: false,
    selectedCourse: courses[0],
    selectedLesson: INIT_LESSON
}

export const lessonSelectedState: CoursesState = {
    courseFilter: 'all',
    courses: courses,
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
    isLessonDeleting: false,
    isLessonLoading: false,
    isLessonsLoading: false,
    lessons: [ lessons[0] ],
    lessonsPagination: {
        from: 0,
        to: 9
    },
    refreshCourses: false,
    refreshLessons: false,
    selectedCourse: courses[0],
    selectedLesson: lessons[0]
}