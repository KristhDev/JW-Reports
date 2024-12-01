import { object, ref, string } from 'yup';

import { authMessages } from '@application/constants';

/* Validation schema for register values */
export const registerFormSchema = object().shape({
    name: string()
        .min(2, authMessages.NAME_MIN_LENGTH)
        .required(authMessages.NAME_EMPTY),

    surname: string()
        .min(2, authMessages.SURNAME_MIN_LENGTH)
        .required(authMessages.SURNAME_EMPTY),

    email: string()
        .email(authMessages.EMAIL_INVALID)
        .required(authMessages.EMAIL_EMPTY),

    password: string()
        .min(6, authMessages.PASSWORD_MIN_LENGTH)
        .required(authMessages.PASSWORD_EMPTY),

    confirmPassword: string()
        .oneOf([ ref('password'), undefined ], authMessages.PASSWORD_NOT_MATCH)
        .required(authMessages.CONFIRM_PASSWORD_EMPTY),
});