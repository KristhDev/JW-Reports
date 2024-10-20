import { object, string } from 'yup';

import { authMessages, precursorMessages, PRECURSORS_OPTIONS } from '../../utils';

/* Validation schema for profile values */
export const profileFormSchema = object().shape({
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