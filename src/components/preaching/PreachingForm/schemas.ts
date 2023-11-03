import dayjs from 'dayjs';
import { date, object } from 'yup';

/* Validation schema for preaching */
export const preachingFormSchema = object().shape({
    day: date()
        .required('El día no puede estar vacío.'),
    init_hour: date()
        .required('La hora inicial no puede estar vacía.')
        .test('date-min', 'La hora inicial no puede ser mayor que la hora final.', (value, { parent }) => {
            return dayjs(value).isBefore(dayjs(parent.final_hour));
        }),
    final_hour: date()
        .required('La hora final no puede estar vacía.')
});
