import { INIT_PREACHING } from '../../src/features';
import { Preaching, PreachingState } from '../../src/interfaces';

export const savePreachingMock = jest.fn();
export const updatePreachingMock = jest.fn();
export const setSelectedPreachingMock = jest.fn();

export const preachingsMock: Preaching[] = [
    {
        id: 'f6b249e2-e329-4c40-96b0-b719f268a37d',
        userId: '8c840151-c4b4-4baa-9bb0-c9e50c7d6f63',
        day: '2023-01-12 00:00:00',
        initHour: '2023-01-12 13:00:00',
        finalHour: '2023-01-12 16:00:00',
        createdAt: '2023-01-12 22:21:10.01713',
        updatedAt: '2023-01-12 22:21:10.01713'
    },
    {
        id: 'f6b249e2-e329-4c40-96b0-b719f268a37d',
        userId: '9db13626-3bf5-40a5-be38-dce661a86920',
        day: '2023-01-12 00:00:00',
        initHour: '2023-01-12 13:00:00',
        finalHour: '2023-01-12 16:00:00',
        createdAt: '2023-01-12 22:21:10.01713',
        updatedAt: '2023-01-12 22:21:10.01713'
    },
    {
        id: 'f6b249e2-e329-4c40-96b0-b719f268a37d',
        userId: '9db13626-3bf5-40a5-be38-dce661a86920',
        day: '2023-01-12 00:00:00',
        initHour: '2023-01-12 13:00:00',
        finalHour: '2023-01-12 16:00:00',
        createdAt: '2023-01-12 22:21:10.01713',
        updatedAt: '2023-01-12 22:21:10.01713'
    },
    {
        id: 'f6b249e2-e329-4c40-96b0-b719f268a37d',
        userId: '9db13626-3bf5-40a5-be38-dce661a86920',
        day: '2023-01-12 00:00:00',
        initHour: '2023-01-12 13:00:00',
        finalHour: '2023-01-12 16:00:00',
        createdAt: '2023-01-12 22:21:10.01713',
        updatedAt: '2023-01-12 22:21:10.01713'
    },
    {
        id: 'f6b249e2-e329-4c40-96b0-b719f268a37d',
        userId: '9db13626-3bf5-40a5-be38-dce661a86920',
        day: '2023-01-12 00:00:00',
        initHour: '2023-01-12 13:00:00',
        finalHour: '2023-01-12 16:00:00',
        createdAt: '2023-01-12 22:21:10.01713',
        updatedAt: '2023-01-12 22:21:10.01713'
    },
    {
        id: 'f6b249e2-e329-4c40-96b0-b719f268a37d',
        userId: '9db13626-3bf5-40a5-be38-dce661a86920',
        day: '2023-01-12 00:00:00',
        initHour: '2023-01-12 13:00:00',
        finalHour: '2023-01-12 16:00:00',
        createdAt: '2023-01-12 22:21:10.01713',
        updatedAt: '2023-01-12 22:21:10.01713'
    },
    {
        id: 'f6b249e2-e329-4c40-96b0-b719f268a37d',
        userId: '9db13626-3bf5-40a5-be38-dce661a86920',
        day: '2023-01-12 00:00:00',
        initHour: '2023-01-12 13:00:00',
        finalHour: '2023-01-12 16:00:00',
        createdAt: '2023-01-12 22:21:10.01713',
        updatedAt: '2023-01-12 22:21:10.01713'
    },
    {
        id: 'f6b249e2-e329-4c40-96b0-b719f268a37d',
        userId: '9db13626-3bf5-40a5-be38-dce661a86920',
        day: '2023-01-12 00:00:00',
        initHour: '2023-01-12 13:00:00',
        finalHour: '2023-01-12 16:00:00',
        createdAt: '2023-01-12 22:21:10.01713',
        updatedAt: '2023-01-12 22:21:10.01713'
    },
    {
        id: 'f6b249e2-e329-4c40-96b0-b719f268a37d',
        userId: '9db13626-3bf5-40a5-be38-dce661a86920',
        day: '2023-01-12 00:00:00',
        initHour: '2023-01-12 13:00:00',
        finalHour: '2023-01-12 16:00:00',
        createdAt: '2023-01-12 22:21:10.01713',
        updatedAt: '2023-01-12 22:21:10.01713'
    },
    {
        id: 'f6b249e2-e329-4c40-96b0-b719f268a37d',
        userId: '9db13626-3bf5-40a5-be38-dce661a86920',
        day: '2023-01-12 00:00:00',
        initHour: '2023-01-12 13:00:00',
        finalHour: '2023-01-12 16:00:00',
        createdAt: '2023-01-12 22:21:10.01713',
        updatedAt: '2023-01-12 22:21:10.01713'
    },
    {
        id: 'f6b249e2-e329-4c40-96b0-b719f268a37d',
        userId: '9db13626-3bf5-40a5-be38-dce661a86920',
        day: '2023-01-12 00:00:00',
        initHour: '2023-01-12 13:00:00',
        finalHour: '2023-01-12 16:00:00',
        createdAt: '2023-01-12 22:21:10.01713',
        updatedAt: '2023-01-12 22:21:10.01713'
    }
];

export const initialPreachingStateMock: PreachingState = {
    isPreachingDeleting: false,
    isPreachingLoading: false,
    isPreachingsLoading: false,
    preachings: [],
    selectedDate: new Date('2023-03-17'),
    seletedPreaching: {
        ...INIT_PREACHING,
        day: '2023-03-17',
        initHour: '2023-03-17 13:00:00',
        finalHour: '2023-03-17 16:00:00',
        createdAt: '2023-03-17 22:21:10.01713',
        updatedAt: '2023-03-17 22:21:10.01713'
    }
}

export const preachingSelectedStateMock: PreachingState = {
    isPreachingDeleting: false,
    isPreachingLoading: false,
    isPreachingsLoading: false,
    preachings: preachingsMock,
    selectedDate: new Date('2023-01-12 00:00:00'),
    seletedPreaching: preachingsMock[0]
}

export const preachingsStateMock: PreachingState = {
    isPreachingDeleting: false,
    isPreachingLoading: false,
    isPreachingsLoading: false,
    preachings: preachingsMock,
    selectedDate: new Date('2023-01-12 00:00:00'),
    seletedPreaching: INIT_PREACHING
}