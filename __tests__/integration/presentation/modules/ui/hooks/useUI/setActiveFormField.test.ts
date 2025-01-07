import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseUI, renderUseUI } from '@setups';

/* Mocks */
import { initialUIStateMock } from '@mocks';

describe('Test in setActiveFormField', () => {
    it('should change property activeFormField', async () => {
        const mockStore = getMockStoreUseUI({ ui: initialUIStateMock });

        const { result } = renderUseUI(mockStore);

        expect(result.current.useUI.state).toEqual(initialUIStateMock);

        await act(() => {
            result.current.useUI.setActiveFormField('init_day');
        });

        expect(result.current.useUI.state).toEqual({
            ...result.current.useUI.state,
            activeFormField: 'init_day'
        });
    });
});