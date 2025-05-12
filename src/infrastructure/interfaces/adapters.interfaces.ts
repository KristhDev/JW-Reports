import { fileEncodings } from '@application/constants/utils';

/**
 * Interface representing the options for moving a file from InternalStorage to ExternalStorage.
 * 
 * @property {string} filePath - The path to the file in InternalStorage.
 * @property {string} mimeType - The MIME type of the file.
 */
export interface MoveFileOptions {
    filePath: string;
    mimeType: string;
}

/**
 * Type representing the valid encoding values that can be used in InternalStorage.
 * This type is derived from the encodings object defined in InternalStorage.
 * 
 * @type {string} - The encoding value (e.g., 'utf8', 'ascii', etc.)
 */
export type EncodingValue = (typeof fileEncodings)[keyof typeof fileEncodings];

/**
 * Interface representing the options for renaming a file in InternalStorage.
 * 
 * @property {string} newName - The new name for the file.
 * @property {string} oldName - The old name of the file.
 * @property {string} path - The path to the directory where the file is located.
 */
export interface RenameOptions {
    newName: string;
    oldName: string;
    path: string;
}

/**
 * Interface representing the options for writing a PDF from HTML in PDF.
 * 
 * @property {string} fileName - The name of the PDF file.
 * @property {string} html - The HTML content to be converted to PDF.
 * @property {number} width - The width of the PDF page (optional).
 */
export interface WriteFromHtmlOptions {
    fileName: string;
    html: string;
    width?: number;
}

export type LocaleValue = 'en' | 'es';

export interface Formats {
    DATE_ONLY: string;
    DAY: string;
    HOURS_MINUTES: string;
    HOURS: string;
    LOCALE_LONG_DATE: string;
    LOCALE_SHORT_DATE: string;
    MINUTES: string;
    MONTH_NAME: string;
    SQL_DATETIME: string;
}

export interface ExpoMessages {
    picker: {
        E_CAMERA_IS_NOT_AVAILABLE: string;
        E_CANNOT_LAUNCH_CAMERA: string;
        E_CANNOT_PROCESS_VIDEO: string;
        E_CANNOT_SAVE_IMAGE: string;
        E_ERROR_WHILE_CLEANING_FILES: string;
        E_FAILED_TO_OPEN_CAMERA: string;
        E_FAILED_TO_SHOW_PICKER: string;
        E_NO_CAMERA_PERMISSION: string;
        E_NO_IMAGE_DATA_FOUND: string;
        E_NO_LIBRARY_PERMISSION: string;
        E_PICKER_CANCELLED: string;
    },

    voiceRecorder: {
        aborted: string;
        'audio-capture': string;
        'bad-grammar': string;
        busy: string;
        'language-not-supported': string;
        network: string;
        'no-speech': string;
        'not-allowed': string;
        'speech-timeout': string;
    },
}

export interface SupabaseMessages {
    auth: {
        'bad_code_verifier': string;
        'bad_json': string;
        'bad_jwt': string;
        'email_address_not_authorized': string;
        'email_conflict_identity_not_deletable': string;
        'email_exists': string;
        'email_not_confirmed': string;
        'email_provider_disabled': string;
        'flow_state_expired': string;
        'invalid_credentials': string;
        'no_authorization': string;
        'not_admin': string;
        'same_password': string;
        'session_not_found': string;
        'sms_send_failed': string;
        'user_already_exists': string;
        'user_banned': string;
        'user_not_found': string;
        'validation_failed': string;
    },

    postgres: {
        'PGRST003': string;
        'PGRST100': string;
        'PGRST102': string;
        'PGRST103': string;
        'PGRST108': string;
        'PGRST112': string;
        'PGRST116': string;
        'PGRST300': string;
        'PGRST301': string;
        'PGRST302': string;
    },

    storage: {
        'NoSuchBucket': string;
        'NoSuchUpload': string;
        'InvalidJWT': string;
        'InvalidRequest': string;
        'TenantNotFound': string;
        'EntityTooLarge': string;
        'ResourceAlreadyExists': string;
        'InvalidBucketName': string;
        'InvalidRange': string;
        'InvalidMimeType': string;
        'InvalidUploadId': string;
        'BucketAlreadyExists': string;
        'InvalidSignature': string;
        'SignatureDoesNotMatch': string;
        'AccessDenied': string;
        'ResourceLocked': string;
        'MissingContentLength': string;
        'MissingParameter': string;
        'InvalidUploadSignature': string;
        'LockTimeout': string;
        'MissingPart': string;
        'SlowDown': string;
    },
}