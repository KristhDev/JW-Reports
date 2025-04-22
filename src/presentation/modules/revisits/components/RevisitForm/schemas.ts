import { date, object, string } from 'yup';

/* Config */
import { messagesService } from '@config/di';

/* Validation schema of revisit */
export const generateRevisitFormSchema = () => {
    const revisitsMessages = messagesService.revisitsMessages;

    return object().shape({
        personName: string()
            .min(2, revisitsMessages.PERSON_NAME_MIN_LENGTH)
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
}