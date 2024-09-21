/* Setups */
import { useImageSpy } from '@test-setup';
import { getMockStoreUseEmail, renderUseEmail } from '@setups';

/* Mocks */
import { authenticateStateMock, grantedStateMock, initialStatusStateMock } from '@mocks';

useImageSpy.mockImplementation(() => ({
    uploadImage: jest.fn()
}) as any);

describe('Test in useEmail hook', () => {
    it('should return respective functions', () => {
        const mockStore = getMockStoreUseEmail({
            auth: authenticateStateMock,
            status: initialStatusStateMock,
            permissions: grantedStateMock
        });

        const { result } = renderUseEmail(mockStore);

        expect(result.current.useEmail).toEqual({
            sendFeedbackEmail: expect.any(Function),
            sendReportErrorEmail: expect.any(Function),
        });
    });
});