import { User } from '../../src/interfaces';

export const testUser: User = {
    id: '05ef0d0c-0f7a-4512-b705-6da279d88503',
    name: 'Celestino',
    surname: 'Wilderman',
    email: 'Ernestine_Doyle@yahoo.com',
    precursor: 'ninguno',
    hoursRequirement: 0,
    createdAt: '2021-03-10T12:00:00.000Z',
    updatedAt: '2021-03-10T12:00:00.000Z',
}

export const signInMock = jest.fn();
export const signUpMock = jest.fn();
export const updateProfileMock = jest.fn();
export const updateEmailMock = jest.fn();
export const updatePasswordMock = jest.fn().mockImplementation(() => Promise.resolve());
export const resetPasswordMock = jest.fn();