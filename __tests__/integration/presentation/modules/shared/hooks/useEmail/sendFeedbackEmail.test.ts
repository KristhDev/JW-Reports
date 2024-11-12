import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseEmail, renderUseEmail } from '@setups';

/* Mocks */
import {
    authenticateStateMock,
    EmailServiceSpy,
    grantedStateMock,
    initialStatusStateMock,
    onFinishMock,
    onSuccessMock,
    useImageSpy
} from '@mocks';

/* Constants */
import { emailMessages } from '@application/constants';

const feedbackMsg = 'This is a feedback message';

useImageSpy.mockImplementation(() => ({
    uploadImage: jest.fn()
}) as any);

describe('Test in useEmail - sendFeedbackEmail', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should send feedback email', async () => {
        EmailServiceSpy.send.mockImplementation(() => Promise.resolve());

        const mockStore = getMockStoreUseEmail({
            auth: authenticateStateMock,
            permissions: grantedStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseEmail(mockStore);

        await act(async () => {
            await result.current.useEmail.sendFeedbackEmail(feedbackMsg, { onFinish: onFinishMock, onSuccess: onSuccessMock });
        });

        expect(EmailServiceSpy.send).toHaveBeenCalledTimes(1);
        expect(EmailServiceSpy.send).toHaveBeenCalledWith({
            email: authenticateStateMock.user.email,
            message: feedbackMsg,
            templateId: expect.any(String)
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(onSuccessMock).toHaveBeenCalledTimes(1);

        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: emailMessages.FEEDBACK_SUCCESS
        });
    });

    it('should faild because send throws an error', async () => {
        EmailServiceSpy.send.mockImplementation(() => Promise.reject());

        const mockStore = getMockStoreUseEmail({
            auth: authenticateStateMock,
            permissions: grantedStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseEmail(mockStore);

        await act(async () => {
            await result.current.useEmail.sendFeedbackEmail(feedbackMsg, { onFinish: onFinishMock, onSuccess: onSuccessMock });
        });

        expect(EmailServiceSpy.send).toHaveBeenCalledTimes(1);
        expect(EmailServiceSpy.send).toHaveBeenCalledWith({
            email: authenticateStateMock.user.email,
            message: feedbackMsg,
            templateId: expect.any(String)
        });

        expect(onFinishMock).toHaveBeenCalledTimes(1);
        expect(onSuccessMock).not.toHaveBeenCalled();

        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: emailMessages.FEEDBACK_FAILED
        });
    });
});