import { date, object, string } from 'yup';

/* Config */
import { messagesService } from '@config/di';

export const generateLessonFormSchema = () => {
    const lessonsMessages = messagesService.lessonsMessages;

    return object().shape({
        description: string()
            .min(10, lessonsMessages.DESCRIPTION_MIN_LENGTH)
            .required(lessonsMessages.DESCRIPTION_REQUIRED),
    
        nextLesson: date()
            .required(lessonsMessages.NEXT_LESSON_REQUIRED),
    });
}