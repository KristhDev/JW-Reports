import { object, string } from 'yup';

/* Config */
import { messagesService, publisherService } from '@config/di';

/* Validation schema for profile values */
export const generateProfileFormSchema = () => {
    const authMessages = messagesService.authMessages;
    const precursorMessages = messagesService.precursorMessages;
    const PRECURSORS_OPTIONS = publisherService.PRECURSORS_OPTIONS;

    return object().shape({
        name: string()
            .min(2, authMessages.NAME_MIN_LENGTH)
            .required(authMessages.NAME_EMPTY),

        surname: string()
            .min(2, authMessages.SURNAME_MIN_LENGTH)
            .required(authMessages.SURNAME_EMPTY),

        precursor: string()
            .oneOf(PRECURSORS_OPTIONS.map(op => op.value), precursorMessages.PRECURSOR_INVALID)
            .required(precursorMessages.PRECURSOR_EMPTY),
    });
}