import { object, ref, string } from 'yup';

import { authMessages } from '../../utils';

/* Validation schema for new email */
export const emailFormSchema = (email: string) => object().shape({
    email: string()
        .email(authMessages.EMAIL_INVALID)
        .notOneOf([ email ], authMessages.EMAIL_UPDATE_UNCHANGED)
        .required(authMessages.EMAIL_EMPTY)
});

/* Validation schema for new password */
export const passwordFormSchema = object().shape({
    password: string()
        .min(6, authMessages.PASSWORD_MIN_LENGTH)
        .required(authMessages.PASSWORD_EMPTY),

    confirmPassword: string()
        .oneOf([ ref('password'), undefined ], authMessages.PASSWORD_NOT_MATCH)
        .required(authMessages.CONFIRM_PASSWORD_EMPTY),
});