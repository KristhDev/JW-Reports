import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseEmail, renderUseEmail } from '@setups';

/* Mocks */
import {
    authenticateStateMock,
    EmailServiceSpy,
    grantedStateMock,
    imageModelMock,
    initialStatusStateMock,
    onFinishMock,
    onSuccessMock,
    useImageSpy
} from '@mocks';

/* Constants */
import { emailMessages } from '@application/constants';

/* Errors */
import { EmailError, ImageError } from '@domain/errors';

const defaultImg = 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg';
const uploadImageMock = jest.fn();

const reportErrorMsg = 'This is a report error message';

useImageSpy.mockImplementation(() => ({
    uploadImage: uploadImageMock
}) as any);

describe('Test in useEmail - sendReportErrorEmail', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should send report error email', async () => {
        EmailServiceSpy.send.mockImplementation(() => Promise.resolve());

        const mockStore = getMockStoreUseEmail({
            auth: authenticateStateMock,
            permissions: grantedStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseEmail(mockStore);

        await act(async () => {
            await result.current.useEmail.sendReportErrorEmail(
                { message: reportErrorMsg, image: null },
                { onFinish: onFinishMock, onSuccess: onSuccessMock }
            );
        });

        expect(EmailServiceSpy.send).toHaveBeenCalledTimes(1);
        expect(EmailServiceSpy.send).toHaveBeenCalledWith({
            email: authenticateStateMock.user.email,
            message: reportErrorMsg,
            templateId: expect.any(String),
            imageUrl: defaultImg
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(onSuccessMock).toHaveBeenCalledTimes(1);

        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: emailMessages.REPORT_ERROR_SUCCESS
        });
    });

    it('should send report error email with image', async () => {
        EmailServiceSpy.send.mockImplementation(() => Promise.resolve());
        uploadImageMock.mockResolvedValue('https://test.com/image.jpg');

        const mockStore = getMockStoreUseEmail({
            auth: authenticateStateMock,
            permissions: grantedStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseEmail(mockStore);

        await act(async () => {
            await result.current.useEmail.sendReportErrorEmail(
                { message: reportErrorMsg, image: imageModelMock },
                { onFinish: onFinishMock, onSuccess: onSuccessMock }
            );
        });

        expect(uploadImageMock).toHaveBeenCalledTimes(1);
        expect(uploadImageMock).toHaveBeenCalledWith(imageModelMock, expect.any(String));

        expect(EmailServiceSpy.send).toHaveBeenCalledTimes(1);
        expect(EmailServiceSpy.send).toHaveBeenCalledWith({
            email: authenticateStateMock.user.email,
            message: reportErrorMsg,
            templateId: expect.any(String),
            imageUrl: 'https://test.com/image.jpg'
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(onSuccessMock).toHaveBeenCalledTimes(1);

        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: emailMessages.REPORT_ERROR_SUCCESS
        });
    });

    it('should faild because send throws an error', async () => {
        EmailServiceSpy.send.mockRejectedValue(new EmailError('Failed to send email'));

        const mockStore = getMockStoreUseEmail({
            auth: authenticateStateMock,
            permissions: grantedStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseEmail(mockStore);

        await act(async () => {
            await result.current.useEmail.sendReportErrorEmail(
                { message: reportErrorMsg, image: null },
                { onFinish: onFinishMock, onSuccess: onSuccessMock }
            );
        });

        expect(EmailServiceSpy.send).toHaveBeenCalledTimes(1);
        expect(EmailServiceSpy.send).toHaveBeenCalledWith({
            email: authenticateStateMock.user.email,
            message: reportErrorMsg,
            templateId: expect.any(String),
            imageUrl: defaultImg
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(onSuccessMock).not.toHaveBeenCalled();

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: emailMessages.REPORT_ERROR_FAILED
        });
    });

    it('should faild because uploadImage throws an error', async () => {
        EmailServiceSpy.send.mockImplementation(() => Promise.resolve());
        uploadImageMock.mockRejectedValue(new ImageError('Failed to upload image'));

        const mockStore = getMockStoreUseEmail({
            auth: authenticateStateMock,
            permissions: grantedStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseEmail(mockStore);

        await act(async () => {
            await result.current.useEmail.sendReportErrorEmail(
                { message: reportErrorMsg, image: imageModelMock },
                { onFinish: onFinishMock, onSuccess: onSuccessMock }
            );
        });

        expect(uploadImageMock).toHaveBeenCalledTimes(1);
        expect(uploadImageMock).toHaveBeenCalledWith(imageModelMock, expect.any(String));

        expect(EmailServiceSpy.send).not.toHaveBeenCalled();

        expect(onSuccessMock).not.toHaveBeenCalled();
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'Ocurrió un error al realizar está acción, por favor vuelvalo a intentar.'
        });
    });
});