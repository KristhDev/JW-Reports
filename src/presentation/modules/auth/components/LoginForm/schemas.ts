import { object, string } from 'yup';

import { authMessages } from '@application/constants';

/* Validation schema for login values (email and password) */
export const loginFormSchema = object().shape({
    email: string()
        .email(authMessages.EMAIL_INVALID)
        .required(authMessages.EMAIL_EMPTY),

    password: string()
        .min(6, authMessages.PASSWORD_MIN_LENGTH)
        .required(authMessages.PASSWORD_EMPTY)
});