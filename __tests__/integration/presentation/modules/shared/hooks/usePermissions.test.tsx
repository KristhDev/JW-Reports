import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUsePermissions, renderUsePermissions } from '@setups';

/* Mocks */
import { DeviceImageServiceSpy, grantedStateMock, initialPermissionsStateMock, initialStatusStateMock, NotificationsServiceSpy, VoiceRecorderSpy } from '@mocks';

/* Constants */
import { permissionsMessages, permissionsStatus } from '@application/constants';

describe('Test in usePermissions hook', () => {
    let mockStore = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStore = getMockStoreUsePermissions({
            permissions: initialPermissionsStateMock,
            status: initialStatusStateMock
        });
    });

    it('should return respective props', () => {
        const { result } = renderUsePermissions(mockStore);

        /* Check if hook return respective properties */
        expect(result.current.usePermissions).toEqual({
            state: initialPermissionsStateMock,

            isCameraBlocked: expect.any(Boolean),
            isCameraDenied: expect.any(Boolean),
            isCameraGranted: expect.any(Boolean),
            isCameraUnavailable: expect.any(Boolean),
            isCameraUndetermined: expect.any(Boolean),
            isMediaLibraryBlocked: expect.any(Boolean),
            isMediaLibraryDenied: expect.any(Boolean),
            isMediaLibraryGranted: expect.any(Boolean),
            isMediaLibraryUnavailable: expect.any(Boolean),
            isMediaLibraryUndetermined: expect.any(Boolean),
            isNotificationsBlocked: expect.any(Boolean),
            isNotificationsDenied: expect.any(Boolean),
            isNotificationsGranted: expect.any(Boolean),
            isNotificationsUnavailable: expect.any(Boolean),
            isNotificationsUndetermined: expect.any(Boolean),
            isRecordAudioBlocked: expect.any(Boolean),
            isRecordAudioDenied: expect.any(Boolean),
            isRecordAudioGranted: expect.any(Boolean),
            isRecordAudioUnavailable: expect.any(Boolean),
            isRecordAudioUndetermined: expect.any(Boolean),

            askPermission: expect.any(Function),
            checkPermissions: expect.any(Function),
            requestPermissions: expect.any(Function),
        });
    });

    it('should get permissions - checkPermissions', async () => {
        DeviceImageServiceSpy.getCameraPermission.mockResolvedValueOnce(permissionsStatus.GRANTED);
        DeviceImageServiceSpy.getMediaLibraryPermissionsAsync.mockResolvedValueOnce(permissionsStatus.GRANTED);
        NotificationsServiceSpy.getNotificationsPermission.mockResolvedValueOnce(permissionsStatus.GRANTED);
        VoiceRecorderSpy.getRecordAudioPermission.mockResolvedValueOnce(permissionsStatus.GRANTED);

        const { result } = renderUsePermissions(mockStore);

        await act(async () => {
            await result.current.usePermissions.checkPermissions();
        });

        /* Check if permissions are updated */
        expect(result.current.usePermissions.state).toEqual({
            ...grantedStateMock,
            isPermissionsRequested: false
        });
    });

    it('should request permission - askPermission', async () => {
        DeviceImageServiceSpy.requestMediaLibraryPermission.mockResolvedValueOnce(permissionsStatus.DENIED);

        const { result } = renderUsePermissions(mockStore);

        await act(async () => {
            const status = await result.current.usePermissions.askPermission('mediaLibrary');
            expect(status).toEqual(permissionsStatus.DENIED);
        });

        /* Check if permissions are updated in property mediaLibrary */
        expect(result.current.usePermissions.state).toEqual({
            isPermissionsRequested: false,
            permissions: {
                ...initialPermissionsStateMock.permissions,
                mediaLibrary: permissionsStatus.DENIED
            }
        });
    });

    it('should change status if permission is unavailable', async () => {
        DeviceImageServiceSpy.requestCameraPermission.mockResolvedValueOnce(permissionsStatus.UNAVAILABLE);

        const { result } = renderUsePermissions(mockStore);

        await act(async () => {
            await result.current.usePermissions.askPermission('camera');
        });

        /**
         * Check if premissions is equal to initial state and status
         * is update with respective data
         */
        expect(result.current.usePermissions.state).toEqual({
            ...initialPermissionsStateMock,
            permissions: {
                ...initialPermissionsStateMock.permissions,
                camera: permissionsStatus.UNAVAILABLE
            }
        });

        expect(result.current.useStatus.state).toEqual({
            msg: permissionsMessages.UNSUPPORTED,
            code: 418
        });
    });
});