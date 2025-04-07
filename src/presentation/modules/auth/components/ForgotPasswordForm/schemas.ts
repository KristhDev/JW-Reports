import { object, string } from 'yup';

/* Config */
import { messagesService } from '@config/di';

/* Validation schema to forgot password */
export const generateForgotPasswordFormSchema = () => {
    const authMessages = messagesService.authMessages;

    return object().shape({
        email: string()
            .email(authMessages.EMAIL_INVALID)
            .required(authMessages.EMAIL_EMPTY)
    });
}