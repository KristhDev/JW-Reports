import { AuthPlaceholders, CoursesPlaceholders, LessonsPlaceholders, PreachingPlaceholders, RevisitsPlaceholders } from '@infrastructure/interfaces';

export abstract class PlaceholdersServiceContract {
    public abstract get authPlaceholders(): AuthPlaceholders;
    public abstract get coursesPlaceholders(): CoursesPlaceholders;
    public abstract get lessonsPlaceholders(): LessonsPlaceholders;
    public abstract get preachingPlaceholders(): PreachingPlaceholders;
    public abstract get revisitsPlaceholders(): RevisitsPlaceholders;
}