/* Features */
import { PreachingState, INIT_PREACHING } from '@application/features';

/* Entities */
import { PreachingEntity } from '@domain/entities';
import { PreachingReportModel } from '@domain/models';

/* Interfaces */
import { PreachingEndpoint } from '@infrasturcture/interfaces';

/* Hooks */
import * as usePreaching from '@preaching/hooks/usePreaching';

export const usePreachingSpy = jest.spyOn(usePreaching, 'default');

export const loadPreachingsMock = jest.fn();
export const savePreachingMock = jest.fn();
export const setSelectedPreachingMock = jest.fn();
export const updatePreachingMock = jest.fn();

export const preachingEndpointMock: PreachingEndpoint = {
    id: '30da43ce-2440-44d5-a090-466486b9e48f',
    user_id: '01d20ba9-09d3-464d-b57b-22e6ff724739',
    day: '2023-01-12',
    init_hour: '2023-01-12 13:00:00',
    final_hour: '2023-01-12 16:00:00',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
}

export const preachingsMock: PreachingEntity[] = [
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

export const preachingReportsMock: PreachingReportModel[] = [
    {
        hours: 54,
        restMins: 0,
        month: 'Enero',
        year: 2024
    },
    {
        hours: 52,
        restMins: 0,
        month: 'Febrero',
        year: 2024
    },
    {
        hours: 55,
        restMins: 30,
        month: 'Marzo',
        year: 2024
    },
    {
        hours: 51,
        restMins: 20,
        month: 'Abril',
        year: 2024
    },
    {
        hours: 50,
        restMins: 0,
        month: 'Mayo',
        year: 2024
    },
    {
        hours: 54,
        restMins: 0,
        month: 'Junio',
        year: 2024
    }
];

export const initialPreachingStateMock: PreachingState = {
    isPreachingDeleting: false,
    isPreachingLoading: false,
    isPreachingsExporting: false,
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
    isPreachingsExporting: false,
    isPreachingsLoading: false,
    preachings: preachingsMock,
    selectedDate: new Date('2023-01-12 00:00:00'),
    seletedPreaching: preachingsMock[0]
}

export const preachingsStateMock: PreachingState = {
    isPreachingDeleting: false,
    isPreachingLoading: false,
    isPreachingsExporting: false,
    isPreachingsLoading: false,
    preachings: preachingsMock,
    selectedDate: new Date('2023-01-12 00:00:00'),
    seletedPreaching: INIT_PREACHING
}