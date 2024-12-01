import { object, string } from 'yup';

/* Constants */
import { coursesMessages } from '@application/constants';

 /* Validation schema for course */
export const courseFormSchema = object().shape({
    personName: string()
        .min(2, coursesMessages.PERSON_NAME_MIN_LENGTH)
        .required(coursesMessages.PERSON_NAME_REQUIRED),

    personAbout: string()
        .min(10, coursesMessages.PERSON_ABOUT_MIN_LENGTH)
        .required(coursesMessages.PERSON_ABOUT_REQUIRED),

    personAddress: string()
        .min(10, coursesMessages.PERSON_ADDRESS_MIN_LENGTH)
        .required(coursesMessages.PERSON_ADDRESS_REQUIRED),

    publication: string()
        .min(5, coursesMessages.PUBLICATION_MIN_LENGTH)
        .required(coursesMessages.PUBLICATION_REQUIRED),
});