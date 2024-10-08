import { AuthState, User } from '@auth';

export const testUser: User = {
    id: '05ef0d0c-0f7a-4512-b705-6da279d88503',
    name: 'Celestino',
    surname: 'Wilderman',
    email: 'Ernestine_Doyle@yahoo.com',
    precursor: 'ninguno',
    hoursRequirement: 0,
    hoursLDC: false,
    createdAt: '2021-03-10T12:00:00.000Z',
    updatedAt: '2021-03-10T12:00:00.000Z',
}

export const signInMock = jest.fn();
export const signUpMock = jest.fn();
export const updateProfileMock = jest.fn();
export const updateEmailMock = jest.fn();
export const updatePasswordMock = jest.fn().mockImplementation(() => Promise.resolve());
export const resetPasswordMock = jest.fn();

export const testCredentials = {
    email: 'andredev@gmail.com',
    password: 'tutuyoyo9102'
}

export const newUserData = {
    name: 'Tester',
    surname: 'Testing',
    email: 'tester-testing@gmail.com',
    password: 'testing-in-progress-1234'
}

export const initialAuthStateMock: AuthState = {
    isAuthenticated: false,
    isAuthLoading: false,
    token: '',
    user: {
        id: '',
        name: '',
        surname: '',
        email: '',
        precursor: 'ninguno',
        hoursRequirement: 0,
        hoursLDC: false,
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z',
    }
}

export const authenticateStateMock: AuthState = {
    isAuthenticated: true,
    isAuthLoading: false,
    token: '3eb3fd2c-31ad-48c3-ab9b-587a059de40d',
    user: {
        ...newUserData,
        id: '3eb3fd2c-31ad-48c3-ab9b-587a059de40d',
        precursor: 'ninguno',
        hoursRequirement: 0,
        hoursLDC: false,
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z',
    }
}

export const authenticatePrecursorMock: AuthState = {
    isAuthenticated: true,
    isAuthLoading: false,
    token: '3eb3fd2c-31ad-48c3-ab9b-587a059de40d',
    user: {
        ...newUserData,
        id: '3eb3fd2c-31ad-48c3-ab9b-587a059de40d',
        precursor: 'regular',
        hoursRequirement: 50,
        hoursLDC: false,
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z',
    }
}

export const authenticateLDCMock: AuthState = {
    isAuthenticated: true,
    isAuthLoading: false,
    token: '3eb3fd2c-31ad-48c3-ab9b-587a059de40d',
    user: {
        ...newUserData,
        id: '3eb3fd2c-31ad-48c3-ab9b-587a059de40d',
        precursor: 'regular',
        hoursRequirement: 60,
        hoursLDC: true,
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z',
    }
}