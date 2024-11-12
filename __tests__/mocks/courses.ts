/* Features */
import { CoursesState, INIT_COURSE } from '@application/features';

/* Entities */
import { LessonEntity, CourseEntity } from '@domain/entities';

/* Interfaces */
import { CourseEndpoint } from '@infrasturcture/interfaces';

/* Hooks */
import * as useCourses from '@courses/hooks/useCourses';

export const useCoursesSpy = jest.spyOn(useCourses, 'default');

export const activeOrSuspendCourseMock = jest.fn();
export const deleteCourseMock = jest.fn();
export const finishOrStartCourseMock = jest.fn();
export const loadCoursesMock = jest.fn();
export const removeCoursesMock = jest.fn();
export const saveCourseMock = jest.fn();
export const setCoursesPaginationMock = jest.fn();
export const setCoursesScreenHistoryMock = jest.fn();
export const setRefreshCoursesMock = jest.fn();
export const setSelectedCourseMock = jest.fn();
export const updateCourseMock = jest.fn();

export const courseEndpointMock: CourseEndpoint = {
    id: 'e8bbdc9f-07cc-4365-8d30-c1a4a9f5ec70',
    user_id: 'f1d2c3b4-a5f6-7d8e-9c0b-a1b2c3d4e5f6',
    person_name: 'Karlee Senger',
    person_about: 'Itaque quidem enim neque laudantium ducimus nesciunt provident consequuntur.',
    person_address: 'Ut non et similique aliquam quaerat consequatur iste ut quod.',
    publication: 'dolorem ut non',
    lessons: [],
    suspended: false,
    finished: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
}

export const testCourse = {
    personAbout: 'Itaque quidem enim neque laudantium ducimus nesciunt provident consequuntur.',
    personAddress: 'Ut non et similique aliquam quaerat consequatur iste ut quod.',
    personName: 'Karlee Senger',
    publication: 'dolorem ut non'
}

export const lessonMock: LessonEntity = {
    id: '0fb579e4-de87-4336-9375-76611c889f76',
    courseId: '8ea3baf8-6b47-4222-8ed1-c62d5755b9a5',
    description: 'Nemo et et non nesciunt ipsum sed rerum vero. Nostrum quae officiis qui nihil dignissimos consectetur aperiam. Vel harum ex. Ipsum ratione necessitatibus eum sint vero enim et consequatur. Ab autem rerum numquam ut. Laboriosam nihil est exercitationem unde aut reiciendis odit.',
    nextLesson: '2021-01-01T00:00:00.000Z',
    done: false,
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
}

export const coursesMock: CourseEntity[] = [
    {
        id: '8ea3baf8-6b47-4222-8ed1-c62d5755b9a5',
        userId: '26ee1755-975d-4a00-9fe5-fa417eb07748',
        personName: 'Fred Cremin',
        personAbout: 'Voluptatem dolorem neque quia omnis odit quos non. Sed rerum est est rem et. Ut aut repellat expedita commodi ipsum. In quisquam excepturi rerum debitis. Beatae rem saepe aut molestiae.',
        personAddress: 'Non ut fuga dolores. Laborum veniam quae minus consequuntur quisquam temporibus et. Est accusamus omnis facere facilis labore.',
        publication: 'animi voluptas omnis',
        lastLesson: {
            ...lessonMock,
            courseId: '8ea3baf8-6b47-4222-8ed1-c62d5755b9a5'
        },
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
        lastLesson: {
            ...lessonMock,
            courseId: 'ab57ec1c-6b2c-4cc8-8a49-452fcdfa4042'
        },
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
        lastLesson: {
            ...lessonMock,
            courseId: 'd872759d-2cce-42eb-a1a8-16de81bafd22'
        },
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
        lastLesson: {
            ...lessonMock,
            courseId: '0bb1b3c6-e5ff-4f01-8071-0f71d1f544b9'
        },
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
    isCourseDeleting: false,
    isCourseLoading: false,
    isCoursesExporting: false,
    isCoursesLoading: false,
    refreshCourses: false,
    selectedCourse: {
        ...INIT_COURSE,
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
    isCourseDeleting: false,
    isCourseLoading: false,
    isCoursesExporting: false,
    isCoursesLoading: false,
    refreshCourses: false,
    selectedCourse: INIT_COURSE,
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
    isCourseDeleting: false,
    isCourseLoading: false,
    isCoursesExporting: false,
    isCoursesLoading: false,
    refreshCourses: false,
    selectedCourse: INIT_COURSE
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
    isCourseDeleting: false,
    isCourseLoading: false,
    isCoursesExporting: false,
    isCoursesLoading: false,
    refreshCourses: false,
    selectedCourse: coursesMock[0]
}

