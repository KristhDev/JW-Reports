import { object, string } from 'yup';

/* Config */
import { messagesService } from '@config/di';

/* Validation schema of feedback */
export const generateFeedbackFormSchema = () => {
    const emailMessages = messagesService.emailMessages;

    return object().shape({
        message: string()
        .min(10, emailMessages.MESSAGE_MIN_LENGTH)
    });
}