/**
 * Defining the structure of the LessonFormValues object.
 *
 * @property {string} description - The description of the lesson
 * @property {Date} nextLesson - The next lesson of the course
 */
export interface LessonFormValues {
    description: string;
    nextLesson: Date;
}