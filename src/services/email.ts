import EmailJs from '@emailjs/react-native';

/* Interfaces */
import { SendEmailOptions } from '@shared';

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
    send: async ({ email, message, templateId }: SendEmailOptions): Promise<void> => {
        try {
            await EmailJs.send(
                EMAILJS_SERVICE_ID,
                templateId,
                { email, message }
            );
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}