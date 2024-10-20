export class AppErrors {
    public static supabaseAuthCodeErrors = {
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

    public static translateMsg = (code: string): string => {
        return (AppErrors.supabaseAuthCodeErrors as any)[code]  ||
        'Ocurrió un error al realizar está acción, por favor vuelvalo a intentar.';
    }
}