import {
    AppMessages,
    AuthMessages,
    CoursesMessages,
    EmailMessages,
    LessonsMessages,
    NetworkMessages,
    PermissionsMessages,
    PreachingMessages,
    PrecursorMessages,
    RevisitsMessages
} from '@infrastructure/interfaces';

export abstract class MessagesServiceContract {
    public abstract get appMessages(): AppMessages;
    public abstract get authMessages(): AuthMessages;
    public abstract get coursesMessages(): CoursesMessages;
    public abstract get emailMessages(): EmailMessages;
    public abstract get lessonsMessages(): LessonsMessages;
    public abstract get networkMessages(): NetworkMessages;
    public abstract get permissionsMessages(): PermissionsMessages;
    public abstract get preachingMessages(): PreachingMessages;
    public abstract get precursorMessages(): PrecursorMessages;
    public abstract get revisitsMessages(): RevisitsMessages;
}