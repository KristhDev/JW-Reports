import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseUI, renderUseUI } from '@setups';

/* Mocks */
import { initialUIStateMock } from '@mocks';

describe('Test in setIsDataExporting', () => {
    it('should change property isDataExporting', async () => {
        const mockStore = getMockStoreUseUI({ ui: initialUIStateMock });

        const { result } = renderUseUI(mockStore);

        expect(result.current.useUI.state).toEqual(initialUIStateMock);

        await act(() => {
            result.current.useUI.setIsDataExporting(true);
        });

        expect(result.current.useUI.state).toEqual({
            ...result.current.useUI.state,
            isDataExporting: true
        });

        await act(() => {
            result.current.useUI.setIsDataExporting(false)
        });

        expect(result.current.useUI.state).toEqual({
            ...result.current.useUI.state,
            isDataExporting: false
        });
    });
});