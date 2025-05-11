import { CourseEntity, RevisitEntity } from '@domain/entities';

import { CourseFilter } from '@courses/interfaces';
import { RevisitFilter } from '@revisits/interfaces';

export class FilterUtil {
    public static filterCoursesBy(courses: CourseEntity[], filter: CourseFilter): CourseEntity[] {
        const coursesFiltereds = {
            active: () => courses.filter(c => !c.suspended && !c.finished),
            all: () => courses,
            finished: () => courses.filter(c => !c.suspended && c.finished),
            suspended: () => courses.filter(c => c.suspended && !c.finished)
        }

        return coursesFiltereds[filter]();
    }

    public static filterRevisitsBy(revisits: RevisitEntity[], filter: RevisitFilter): RevisitEntity[] {
        const revisitsFiltereds = {
            all: () => revisits,
            unvisited: () => revisits.filter(c => !c.done),
            visited: () => revisits.filter(c => c.done),
        }

        return revisitsFiltereds[filter]();
    }
}