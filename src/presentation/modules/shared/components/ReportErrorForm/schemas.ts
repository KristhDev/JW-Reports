import { object, string } from 'yup';

/* Constants */
import { emailMessages } from '@application/constants';

/* Validation schema of error */
export const reportErrorFormSchema = object().shape({
    message: string()
        .min(10, emailMessages.MESSAGE_MIN_LENGTH)
        .required(emailMessages.MESSAGE_REQUIRED)
});