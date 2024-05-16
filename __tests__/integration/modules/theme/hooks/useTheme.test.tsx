import { act, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Setup */
import { renderUseTheme } from '../../../../setups';

/* Mocks */
import { darkState } from '../../../../mocks';

/* Theme */
import { lightTheme } from '../../../../../src/modules/theme';

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
                state: darkState,
                setTheme: expect.any(Function)
            });
        });
    });

    it('should change theme with setTheme', async () => {
        const { result } = renderUseTheme();

        await act(async () => {
            await result.current.setTheme('light');
        });

        /* Check if deviceTheme changed */
        expect(result.current.state).toEqual(lightTheme);

        /* Check if AsyncStorage.setItem is called with respective args */
        expect(AsyncStorage.setItem).toHaveBeenCalled();
        expect(AsyncStorage.setItem).toHaveBeenCalledWith(asyncStorageKeys.THEME, 'light');
    });
});