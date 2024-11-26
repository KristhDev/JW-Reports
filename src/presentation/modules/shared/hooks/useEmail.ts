/* Constants */
import { emailMessages } from '@application/constants';

/* Errors */
import { EmailError } from '@domain/errors';

/* Services */
import { EmailService } from '@domain/services';

/* Env */
import { EMAILJS_FEEDBACK_TEMPLATE_ID, EMAILJS_REPORT_ERROR_TEMPLATE_ID, SUPABASE_ERRORS_FOLDER } from '@env';

/* Hooks */
import { useAuth } from '@auth';
import useImage from './useImage';
import useStatus from './useStatus';

/* Interfaces */
import { ReportErrorOptions, UtilFunctions } from '../interfaces';

const useEmail = () => {
    const { state: { user } } = useAuth();
    const { uploadImage } = useImage();
    const { setStatus, setError } = useStatus();

    /**
     * Sends an email to the administrator with the message provided by the user.
     *
     * @param {string} message The message to send in the email.
     * @param {{ onFinish: () => void, onSuccess: () => void }} options The options to call when the email is sent.
     * @return {Promise<void>} This function does not return any value.
     */
    const sendFeedbackEmail = async (message: string, { onFinish, onSuccess }: UtilFunctions): Promise<void> => {
        try {
            await EmailService.send({
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
        finally {
            onFinish && onFinish();
        }
    }

    /**
     * Sends an email with the error message and image to the administrator.
     *
     * @param {ReportErrorOptions} options The options to send the email.
     * @param {Function} [onSuccess] A callback function that will be called if the email is sent successfully.
     * @return {Promise<void>} The promise that will be resolved when the email is sent, or rejected if there is an error.
     */
    const sendReportErrorEmail = async ({ message, image }: ReportErrorOptions, { onFinish, onSuccess }: UtilFunctions): Promise<void> => {
        try {
            let imageUrl = 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg';
            if (image) imageUrl = await uploadImage(image, SUPABASE_ERRORS_FOLDER);

            await EmailService.send({
                email: user.email,
                message,
                templateId: EMAILJS_REPORT_ERROR_TEMPLATE_ID,
                imageUrl
            });

            setStatus({ code: 200, msg: emailMessages.REPORT_ERROR_SUCCESS });
            onSuccess && onSuccess();
        }
        catch (error) {
            if (error instanceof EmailError) {
                setStatus({ code: 400, msg: emailMessages.REPORT_ERROR_FAILED });
                return;
            }

            setError(error);
        }
        finally {
            onFinish && onFinish();
        }
    }

    return {
        sendFeedbackEmail,
        sendReportErrorEmail
    }
}

export default useEmail;