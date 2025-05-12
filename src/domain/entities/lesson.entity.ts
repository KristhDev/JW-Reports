export interface LessonEntity {
    id: string;
    courseId: string;
    description: string;
    nextLesson: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
}