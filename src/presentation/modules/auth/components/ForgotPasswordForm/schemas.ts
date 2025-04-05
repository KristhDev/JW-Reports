import { object, string } from 'yup';

import { authMessages } from '@application/constants/messages';

/* Validation schema to forgot password */
export const forgotPasswordFormSchema = object().shape({
    email: string()
        .email(authMessages.EMAIL_INVALID)
        .required(authMessages.EMAIL_EMPTY)
});