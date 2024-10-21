import { EmailService } from '@services';

export const EmailServiceSpy = {
    init: jest.spyOn(EmailService, 'init'),
    send: jest.spyOn(EmailService, 'send'),
}