/* Hooks */
import { useAuth } from '@auth';
import useStatus from './useStatus';

/* Services */
import { email } from '@services';

/* Env */
import { EMAILJS_FEEDBACK_TEMPLATE_ID } from '@env';

const useEmail = () => {
    const { state: { user } } = useAuth();
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

            setStatus({ code: 200, msg: '¡Gracias por compartir su sugerencia!' });
            onSuccess && onSuccess();
        }
        catch (error) {
            setStatus({ code: 400, msg: 'Lo sentimos pero ocurrio un error al enviar su sugerencia, por favor intentelo más tarde.' });
        }
    }

    return {
        sendFeedbackEmail
    }
}

export default useEmail;