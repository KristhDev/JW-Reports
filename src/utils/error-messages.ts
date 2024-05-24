export const authErrorMessages = {
    'Invalid login credentials': 'Las credenciales no son válidas.',
    'Unable to validate email address: invalid format': 'El formato del correo electrónico no es válido.',
    'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres.',
    'Invalid Refresh Token: Refresh Token Not Found': 'Su tiempo de sesión ha expirado.',
    'Invalid Refresh Token: Already Used': 'Su tiempo de sesión ha expirado.',
    'A user with this email address has already been registered': 'Ya existe un usuario con este correo electrónico.',
    'Auth session missing!': 'Para realizar está acción debes iniciar sesión.',
    'Password recovery requires an email': 'La recuperación de contraseña requiere un correo electrónico.',
    'For security purposes, you can only request this once every 60 seconds': 'Para evitar problemas de seguridad, solo puede realizar esta solicitud una vez cada 60 segundos.'
}

export const commonErrorMessages = {
    'Network request failed': 'Lo sentimos pero no dispones de conexión a internet.',
    'FetchError: Network request failed': 'Lo sentimos pero no dispones de conexión a internet.'
}

/**
 * Translates an error message to its corresponding value in the authErrorMessages or commonErrorMessages objects.
 * If the message is not found in either object, it returns a default error message.
 *
 * @param {string} message - The error message to be translated.
 * @return {string} The translated error message or the default error message.
 */
export const translateErrorMsg = (message: string) => {
    return (authErrorMessages as any)[message]
        || (commonErrorMessages as any)[message]
        || 'Ocurrió un error al realizar está acción, por favor vuelvalo a intentar.';
}