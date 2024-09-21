import { act } from '@testing-library/react-native';

/* Setups */
import { onFinishMock, onSuccessMock, useImageSpy } from '@test-setup';
import { getMockStoreUseEmail, renderUseEmail } from '@setups';

/* Mocks */
import { authenticateStateMock, grantedStateMock, imageMock, initialStatusStateMock } from '@mocks';

/* Shared */
import { emailMessages } from '@shared';

/* Services */
import { email } from '@services';

const defaultImg = 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg';
const sendSpy = jest.spyOn(email, 'send');
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
        sendSpy.mockImplementation(() => Promise.resolve());

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

        expect(sendSpy).toHaveBeenCalledTimes(1);
        expect(sendSpy).toHaveBeenCalledWith({
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
        sendSpy.mockImplementation(() => Promise.resolve());
        uploadImageMock.mockResolvedValue({ data: { publicUrl: 'https://test.com/image.jpg' } });

        const mockStore = getMockStoreUseEmail({
            auth: authenticateStateMock,
            permissions: grantedStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseEmail(mockStore);

        await act(async () => {
            await result.current.useEmail.sendReportErrorEmail(
                { message: reportErrorMsg, image: imageMock },
                { onFinish: onFinishMock, onSuccess: onSuccessMock }
            );
        });

        expect(uploadImageMock).toHaveBeenCalledTimes(1);
        expect(uploadImageMock).toHaveBeenCalledWith(imageMock, expect.any(String));

        expect(sendSpy).toHaveBeenCalledTimes(1);
        expect(sendSpy).toHaveBeenCalledWith({
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
        sendSpy.mockRejectedValue(new Error('Failed to send email'));

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

        expect(sendSpy).toHaveBeenCalledTimes(1);
        expect(sendSpy).toHaveBeenCalledWith({
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
        sendSpy.mockImplementation(() => Promise.resolve());
        uploadImageMock.mockRejectedValue(new Error('Failed to upload image'));

        const mockStore = getMockStoreUseEmail({
            auth: authenticateStateMock,
            permissions: grantedStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseEmail(mockStore);

        await act(async () => {
            await result.current.useEmail.sendReportErrorEmail(
                { message: reportErrorMsg, image: imageMock },
                { onFinish: onFinishMock, onSuccess: onSuccessMock }
            );
        });

        expect(uploadImageMock).toHaveBeenCalledTimes(1);
        expect(uploadImageMock).toHaveBeenCalledWith(imageMock, expect.any(String));

        expect(sendSpy).not.toHaveBeenCalled();

        expect(onSuccessMock).not.toHaveBeenCalled();
        expect(onFinishMock).toHaveBeenCalledTimes(1);

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: emailMessages.REPORT_ERROR_FAILED
        });
    });
});