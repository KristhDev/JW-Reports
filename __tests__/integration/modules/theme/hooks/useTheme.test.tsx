import { act, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Setup */
import { renderUseTheme } from '../../../../setups';

/* Mocks */
import { darkState, lightState } from '../../../../mocks';

/* Utils */
import { asyncStorageKeys } from '../../../../../src/utils';

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
        (AsyncStorage.getItem as jest.Mock).mockResolvedValue('light');

        const { result } = renderUseTheme();

        await act(async () => {
            await result.current.setTheme('light');
        });

        /* Check if deviceTheme changed */
        expect(result.current.state).toEqual(lightState);

        /* Check if AsyncStorage.setItem is called with respective args */
        expect(AsyncStorage.setItem).toHaveBeenCalled();
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(asyncStorageKeys.THEME, 'light');
    });
});