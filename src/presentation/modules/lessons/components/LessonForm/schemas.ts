import { date, object, string } from 'yup';

import { lessonsMessages } from '../../utils';

/* Validation schema for lesson */
export const lessonFormSchema = object().shape({
    description: string()
        .min(10, lessonsMessages.DESCRIPTION_MIN_LENGTH)
        .required(lessonsMessages.DESCRIPTION_REQUIRED),

    nextLesson: date()
        .required(lessonsMessages.NEXT_LESSON_REQUIRED),
});