import { date, object } from 'yup';

/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Utils */
import { preachingMessages } from '../../utils';

/* Validation schema for preaching */
export const preachingFormSchema = object().shape({
    day: date()
        .required(preachingMessages.DAY_REQUIRED),

    initHour: date()
        .required(preachingMessages.INIT_HOUR_REQUIRED)
        .test('date-min', preachingMessages.INIT_HOUR_GREATER_THAN_FINAL, (value, { parent }) => {
            return Time.isBefore(value, parent.finalHour);
        }),

    finalHour: date()
        .required(preachingMessages.FINAL_HOUR_REQUIRED)
});
