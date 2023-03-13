import { AuthState } from '../../src/interfaces/auth';

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

export const initialState: AuthState = {
    isAuthenticated: false,
    isAuthLoading: false,
    token: '',
    user: {
        id: '',
        name: '',
        surname: '',
        email: '',
        precursor: 'ninguno',
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z',
    }
}

export const authenticateState: AuthState = {
    isAuthenticated: true,
    isAuthLoading: false,
    token: '3eb3fd2c-31ad-48c3-ab9b-587a059de40d',
    user: {
        ...newUserData,
        id: '3eb3fd2c-31ad-48c3-ab9b-587a059de40d',
        precursor: 'ninguno',
        createdAt: '2021-08-26T15:00:00.000Z',
        updatedAt: '2021-08-26T15:00:00.000Z',
    }
}