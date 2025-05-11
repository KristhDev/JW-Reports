import { date, object } from 'yup';

/* Config */
import { timeAdapter, messagesService } from '@config/di';

/* Validation schema for preaching */
export const generatePreachingFormSchema = () => {
    const preachingMessages = messagesService.preachingMessages;

    return object().shape({
        day: date()
            .required(preachingMessages.DAY_REQUIRED),

        initHour: date()
            .required(preachingMessages.INIT_HOUR_REQUIRED)
            .test('date-min', preachingMessages.INIT_HOUR_GREATER_THAN_FINAL, (value, { parent }) => {
                return timeAdapter.isBefore(value, parent.finalHour);
            }),

        finalHour: date()
            .required(preachingMessages.FINAL_HOUR_REQUIRED)
    });
}