import { object, string } from 'yup';

/* Config */
import { messagesService } from '@config/di';

/* Validation schema for login values (email and password) */
export const generateLoginFormSchema = () => {
    const authMessages = messagesService.authMessages;

    return object().shape({
        email: string()
            .email(authMessages.EMAIL_INVALID)
            .required(authMessages.EMAIL_EMPTY),

        password: string()
            .min(6, authMessages.PASSWORD_MIN_LENGTH)
            .required(authMessages.PASSWORD_EMPTY)
    });
}