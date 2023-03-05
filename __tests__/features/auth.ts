import { AuthState } from '../../src/interfaces/auth';

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