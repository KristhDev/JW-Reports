/* Setups */
import { getMockStoreUseUI, renderUseUI } from '@setups';

/* Mocks */
import { initialUIState } from '@mocks';

describe('Test in useUI hook', () => {
    let mockStore = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStore = getMockStoreUseUI({
            ui: initialUIState
        });
    });

    it('should return respective properties and functions', () => {
        const { result } = renderUseUI(mockStore);

        expect(result.current.useUI).toEqual({
            state: initialUIState,

            listenHideKeyboard: expect.any(Function),
            listenShowKeyboard: expect.any(Function),
            setOldDatetimePicker: expect.any(Function)
        });
    });
});