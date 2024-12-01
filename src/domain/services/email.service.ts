import EmailJs, { EmailJSResponseStatus } from '@emailjs/react-native';

/* Errors */
import { EmailError } from '@domain/errors';

/* Interfaces */
import { SendEmailOptions } from '@infrasturcture/interfaces';

export class EmailService {
    /**
     * Initializes the email service
     *
     * @returns {void} - This function does not return anything
     */
    public static init(): void {
        EmailJs.init({ publicKey: process.env.EXPO_PUBLIC_EMAILJS_PUBLIC_KEY! });
    }

    /**
     * Sends an email with the given email, message, and templateId
     *
     * @param {SendEmailOptions} options - The options to send the email
     * @returns {Promise<void>} - A promise that resolves when the email is sent
     */
    public static async send({ email, imageUrl, message, templateId }: SendEmailOptions): Promise<void> {
        try {
            await EmailJs.send(
                process.env.EXPO_PUBLIC_EMAILJS_SERVICE_IDD!,
                templateId,
                { email, imageUrl, message }
            );
        }
        catch (error) {
            let errorMessage = '';

            if (error instanceof EmailJSResponseStatus) errorMessage = error.text;
            else {
                errorMessage = Object.hasOwn(error as Error, 'message')
                    ? (error as Error).message
                    : 'Ocurrió un error al enviar el correo';
            }

            const emailError = new EmailError(errorMessage);
            throw emailError;
        }
    }
}
