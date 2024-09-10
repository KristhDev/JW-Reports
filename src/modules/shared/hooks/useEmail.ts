/* Env */
import { EMAILJS_FEEDBACK_TEMPLATE_ID, EMAILJS_REPORT_ERROR_TEMPLATE_ID, SUPABASE_ERRORS_FOLDER } from '@env';

/* Hooks */
import { useAuth } from '@auth';
import useImage from './useImage';
import useStatus from './useStatus';

/* Services */
import { email } from '@services';

/* Interfaces */
import { ReportErrorOptions } from '../interfaces';

/* Utils */
import { emailMessages } from '../utils';

const useEmail = () => {
    const { state: { user } } = useAuth();
    const { uploadImage } = useImage();
    const { setStatus } = useStatus();

    /**
     * Sends an email with the feedback message to the administrator.
     *
     * @param {string} message - The message to be sent.
     * @param {Function} [onSuccess] - A callback function that will be called if the email is sent successfully.
     * @return {Promise<void>} The promise that will be resolved when the email is sent, or rejected if there is an error.
     */
    const sendFeedbackEmail = async (message: string, onSuccess?: () => void): Promise<void> => {
        try {
            await email.send({
                email: user.email,
                message,
                templateId: EMAILJS_FEEDBACK_TEMPLATE_ID
            });

            setStatus({ code: 200, msg: emailMessages.FEEDBACK_SUCCESS });
            onSuccess && onSuccess();
        }
        catch (error) {
            console.log(error);
            setStatus({ code: 400, msg: emailMessages.FEEDBACK_FAILED });
        }
    }

    /**
     * Sends an email with the error message and image to the administrator.
     *
     * @param {ReportErrorOptions} options - The options to send the email.
     * @param {Function} [onSuccess] - A callback function that will be called if the email is sent successfully.
     * @return {Promise<void>} The promise that will be resolved when the email is sent, or rejected if there is an error.
     */
    const sendReportErrorEmail = async ({ message, image }: ReportErrorOptions, options: { onSuccess?: () => void, onFinish?: () => void }): Promise<void> => {
        try {
            let imageUrl = 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg';

            if (image) {
                const { data, error } = await uploadImage(image, SUPABASE_ERRORS_FOLDER);
                if (error) throw error;

                imageUrl = data?.publicUrl!;
            }

            await email.send({
                email: user.email,
                message,
                templateId: EMAILJS_REPORT_ERROR_TEMPLATE_ID,
                imageUrl
            });

            setStatus({ code: 200, msg: emailMessages.REPORT_ERROR_SUCCESS });
            options.onSuccess && options.onSuccess();
        }
        catch (error) {
            console.log(error);
            setStatus({ code: 400, msg: emailMessages.REPORT_ERROR_FAILED });
        }
        finally {
            options.onFinish && options.onFinish();
        }
    }

    return {
        sendFeedbackEmail,
        sendReportErrorEmail
    }
}

export default useEmail;