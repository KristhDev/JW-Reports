import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseUI, renderUseUI } from '@setups';

/* Mocks */
import { initialUIState, storageSpy } from '@mocks';

describe('Test in setOldDatetimePicker', () => {
    it('should change property oldDatetimePicker', async () => {
        storageSpy.getItem.mockImplementation();

        const mockStore = getMockStoreUseUI({
            ui: initialUIState
        });

        const { result } = renderUseUI(mockStore);

        expect(result.current.useUI.state.userInterface).toEqual({
            ...initialUIState.userInterface,
            oldDatetimePicker: false
        });

        await act(() => {
            result.current.useUI.setOldDatetimePicker(true);
        });

        expect(result.current.useUI.state.userInterface).toEqual({
            ...result.current.useUI.state.userInterface,
            oldDatetimePicker: true
        });
    });
});