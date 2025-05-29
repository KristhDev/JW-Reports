/* Config */
import { env } from '@config/env';
import { emailService, messagesService, toasterAdapter } from '@config/di';

/* Errors */
import { EmailError } from '@domain/errors';

/* Hooks */
import { useAuth } from '@auth/hooks';
import useImage from './useImage';

/* Interfaces */
import { ReportErrorOptions, UtilFunctions } from '../interfaces';

const useEmail = () => {
    const emailMessages = messagesService.emailMessages;

    const { state: { user } } = useAuth();
    const { uploadImage } = useImage();

    /**
     * Sends an email to the administrator with the message provided by the user.
     *
     * @param {string} message The message to send in the email.
     * @param {{ onFinish: () => void, onSuccess: () => void }} options The options to call when the email is sent.
     * @return {Promise<void>} This function does not return any value.
     */
    const sendFeedbackEmail = async (message: string, { onFinish, onSuccess }: UtilFunctions): Promise<void> => {
        try {
            await emailService.send({
                email: user.email,
                message,
                templateId: env.EMAILJS_FEEDBACK_TEMPLATE_ID!
            });

            toasterAdapter.showToast(emailMessages.FEEDBACK_SUCCESS, { bottomOffset: 8 });
            onSuccess && onSuccess();
        }
        catch (error) {
            console.error(error);
            toasterAdapter.showToast(emailMessages.FEEDBACK_FAILED, { bottomOffset: 8 });
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
            if (image) imageUrl = await uploadImage(image, env.SUPABASE_ERRORS_FOLDER!);

            await emailService.send({
                email: user.email,
                message,
                templateId: env.EMAILJS_REPORT_ERROR_TEMPLATE_ID!,
                imageUrl
            });

            toasterAdapter.showToast(emailMessages.REPORT_ERROR_SUCCESS, { bottomOffset: 8 });
            onSuccess && onSuccess();
        }
        catch (error) {
            if (error instanceof EmailError) {
                toasterAdapter.showToast(emailMessages.REPORT_ERROR_FAILED, { bottomOffset: 8 });
                return;
            }

            toasterAdapter.showError(error, { bottomOffset: 8 });
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