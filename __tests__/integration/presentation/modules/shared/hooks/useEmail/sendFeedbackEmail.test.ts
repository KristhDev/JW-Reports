import { act } from '@testing-library/react-native';

/* Setups */
import { onFinishMock, onSuccessMock, useImageSpy } from '@test-setup';
import { getMockStoreUseEmail, renderUseEmail } from '@setups';

/* Mocks */
import { authenticateStateMock, grantedStateMock, initialStatusStateMock } from '@mocks';

/* Services */
import { email } from '@services';

/* Shared */
import { emailMessages } from '@shared';

const sendSpy = jest.spyOn(email, 'send');

const feedbackMsg = 'This is a feedback message';

useImageSpy.mockImplementation(() => ({
    uploadImage: jest.fn()
}) as any);

describe('Test in useEmail - sendFeedbackEmail', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should send feedback email', async () => {
        sendSpy.mockImplementation(() => Promise.resolve());

        const mockStore = getMockStoreUseEmail({
            auth: authenticateStateMock,
            permissions: grantedStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseEmail(mockStore);

        await act(async () => {
            await result.current.useEmail.sendFeedbackEmail(feedbackMsg, { onFinish: onFinishMock, onSuccess: onSuccessMock });
        });

        expect(sendSpy).toHaveBeenCalledTimes(1);
        expect(sendSpy).toHaveBeenCalledWith({
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
        sendSpy.mockImplementation(() => Promise.reject());

        const mockStore = getMockStoreUseEmail({
            auth: authenticateStateMock,
            permissions: grantedStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseEmail(mockStore);

        await act(async () => {
            await result.current.useEmail.sendFeedbackEmail(feedbackMsg, { onFinish: onFinishMock, onSuccess: onSuccessMock });
        });

        expect(sendSpy).toHaveBeenCalledTimes(1);
        expect(sendSpy).toHaveBeenCalledWith({
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