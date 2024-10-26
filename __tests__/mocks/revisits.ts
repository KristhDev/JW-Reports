/* Features */
import { RevisitsState, INIT_REVISIT } from '@application/features';

/* Entities */
import { RevisitEntity } from '@domain/entities';

/* Interfaces */
import { RevisitEndpoint } from '@infrasturcture/interfaces';

export const completeRevisitMock = jest.fn();
export const deleteRevisitMock = jest.fn();
export const loadLastRevisitMock = jest.fn();
export const loadRevisitsMock = jest.fn();
export const onDeleteMock = jest.fn();
export const onPassMock = jest.fn();
export const onRevisitMock = jest.fn();
export const removeRevisitsMock = jest.fn();
export const saveRevisitMock = jest.fn();
export const setRefreshRevisitsMock = jest.fn();
export const setRevisitsPaginationMock = jest.fn();
export const setSelectedRevisitMock = jest.fn();
export const updateRevisitMock = jest.fn();

export const testRevisit = {
    about: 'Itaque quidem enim neque laudantium ducimus nesciunt provident consequuntur.',
    address: 'Ut non et similique aliquam quaerat consequatur iste ut quod.',
    nextVisit: new Date('2023-03-20T00:00:00.000Z'),
    personName: 'Karlee Senger'
}

export const revisitEndpointMock: RevisitEndpoint = {
    id: '7a2b0714-7baf-4761-aebb-199a906cb21e',
    user_id: '74b07b68-46ac-473e-8aff-99b4ec2e9400',
    person_name: 'Karlee Senger',
    about: 'Itaque quidem enim neque laudantium ducimus nesciunt provident consequuntur.',
    address: 'Ut non et similique aliquam quaerat consequatur iste ut quod.',
    done: false,
    next_visit: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
}

export const revisitsMock: RevisitEntity[] = [
    {
        id: '7345fc2b-b5d3-4000-ba17-a85ae1d5a85d',
        userId: '39d71118-57b7-4c4a-8643-0956e5f9350e',
        personName: 'Dariana Hand',
        about: 'Ratione quae debitis pariatur tempora magnam est voluptatibus. Eveniet ipsum omnis maxime et soluta iusto. Autem aut ducimus dolore et recusandae et inventore. Enim autem in hic optio.',
        address: 'Voluptatem ratione velit officia qui non ab aut atque. Voluptate possimus dolor ex commodi aut numquam voluptatem sit. Molestiae ut tempora unde sapiente. Soluta culpa repellat et voluptatibus odit eveniet dolore harum.',
        done: false,
        nextVisit: '2021-12-10T00:00:00.000Z',
        createdAt: '2021-12-10T00:00:00.000Z',
        updatedAt: '2021-12-10T00:00:00.000Z'
    },
    {
        id: '0d48444f-93eb-46d1-ab92-ed75893bd84d',
        userId: '39d71118-57b7-4c4a-8643-0956e5f9350e',
        personName: 'Dariana Hand',
        about: 'Ratione quae debitis pariatur tempora magnam est voluptatibus. Eveniet ipsum omnis maxime et soluta iusto. Autem aut ducimus dolore et recusandae et inventore. Enim autem in hic optio.',
        address: 'Voluptatem ratione velit officia qui non ab aut atque. Voluptate possimus dolor ex commodi aut numquam voluptatem sit. Molestiae ut tempora unde sapiente. Soluta culpa repellat et voluptatibus odit eveniet dolore harum.',
        done: false,
        nextVisit: '2021-12-10T00:00:00.000Z',
        createdAt: '2021-12-10T00:00:00.000Z',
        updatedAt: '2021-12-10T00:00:00.000Z'
    },
    {
        id: 'fcbc1dca-0d97-493c-974d-df65069b5f97',
        userId: '39d71118-57b7-4c4a-8643-0956e5f9350e',
        personName: 'Dariana Hand',
        about: 'Ratione quae debitis pariatur tempora magnam est voluptatibus. Eveniet ipsum omnis maxime et soluta iusto. Autem aut ducimus dolore et recusandae et inventore. Enim autem in hic optio.',
        address: 'Voluptatem ratione velit officia qui non ab aut atque. Voluptate possimus dolor ex commodi aut numquam voluptatem sit. Molestiae ut tempora unde sapiente. Soluta culpa repellat et voluptatibus odit eveniet dolore harum.',
        done: false,
        nextVisit: '2021-12-10T00:00:00.000Z',
        createdAt: '2021-12-10T00:00:00.000Z',
        updatedAt: '2021-12-10T00:00:00.000Z'
    },
    {
        id: '24d9bbf8-dafd-4e95-96f7-246b3bd3c4e8',
        userId: '39d71118-57b7-4c4a-8643-0956e5f9350e',
        personName: 'Dariana Hand',
        about: 'Ratione quae debitis pariatur tempora magnam est voluptatibus. Eveniet ipsum omnis maxime et soluta iusto. Autem aut ducimus dolore et recusandae et inventore. Enim autem in hic optio.',
        address: 'Voluptatem ratione velit officia qui non ab aut atque. Voluptate possimus dolor ex commodi aut numquam voluptatem sit. Molestiae ut tempora unde sapiente. Soluta culpa repellat et voluptatibus odit eveniet dolore harum.',
        done: false,
        nextVisit: '2021-12-10T00:00:00.000Z',
        createdAt: '2021-12-10T00:00:00.000Z',
        updatedAt: '2021-12-10T00:00:00.000Z'
    },
    {
        id: 'a9274022-5367-4396-87c7-3e68cd7a2334',
        userId: '39d71118-57b7-4c4a-8643-0956e5f9350e',
        personName: 'Dariana Hand',
        about: 'Ratione quae debitis pariatur tempora magnam est voluptatibus. Eveniet ipsum omnis maxime et soluta iusto. Autem aut ducimus dolore et recusandae et inventore. Enim autem in hic optio.',
        address: 'Voluptatem ratione velit officia qui non ab aut atque. Voluptate possimus dolor ex commodi aut numquam voluptatem sit. Molestiae ut tempora unde sapiente. Soluta culpa repellat et voluptatibus odit eveniet dolore harum.',
        done: false,
        nextVisit: '2021-12-10T00:00:00.000Z',
        createdAt: '2021-12-10T00:00:00.000Z',
        updatedAt: '2021-12-10T00:00:00.000Z'
    },
    {
        id: '5bbcdb1f-c2c1-40e1-9a06-f07c28711479',
        userId: '39d71118-57b7-4c4a-8643-0956e5f9350e',
        personName: 'Dariana Hand',
        about: 'Ratione quae debitis pariatur tempora magnam est voluptatibus. Eveniet ipsum omnis maxime et soluta iusto. Autem aut ducimus dolore et recusandae et inventore. Enim autem in hic optio.',
        address: 'Voluptatem ratione velit officia qui non ab aut atque. Voluptate possimus dolor ex commodi aut numquam voluptatem sit. Molestiae ut tempora unde sapiente. Soluta culpa repellat et voluptatibus odit eveniet dolore harum.',
        done: false,
        nextVisit: '2021-12-10T00:00:00.000Z',
        createdAt: '2021-12-10T00:00:00.000Z',
        updatedAt: '2021-12-10T00:00:00.000Z'
    },
    {
        id: '38007bef-ee92-4062-bb13-c269fb6d7bfa',
        userId: '39d71118-57b7-4c4a-8643-0956e5f9350e',
        personName: 'Dariana Hand',
        about: 'Ratione quae debitis pariatur tempora magnam est voluptatibus. Eveniet ipsum omnis maxime et soluta iusto. Autem aut ducimus dolore et recusandae et inventore. Enim autem in hic optio.',
        address: 'Voluptatem ratione velit officia qui non ab aut atque. Voluptate possimus dolor ex commodi aut numquam voluptatem sit. Molestiae ut tempora unde sapiente. Soluta culpa repellat et voluptatibus odit eveniet dolore harum.',
        done: false,
        nextVisit: '2021-12-10T00:00:00.000Z',
        createdAt: '2021-12-10T00:00:00.000Z',
        updatedAt: '2021-12-10T00:00:00.000Z'
    },
    {
        id: '1d0a72b8-cf2a-4136-b4db-e4538d2e877a',
        userId: '39d71118-57b7-4c4a-8643-0956e5f9350e',
        personName: 'Dariana Hand',
        about: 'Ratione quae debitis pariatur tempora magnam est voluptatibus. Eveniet ipsum omnis maxime et soluta iusto. Autem aut ducimus dolore et recusandae et inventore. Enim autem in hic optio.',
        address: 'Voluptatem ratione velit officia qui non ab aut atque. Voluptate possimus dolor ex commodi aut numquam voluptatem sit. Molestiae ut tempora unde sapiente. Soluta culpa repellat et voluptatibus odit eveniet dolore harum.',
        done: false,
        nextVisit: '2021-12-10T00:00:00.000Z',
        createdAt: '2021-12-10T00:00:00.000Z',
        updatedAt: '2021-12-10T00:00:00.000Z'
    },
    {
        id: 'f3d84fc8-f064-412a-81d5-538f9228f2f7',
        userId: '39d71118-57b7-4c4a-8643-0956e5f9350e',
        personName: 'Dariana Hand',
        about: 'Ratione quae debitis pariatur tempora magnam est voluptatibus. Eveniet ipsum omnis maxime et soluta iusto. Autem aut ducimus dolore et recusandae et inventore. Enim autem in hic optio.',
        address: 'Voluptatem ratione velit officia qui non ab aut atque. Voluptate possimus dolor ex commodi aut numquam voluptatem sit. Molestiae ut tempora unde sapiente. Soluta culpa repellat et voluptatibus odit eveniet dolore harum.',
        done: false,
        nextVisit: '2021-12-10T00:00:00.000Z',
        createdAt: '2021-12-10T00:00:00.000Z',
        updatedAt: '2021-12-10T00:00:00.000Z'
    },
    {
        id: '2e67ba8f-deb9-4a7b-8f1a-e1351df52f7e',
        userId: '39d71118-57b7-4c4a-8643-0956e5f9350e',
        personName: 'Dariana Hand',
        about: 'Ratione quae debitis pariatur tempora magnam est voluptatibus. Eveniet ipsum omnis maxime et soluta iusto. Autem aut ducimus dolore et recusandae et inventore. Enim autem in hic optio.',
        address: 'Voluptatem ratione velit officia qui non ab aut atque. Voluptate possimus dolor ex commodi aut numquam voluptatem sit. Molestiae ut tempora unde sapiente. Soluta culpa repellat et voluptatibus odit eveniet dolore harum.',
        done: false,
        nextVisit: '2021-12-10T00:00:00.000Z',
        createdAt: '2021-12-10T00:00:00.000Z',
        updatedAt: '2021-12-10T00:00:00.000Z'
    },
    {
        id: '7e8c4963-126d-4657-a1c6-ea8028152198',
        userId: '39d71118-57b7-4c4a-8643-0956e5f9350e',
        personName: 'Dariana Hand',
        about: 'Ratione quae debitis pariatur tempora magnam est voluptatibus. Eveniet ipsum omnis maxime et soluta iusto. Autem aut ducimus dolore et recusandae et inventore. Enim autem in hic optio.',
        address: 'Voluptatem ratione velit officia qui non ab aut atque. Voluptate possimus dolor ex commodi aut numquam voluptatem sit. Molestiae ut tempora unde sapiente. Soluta culpa repellat et voluptatibus odit eveniet dolore harum.',
        done: false,
        nextVisit: '2021-12-10T00:00:00.000Z',
        createdAt: '2021-12-10T00:00:00.000Z',
        updatedAt: '2021-12-10T00:00:00.000Z'
    }
];

export const initialRevisitsStateMock: RevisitsState = {
    hasMoreRevisits: true,
    isRevisitDeleting: false,
    isRevisitLoading: false,
    isRevisitsLoading: false,
    isLastRevisitLoading: false,
    refreshRevisits: false,
    revisitFilter: 'all',
    revisits: [],
    revisitsPagination: {
        from: 0,
        to: 9
    },
    revisitsScreenHistory: [],
    selectedRevisit: {
        ...INIT_REVISIT,
        nextVisit: '2023-03-19',
        createdAt: '2023-03-19T00:00:00.000Z',
        updatedAt: '2023-03-19T00:00:00.000Z'
    },
    lastRevisit: {
        ...INIT_REVISIT,
        nextVisit: '2023-03-19',
        createdAt: '2023-03-19T00:00:00.000Z',
        updatedAt: '2023-03-19T00:00:00.000Z'
    }
}

export const lastRevisitStateMock: RevisitsState = {
    hasMoreRevisits: true,
    isLastRevisitLoading: false,
    isRevisitDeleting: false,
    isRevisitLoading: false,
    isRevisitsLoading: false,
    refreshRevisits: false,
    revisitFilter: 'all',
    revisits: [],
    revisitsPagination: {
        from: 10,
        to: 19,
    },
    revisitsScreenHistory: [],
    selectedRevisit: INIT_REVISIT,
    lastRevisit: revisitsMock[0]
}

export const revisitsStateMock: RevisitsState = {
    hasMoreRevisits: true,
    isLastRevisitLoading: false,
    isRevisitDeleting: false,
    isRevisitLoading: false,
    isRevisitsLoading: false,
    refreshRevisits: false,
    revisitFilter: 'all',
    revisits: revisitsMock,
    revisitsPagination: {
        from: 10,
        to: 19,
    },
    revisitsScreenHistory: [],
    selectedRevisit: INIT_REVISIT,
    lastRevisit: INIT_REVISIT
}

export const selectedRevisitStateMock: RevisitsState = {
    hasMoreRevisits: true,
    isRevisitDeleting: false,
    isRevisitLoading: false,
    isLastRevisitLoading: false,
    isRevisitsLoading: false,
    refreshRevisits: false,
    revisitFilter: 'all',
    revisits: revisitsMock,
    revisitsPagination: {
        from: 10,
        to: 19,
    },
    revisitsScreenHistory: [],
    selectedRevisit: revisitsMock[0],
    lastRevisit: INIT_REVISIT
}