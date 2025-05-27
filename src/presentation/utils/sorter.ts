import { CourseEntity, LessonEntity, PreachingEntity, RevisitEntity } from '@domain/entities';

export class SorterUtil {
    public static sortCoursesByCreatedAt(courses: CourseEntity[]): CourseEntity[] {
        return courses.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    public static sortLessonsByNextLesson(lessons: LessonEntity[]): LessonEntity[] {
        return lessons.sort(
            (a, b) => new Date(b.nextLesson).getTime() - new Date(a.nextLesson).getTime()
        );
    }

    public static sortPreachingsByDay(preachings: PreachingEntity[]): PreachingEntity[] {
        return preachings.sort(
            (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
        );
    }

    public static sortRevisitsByNextVisit(revisits: RevisitEntity[]): RevisitEntity[] {
        return revisits.sort(
            (a, b) => new Date(b.nextVisit).getTime() - new Date(a.nextVisit).getTime()
        );
    }
}