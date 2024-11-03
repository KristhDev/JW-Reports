import { date, object, string } from 'yup';

/* Constants */
import { revisitsMessages } from '@application/constants';

/* Validation schema of revisit */
export const revisitFormSchema = object().shape({
    personName: string()
        .min(2, revisitsMessages.PERSON_MIN_LENGTH)
        .required(revisitsMessages.PERSON_NAME_REQUIRED),

    about: string()
        .min(10, revisitsMessages.ABOUT_MIN_LENGTH)
        .required(revisitsMessages.ABOUT_REQUIRED),

    address: string()
        .min(10, revisitsMessages.ADDRESS_MIN_LENGTH)
        .required(revisitsMessages.ADDRESS_REQUIRED),

    nextVisit: date()
        .required(revisitsMessages.NEXT_VISIT_REQUIRED),
});