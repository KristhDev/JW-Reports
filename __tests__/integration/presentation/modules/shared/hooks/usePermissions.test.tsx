import { act } from '@testing-library/react-native';
import { request } from 'react-native-permissions';

/* Setup */
import { getMockStoreUsePermissions, renderUsePermissions } from '@setups';

/* Mocks */
import { grantedStateMock, initialPermissionsStateMock, initialStatusStateMock } from '@mocks';

/* Constants */
import { permissionsMessages } from '@application/constants';

/* Shared */
import { permissionsStatus } from '@shared';

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
            checkPermissions: expect.any(Function),
            askPermission: expect.any(Function),
        });
    });

    it('should getPermissions - checkPermissions', async () => {
        const { result } = renderUsePermissions(mockStore);

        await act(async () => {
            await result.current.usePermissions.checkPermissions();
        });

        /* Check if permissions are updated */
        expect(result.current.usePermissions.state).toEqual(grantedStateMock);
    });

    it('should getPermission - askPermission', async () => {
        (request as jest.Mock).mockResolvedValue(permissionsStatus.DENIED);

        const { result } = renderUsePermissions(mockStore);

        await act(async () => {
            const status = await result.current.usePermissions.askPermission('readExternalStorage');
            expect(status).toEqual(permissionsStatus.DENIED);
        });

        /* Check if permissions are updated in property mediaLibrary */
        expect(result.current.usePermissions.state).toEqual({
            permissions: {
                ...initialPermissionsStateMock.permissions,
                readExternalStorage: 'denied'
            }
        });
    });

    it('should change status if permission is unavailable', async () => {
        (request as jest.Mock).mockResolvedValue(permissionsStatus.UNAVAILABLE);

        const { result } = renderUsePermissions(mockStore);

        await act(async () => {
            await result.current.usePermissions.askPermission('camera');
        });

        /**
         * Check if premissions is equal to initial state and status
         * is update with respective data
         */
        expect(result.current.usePermissions.state).toEqual(initialPermissionsStateMock);
        expect(result.current.useStatus.state).toEqual({
            msg: permissionsMessages.UNSUPPORTED,
            code: 418
        });
    });
});