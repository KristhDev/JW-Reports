import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseUI, renderUseUI } from '@setups';

/* Mocks */
import { initialUIStateMock } from '@mocks';

describe('Test in setOldDatetimePicker', () => {
    it('should change property oldDatetimePicker', async () => {
        const mockStore = getMockStoreUseUI({
            ui: initialUIStateMock
        });

        const { result } = renderUseUI(mockStore);

        expect(result.current.useUI.state.userInterface).toEqual({
            ...initialUIStateMock.userInterface,
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