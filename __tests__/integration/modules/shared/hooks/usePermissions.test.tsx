import { act } from '@testing-library/react-native';
import { request } from 'react-native-permissions';

/* Setup */
import { getMockStoreUsePermissions, renderUsePermissions } from '../../../../setups';

/* Mocks */
import { grantedStateMock, initialPermissionsStateMock, initialStatusStateMock } from '../../../../mocks';

const mockStore = getMockStoreUsePermissions({ permissions: initialPermissionsStateMock, status: initialStatusStateMock });

describe('Test in usePermissions hook', () => {
    it('should return respective props', () => {
        const { result } = renderUsePermissions(mockStore);

        /* Check if hook return respective properties */
        expect(result.current.usePermissions).toEqual({
            state: initialPermissionsStateMock,
            checkPermissions: expect.any(Function),
            askPermission: expect.any(Function),
        });
    });

    it('should getPermissions with checkPermissions', async () => {
        const { result } = renderUsePermissions(mockStore);

        await act(async () => {
            await result.current.usePermissions.checkPermissions();
        });

        /* Check if permissions are updated */
        expect(result.current.usePermissions.state).toEqual(grantedStateMock);
    });

    it('should getPermission with askPermission', async () => {
        (request as jest.Mock).mockResolvedValue('denied');

        const { result } = renderUsePermissions(mockStore);

        await act(async () => {
            await result.current.usePermissions.askPermission('mediaLibrary');
        });

        /* Check if permissions are updated in property mediaLibrary */
        expect(result.current.usePermissions.state).toEqual({
            permissions: {
                ...initialPermissionsStateMock.permissions,
                mediaLibrary: 'denied'
            }
        });
    });

    it('should change status when permission is unavailable', async () => {
        (request as jest.Mock).mockResolvedValue('unavailable');

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
            msg: 'Lo sentimos pero su dispositivo no soporta está funcionalidad.',
            code: 418
        });
    });
});