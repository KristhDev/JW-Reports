import { date, object } from 'yup';

/* Constants */
import { preachingMessages } from '@application/constants/messages';

/* Adapters */
import { TimeAdapter } from '@infrastructure/adapters';

/* Validation schema for preaching */
export const preachingFormSchema = object().shape({
    day: date()
        .required(preachingMessages.DAY_REQUIRED),

    initHour: date()
        .required(preachingMessages.INIT_HOUR_REQUIRED)
        .test('date-min', preachingMessages.INIT_HOUR_GREATER_THAN_FINAL, (value, { parent }) => {
            return TimeAdapter.isBefore(value, parent.finalHour);
        }),

    finalHour: date()
        .required(preachingMessages.FINAL_HOUR_REQUIRED)
});
