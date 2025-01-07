/* Setups */
import { getMockStoreUseUI, renderUseUI } from '@setups';

/* Mocks */
import { initialUIStateMock } from '@mocks';

describe('Test in useUI hook', () => {
    let mockStore = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStore = getMockStoreUseUI({
            ui: initialUIStateMock
        });
    });

    it('should return respective properties and functions', () => {
        const { result } = renderUseUI(mockStore);

        expect(result.current.useUI).toEqual({
            state: initialUIStateMock,

            listenHideKeyboard: expect.any(Function),
            listenShowKeyboard: expect.any(Function),
            setActiveFormField: expect.any(Function),
            setIsDataExporting : expect.any(Function),
            setOldDatetimePicker: expect.any(Function),
            setRecordedAudio: expect.any(Function)
        });
    });
});