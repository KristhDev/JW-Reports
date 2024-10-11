export class AppErrors {
    public static supabaseAuthErrors = {
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

    public static supabaseCommonErrors = {
        'Network request failed': 'Lo sentimos pero no dispones de conexión a internet.',
        'FetchError: Network request failed': 'Lo sentimos pero no dispones de conexión a internet.'
    }

    public static translateMsg = (message: string): string => {
        return (AppErrors.supabaseAuthErrors as any)[message] ||
            (AppErrors.supabaseCommonErrors as any)[message] ||
            'Ocurrió un error al realizar está acción, por favor vuelvalo a intentar.';
    }
}

export class EmailError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EmailError';
    }
}

export class ImageError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ImageError';
    }
}