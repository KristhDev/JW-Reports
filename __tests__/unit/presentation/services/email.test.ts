import EmailJs from '@emailjs/react-native';

/* Errors */
import { EmailError } from '@domain/errors';

/* Shared */
import { SendEmailOptions } from '@shared';

/* Services */
import { EmailService } from '@services';

const emailOptions: SendEmailOptions = {
    email: 'emailexample@gmail.com',
    imageUrl: 'http://placeimg.com/640/480',
    message: 'Message to send',
    templateId: 'template-id-to-send-EmailService'
}

describe('Test in EmailService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should have respective methods', () => {
        expect(EmailService).toHaveProperty('init');
        expect(typeof EmailService.init).toBe('function');
        expect(EmailService).toHaveProperty('send');
        expect(typeof EmailService.send).toBe('function');
    });

    it('should call init - init', async () => {
        EmailService.init();

        expect(EmailJs.init).toHaveBeenCalledTimes(1);
        expect(EmailJs.init).toHaveBeenCalledWith({ publicKey: expect.any(String) });
    });

    it('should send email - send', async () => {
        await EmailService.send(emailOptions);

        expect(EmailJs.send).toHaveBeenCalledTimes(1);
        expect(EmailJs.send).toHaveBeenCalledWith(
            expect.any(String),
            emailOptions.templateId,
            { email: emailOptions.email, imageUrl: emailOptions.imageUrl, message: emailOptions.message }
        );
    });

    it('should faild send email when throw a error - send', async () => {
        (EmailJs.send as jest.Mock).mockRejectedValue(new Error('Message not send'));

        try {
            await EmailService.send(emailOptions);
            expect(true).toBeFalsy();
        }
        catch (error) {
            expect(error).toBeInstanceOf(EmailError);
            expect(error).toHaveProperty('message', 'Message not send')
        }
    });
});