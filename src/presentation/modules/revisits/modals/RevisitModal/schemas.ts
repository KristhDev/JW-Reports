import { date, object, string } from 'yup';

/* Dependencies */
import { messagesService } from '@config/di';

export const generateNewRevisitFormSchema = () => {
    const revisitsMessages = messagesService.revisitsMessages;

    return object().shape({
        about: string()
            .min(10, revisitsMessages.ABOUT_MIN_LENGTH)
            .required(revisitsMessages.ABOUT_REQUIRED),

        nextVisit: date()
            .required(revisitsMessages.NEXT_VISIT_REQUIRED),
    });
}