import { PermissionStatus } from 'react-native-permissions';

export const reportErrorDefaultImgs = {
    dark: require('@assets/shared/report-error-dark.png'),
    light: require('@assets/shared/report-error-light.png')
}

export const permissionsMessages = {
    REQUEST: 'Para realizar esta acción necesitas permisos del dispositivo, por favor abra la configuración de su dispositivo y active los permisos de la aplicación.',
    UNSUPPORTED: 'Lo sentimos pero su dispositivo no soporta esta funcionalidad.',
}

export const permissionsStatus: Record<'BLOCKED' | 'LIMITED' | 'GRANTED' | 'DENIED' | 'UNAVAILABLE', PermissionStatus> = {
    BLOCKED: 'blocked',
    LIMITED: 'limited',
    GRANTED: 'granted',
    DENIED: 'denied',
    UNAVAILABLE: 'unavailable',
}

export const emailMessages = {
    FEEDBACK_FAILED: 'Ocurrio un error al enviar su sugerencia, por favor intentelo de nuevo.',
    FEEDBACK_SUCCESS: '¡Gracias por compartir su sugerencia!',
    REPORT_ERROR_FAILED: 'Ocurrio un error al informar de este error, por favor intentelo de nuevo.',
    REPORT_ERROR_SUCCESS: 'Gracias por informar de este error, se revisará a la brevedad para solucionarlo y se le notificará cuando se resuelva.',
}

export const networkMessages = {
    WIFI_HASNT_CONNECTION: 'Lo sentimos pero no dispones de conexion a Internet. Los datos que hay en la aplicación no son actualizados. Hasta que recuperes la conexión no podras obtener, guardar, editar o eliminar ningún dato.',
}