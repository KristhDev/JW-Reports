import { StatusState } from '../../src/interfaces/status';

export const initialState: StatusState = {
    msg: '',
    code: 200
}

export const successState: StatusState = {
    msg: 'Acción realizada con éxito',
    code: 200
}

export const errorState: StatusState = {
    msg: 'Ocurrio un error',
    code: 400
}