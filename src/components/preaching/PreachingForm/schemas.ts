import dayjs from 'dayjs';
import { date, object } from 'yup';

/* Validation schema for preaching */
export const preachingFormSchema = object().shape({
    day: date()
        .required('El día no puede estar vacío.'),
    initHour: date()
        .required('La hora inicial no puede estar vacía.')
        .test('date-min', 'La hora inicial no puede ser mayor que la hora final.', (value, { parent }) => {
            return dayjs(value).isBefore(dayjs(parent.finalHour));
        }),
    finalHour: date()
        .required('La hora final no puede estar vacía.')
});
