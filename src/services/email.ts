import EmailJs, { EmailJSResponseStatus } from '@emailjs/react-native';

/* Interfaces */
import { SendEmailOptions } from '@shared';

/* Utils */
import { EmailError } from '@utils';

/* Env */
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID } from '@env';

export const email = {
    /**
     * Initializes the email service
     *
     * @returns {void} - This function does not return anything
     */
    init: (): void => {
        EmailJs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    },


    /**
     * Sends an email with the given email, message and templateId
     *
     * @param {SendEmailOptions} options - The options to send the email
     * @returns {Promise<void>} - A promise that resolves when the email is sent
     */
    send: async ({ email, imageUrl, message, templateId }: SendEmailOptions): Promise<void> => {
        try {
            await EmailJs.send(
                EMAILJS_SERVICE_ID,
                templateId,
                { email, imageUrl, message }
            );
        }
        catch (error) {
            let message = '';

            if (error instanceof EmailJSResponseStatus) message = error.text;
            else message = Object.hasOwn(error as Error, 'message') ? (error as Error).message : 'Ocurrio un error al enviar el correo';

            const emailError = new EmailError(message);
            throw emailError;
        }
    }
}