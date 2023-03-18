import { act } from '@testing-library/react-native';

import { initialState as authInitState } from '../../features/auth';
import { initialState as preachingInitState } from '../../features/preaching';
import { initialState as statusInitState } from '../../features/status';

import { getMockStore, render } from './setup';

describe('Test usePreaching hook setSelectedDate', () => {
    it('should change respective property', async () => {
        const mockStore = getMockStore({ auth: authInitState, preaching: preachingInitState, status: statusInitState });
        const { result } = render(mockStore);

        await act(async () => {
            await result.current.usePreaching.setSelectedDate(new Date('2023-03-17'));
        });

        expect(result.current.usePreaching.state).toEqual({
            ...preachingInitState,
            selectedDate: new Date('2023-03-17')
        });
    });
});