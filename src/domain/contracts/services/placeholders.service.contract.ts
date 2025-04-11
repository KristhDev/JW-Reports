import { AuthPlaceholders, CoursesPlaceholders, LessonsPlaceholders, PreachingPlaceholders } from '@infrastructure/interfaces';

export abstract class PlaceholdersServiceContract {
    public abstract get authPlaceholders(): AuthPlaceholders;
    public abstract get coursesPlaceholders(): CoursesPlaceholders;
    public abstract get preachingPlaceholders(): PreachingPlaceholders;
    public abstract get lessonsPlaceholders(): LessonsPlaceholders;
}