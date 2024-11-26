import { appMessages } from '@application/constants';

export class AppErrors {
    private static readonly pickerCodeErrors = {
        E_CAMERA_IS_NOT_AVAILABLE: 'La camara no está disponible.',
        E_CANNOT_LAUNCH_CAMERA: 'La camara no puede ser lanzada.',
        E_CANNOT_PROCESS_VIDEO: 'El video no puede ser procesado.',
        E_CANNOT_SAVE_IMAGE: 'No se pudo guardar la imagen.',
        E_ERROR_WHILE_CLEANING_FILES: 'Ocurrio un error al limpiar los archivos.',
        E_FAILED_TO_OPEN_CAMERA: 'Ocurrio un error al abrir la camara.',
        E_FAILED_TO_SHOW_PICKER: 'Ocurrio un error al mostrar el picker.',
        E_NO_CAMERA_PERMISSION: 'No se tiene el permiso para acceder a la camara.',
        E_NO_IMAGE_DATA_FOUND: 'La imagen no contiene datos.',
        E_NO_LIBRARY_PERMISSION: 'No se tiene el permiso para acceder a la galería.',
        E_PICKER_CANCELLED: 'El usuario ha cancelado el proceso.',
    }

    private static readonly postgrestCodeErrors = {
        PGRST003: 'La petición ha tardado mucho tiempo en realizarse, por favor vuelva a intentarlo.',
        PGRST100: 'Los parámetros de la petición son inválidos.',
        PGRST102: 'La información de la petición no es válida.',
        PGRST103: 'El rango para la paginación es inválido.',
        PGRST108: 'Se aplico un filtro a un recurso que no se selecciono.',
        PGRST112: 'El código de estado debe ser un entero positivo.',
        PGRST116: 'Se ha devuelto más de un o ningún recurso en una respuesta singular.',
        PGRST300: 'Su tiempo de sesión ha expirado.',
        PGRST301: 'Su tiempo de sesión ha expirado.',
        PGRST302: 'Su tiempo de sesión ha expirado.',
    }

    private static readonly supabaseAuthCodeErrors = {
        'bad_code_verifier': 'El código de autorización es incorrecto.',
        'bad_json': 'El formato de la información no es válido.',
        'bad_jwt': 'Su tiempo de sesión ha expirado.',
        'email_address_not_authorized': 'Este correo electrónico no se encuentra autorizado.',
        'email_conflict_identity_not_deletable': 'El correo electrónico ya se encuentra registrado.',
        'email_exists': 'El correo electrónico ya se encuentra registrado.',
        'email_not_confirmed': 'El correo electrónico no ha sido confirmado.',
        'email_provider_disabled': 'El proveedor de correo electrónico ha sido deshabilitado.',
        'flow_state_expired': 'Su tiempo de sesión ha expirado.',
        'invalid_credentials': 'Las credenciales son inválidas.',
        'no_authorization': 'Debe iniciar sesión para realizar esta acción.',
        'not_admin': 'No se puede realizar está acción',
        'same_password': 'No puede utilizar la contraseña actual como nueva.',
        'session_not_found': 'Su sesión no existe.',
        'sms_send_failed': 'No se pudo enviar el correo de verificación, por favor contacte con el administrador.',
        'user_already_exists': 'El usuario ya existe.',
        'user_banned': 'El usuario ha sido baneado.',
        'user_not_found': 'El usuario no existe.',
        'validation_failed': 'El formato de la información no es válido.',
    }

    private static readonly supabaseStorageCodeErrors = {
        'NoSuchBucket': 'El bucket no existe.',
        'NoSuchKey': appMessages.UNEXPECTED_ERROR,
        'NoSuchUpload': 'El archivo del bucket no existe.',
        'InvalidJWT': 'Su tiempo de sesión ha expirado.',
        'InvalidRequest': 'El formato de la información no es válido.',
        'TenantNotFound': 'El tenant no existe.',
        'EntityTooLarge': 'El archivo es demasiado grande.',
        'InternalError': appMessages.UNEXPECTED_ERROR,
        'ResourceAlreadyExists': 'El archivo ya existe.',
        'InvalidBucketName': 'El bucket no existe.',
        'InvalidKey': appMessages.UNEXPECTED_ERROR,
        'InvalidRange': 'El rango de bytes es inválido.',
        'InvalidMimeType': 'El formato de la información no es válido.',
        'InvalidUploadId': 'El archivo del bucket no existe.',
        'KeyAlreadyExists': appMessages.UNEXPECTED_ERROR,
        'BucketAlreadyExists': 'El bucket ya existe.',
        'DatabaseTimeout': appMessages.UNEXPECTED_ERROR,
        'InvalidSignature': 'El formato de la información no es válido.',
        'SignatureDoesNotMatch': 'El formato de la información no es válido.',
        'AccessDenied': 'Su tiempo de sesión ha expirado.',
        'ResourceLocked': 'El archivo del bucket no existe.',
        'DatabaseError': appMessages.UNEXPECTED_ERROR,
        'MissingContentLength': 'El campo Content-Length es requerido.',
        'MissingParameter': 'Falta un parámetro.',
        'InvalidUploadSignature': 'El formato de la información no es válido.',
        'LockTimeout': 'El archivo del bucket no existe.',
        'S3Error': appMessages.UNEXPECTED_ERROR,
        'S3InvalidAccessKeyId': appMessages.UNEXPECTED_ERROR,
        'S3MaximumCredentialsLimit': appMessages.UNEXPECTED_ERROR,
        'InvalidChecksum': appMessages.UNEXPECTED_ERROR,
        'MissingPart': 'Falta un parámetro.',
        'SlowDown': 'Su tiempo de sesión ha expirado.',
    }

    private static readonly voiceRecorderErrorMessages = {
        '7/No match': 'Por favor hable de forma clara y sin ruido para copiar el texto.',
        "11/Didn't understand, please try again.": 'Por favor hable de forma clara y sin ruido para copiar el texto.'
    }

    /**
     * Returns a user friendly error message from a given error code.
     *
     * @param {string} code - The error code.
     * @returns {string} A user friendly error message.
     */
    public static getMessageFromCode(code: string): string {
        return (this.supabaseAuthCodeErrors as any)[code]  ||
        (this.supabaseStorageCodeErrors as any)[code] ||
        (this.postgrestCodeErrors as any)[code] ||
        (this.pickerCodeErrors as any)[code] ||
        appMessages.UNEXPECTED_ERROR;
    }

    /**
     * Translates a given error message to a user-friendly message.
     *
     * @param {string} message - The error message to translate.
     * @returns {string} A user-friendly error message or a default unexpected error message.
     */
    public static translateMessage(message: string): string {
        return (this.voiceRecorderErrorMessages as any)[message] ||
        appMessages.UNEXPECTED_ERROR;
    }
}