import { object, ref, string } from 'yup';

import { messagesService } from '@config/di';

/* Validation schema for new email */
export const generateEmailFormSchema = (email: string) => {
    const authMessages = messagesService.authMessages;

    return object().shape({
        email: string()
            .email(authMessages.EMAIL_INVALID)
            .notOneOf([ email ], authMessages.EMAIL_UPDATE_UNCHANGED)
            .required(authMessages.EMAIL_EMPTY)
    });
}

/* Validation schema for new password */
export const generatePasswordFormSchema = () => {
    const authMessages = messagesService.authMessages;

    return object().shape({
        password: string()
            .min(6, authMessages.PASSWORD_MIN_LENGTH)
            .required(authMessages.PASSWORD_EMPTY),

        confirmPassword: string()
            .oneOf([ ref('password'), undefined ], authMessages.PASSWORD_NOT_MATCH)
            .required(authMessages.CONFIRM_PASSWORD_EMPTY),
    });
}