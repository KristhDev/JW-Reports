import EmailJs, { EmailJSResponseStatus } from '@emailjs/react-native';

/* Config */
import { env } from '@config';

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
        EmailJs.init({ publicKey: env.EMAILJS_PUBLIC_KEY });
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
                env.EMAILJS_SERVICE_ID,
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
