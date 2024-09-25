import EmailJs from '@emailjs/react-native';

/* Shared */
import { SendEmailOptions } from '@shared';

/* Services */
import { email } from '@services';

/* Utils */
import { EmailError } from '@utils';

const emailOptions: SendEmailOptions = {
    email: 'emailexample@gmail.com',
    imageUrl: 'http://placeimg.com/640/480',
    message: 'Message to send',
    templateId: 'template-id-to-send-email'
}

describe('Test in email service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should have respective methods', () => {
        expect(email).toEqual({
            init: expect.any(Function),
            send: expect.any(Function)
        });
    });

    it('should call init - init', async () => {
        email.init();

        expect(EmailJs.init).toHaveBeenCalledTimes(1);
        expect(EmailJs.init).toHaveBeenCalledWith({ publicKey: expect.any(String) });
    });

    it('should send email - send', async () => {
        await email.send(emailOptions);

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
            await email.send(emailOptions);
            expect(true).toBeFalsy();
        }
        catch (error) {
            expect(error).toBeInstanceOf(EmailError);
            expect(error).toHaveProperty('message', 'Message not send')
        }
    });
});