import { StatusState } from '../../src/interfaces';

export const clearStatusMock = jest.fn();
export const setErrorFormMock = jest.fn();
export const setStatusMock = jest.fn();

export const initialStatusStateMock: StatusState = {
    msg: '',
    code: 200
}

export const successStateMock: StatusState = {
    msg: 'Acción realizada con éxito',
    code: 200
}

export const errorStateMock: StatusState = {
    msg: 'Ocurrio un error',
    code: 400
}