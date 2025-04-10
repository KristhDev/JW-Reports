import { AuthPlaceholders, CoursesPlaceholders, PreachingPlaceholders } from '@infrastructure/interfaces';

export abstract class PlaceholdersServiceContract {
    public abstract get authPlaceholders(): AuthPlaceholders;
    public abstract get coursesPlaceholders(): CoursesPlaceholders;
    public abstract get preachingPlaceholders(): PreachingPlaceholders
}