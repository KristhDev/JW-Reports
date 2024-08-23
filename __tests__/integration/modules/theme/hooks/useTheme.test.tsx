import { act, waitFor } from '@testing-library/react-native';

/* Setup */
import { renderUseTheme } from '../../../../setups';

/* Mocks */
import { darkState, getItemStorageSpy, lightState, setItemStorageSpy } from '../../../../mocks';

/* Utils */
import { storageKeys } from '../../../../../src/utils';

describe('Test in useTheme hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return respective props', async () => {
        const { result } = renderUseTheme();

        await waitFor(() => {
            /* Check properties returned by hook */
            expect(result.current).toEqual({
                state: { ...darkState, selectedTheme: 'default' },
                setTheme: expect.any(Function)
            });
        });
    });

    it('should change theme with setTheme', async () => {
        getItemStorageSpy.mockReturnValue('light');

        const { result } = renderUseTheme();

        await act(async () => {
            await result.current.setTheme('light');
        });

        /* Check if deviceTheme changed */
        expect(result.current.state).toEqual(lightState);

        /* Check if storage.setItem is called with respective args */
        expect(setItemStorageSpy).toHaveBeenCalled();
        expect(setItemStorageSpy).toHaveBeenCalledWith(storageKeys.THEME, 'light');
    });
});