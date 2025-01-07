import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseUI, renderUseUI } from '@setups';

/* Mocks */
import { initialUIStateMock } from '@mocks';

describe('Test in setRecordedAudio', () => {
    it('should change property recordedAudio', async () => {
        const mockStore = getMockStoreUseUI({ ui: initialUIStateMock });

        const { result } = renderUseUI(mockStore);

        expect(result.current.useUI.state).toEqual(initialUIStateMock);

        await act(() => {
            result.current.useUI.setRecordedAudio('The recorded audio');
        });

        expect(result.current.useUI.state).toEqual({
            ...result.current.useUI.state,
            recordedAudio: 'The recorded audio'
        });
    });
});