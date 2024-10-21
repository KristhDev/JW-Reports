import { act } from '@testing-library/react-native';

/* Setups */
import { mockUseNavigation, useNetworkSpy } from '@test-setup';
import { getMockStoreUsePreaching, renderUsePreaching } from '@setups';

/* Mocks */
import {
    initialAuthStateMock,
    initialPreachingStateMock,
    initialStatusStateMock,
    testCredentials,
    wifiMock
} from '@mocks';

/* Modules */
import { authMessages } from '@auth';
import { preachingMessages } from '@preaching';

describe('Test in usePreaching hook - updatePreaching', () => {
    useNetworkSpy.mockImplementation(() => ({
        wifi: wifiMock
    }) as any);

    let mockStoreWithCurrentSelectedDate = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStoreWithCurrentSelectedDate = getMockStoreUsePreaching({
            auth: initialAuthStateMock,
            preaching: {
                ...initialPreachingStateMock,
                selectedDate: new Date()
            },
            status: initialStatusStateMock
        });
    });

    it('should update preaching day successfully', async () => {
        const { result } = renderUsePreaching(mockStoreWithCurrentSelectedDate);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.usePreaching.savePreaching({
                day: new Date(),
                initHour: new Date(),
                finalHour: new Date()
            });
        });

        await act(() => {
            result.current.usePreaching.setSelectedPreaching(result.current.usePreaching.state.preachings[0]);
        });

        await act(async () => {
            await result.current.usePreaching.updatePreaching({
                day: new Date(),
                initHour: new Date(),
                finalHour: new Date()
            });
        });

        /* Check if state is equal to initial state */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: expect.any(Date),
            preachings: [{
                id: expect.any(String),
                userId: result.current.useAuth.state.user.id,
                day: expect.any(String),
                initHour: expect.any(String),
                finalHour: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }],
            seletedPreaching: {
                id: '',
                userId: '',
                day: expect.any(String),
                initHour: expect.any(String),
                finalHour: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

        expect(result.current.usePreaching.state.preachings).toHaveLength(1);

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: preachingMessages.UPDATED_SUCCESS
        });

        /* Check if goBack is called two times */
        expect(mockUseNavigation.goBack).toHaveBeenCalledTimes(2);

        await act(async () => {
            await result.current.usePreaching.deletePreaching();
        });

        await act(async () => {
            await result.current.useAuth.signOut();
        });
    });

    it('should faild when user inst authenticated', async () => {
        const { result } = renderUsePreaching(mockStoreWithCurrentSelectedDate);

        await act(async () => {
            await result.current.usePreaching.updatePreaching({
                day: new Date(),
                initHour: new Date(),
                finalHour: new Date()
            });
        });

        /* Check if state is equal to initial state */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: expect.any(Date)
        });

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });
    });

    it('should faild when selectedPreaching is empty', async () => {
        const { result } = renderUsePreaching(mockStoreWithCurrentSelectedDate);

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });

        await act(async () => {
            await result.current.usePreaching.updatePreaching({
                day: new Date(),
                initHour: new Date(),
                finalHour: new Date()
            });
        });

        /* Check if state is equal to initial state */
        expect(result.current.usePreaching.state).toEqual({
            ...initialPreachingStateMock,
            selectedDate: expect.any(Date)
        });

        /* Check if status state is equal to respective object */
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: preachingMessages.UNSELECTED_UPDATE
        });

        await act(async () => {
            await result.current.useAuth.signIn(testCredentials);
        });
    });
});