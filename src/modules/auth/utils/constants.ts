import { ItemOption } from '@ui';

/**
 * The precursors options to select
 */
export const PRECURSORS_OPTIONS: ItemOption[] = [
    { label: 'Ninguno', value: 'ninguno' },
    { label: 'Auxiliar', value: 'auxiliar' },
    { label: 'Regular', value: 'regular' },
    { label: 'Especial', value: 'especial' }
];

export const authMessages = {
    CONFIRM_PASSWORD_EMPTY: 'La confirmación de la contraseña es requerida.',
    EMAIL_ALREADY_REGISTERED: 'Ya existe un usuario con este correo.',
    EMAIL_EMPTY: 'El correo no puede estar vacío.',
    EMAIL_INVALID: 'Correo electrónico inválido.',
    EMAIL_UPDATE_UNCHANGED: 'Para actualizar tu correo debes cambiarlo.',
    NAME_EMPTY: 'El nombre no puede estar vacío.',
    NAME_MIN_LENGTH: 'El nombre debe tener al menos 2 caracteres.',
    PASSWORD_EMPTY: 'La contraseña no puede estar vacía.',
    PASSWORD_MIN_LENGTH: 'La contraseña debe tener al menos 6 caracteres.',
    PASSWORD_NOT_MATCH: 'Las contraseñas no coinciden.',
    PASSWORD_UPDATED: 'Has actualizado tu contraseña correctamente.',
    PROFILE_UPDATED: 'Has actualizado tu perfil correctamente.',
    SURNAME_EMPTY: 'Los apellidos no pueden estar vacíos.',
    SURNAME_MIN_LENGTH: 'Los apellidos deben tener al menos 2 caracteres.',
    UNATHENTICATED: 'Para realizar esta acción debe iniciar sesión.',
    UNAUTHORIZED: 'No tienes permisos para realizar esta acción.',
}

export const precursorMessages = {
    PRECURSOR_EMPTY: 'El campo precursor es requerido.',
    PRECURSOR_INVALID: 'Por favor seleccione una opción de precursor.',
}