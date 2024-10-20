import { StatusState } from '@application/features';

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

export const networkStateMock: StatusState = {
    code: 500,
    msg: 'Lo sentimos pero no dispones de conexion a Internet. Los datos que hay en la aplicación no son actualizados. Hasta que recuperes la conexión no podras obtener, guardar, editar o eliminar ningún dato.',
}

export const permissionsStatusStateMock: StatusState = {
    code: 400,
    msg: 'Para realizar está acción necesitas permisos del dispositivo, por favor abra la configuración de su dispositivo y active los permisos de la aplicación.'
}