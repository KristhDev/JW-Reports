import { TranslationAdapterContract } from '@domain/contracts/adapters';

import { MessagesServiceContract, PublisherServiceContract } from '@domain/contracts/services';

import { 
    AppMessages,
    AuthMessages,
    CoursesMessages,
    EmailMessages,
    ExpoMessages,
    LessonsMessages,
    NetworkMessages,
    PermissionsMessages,
    PreachingMessages,
    PrecursorMessages,
    RevisitsMessages,
    SupabaseMessages
} from '@infrastructure/interfaces';

export class MessagesService implements MessagesServiceContract {
    constructor(
        private readonly translationAdapter: TranslationAdapterContract,
        private readonly publisherService: PublisherServiceContract
    ) { }

    public get appMessages(): AppMessages {
        return {
            DATA_EXPORTED_SUCCESS: this.translationAdapter.translate('messages.success.dataExported'),
            SELECT_FIELD_TO_RECORD: this.translationAdapter.translate('messages.selectFieldToRecord'),
            UNEXPECTED_ERROR: this.translationAdapter.translate('messages.errors.unexpectedError'),
        }
    }

    public get authMessages(): AuthMessages {
        return {
            CONFIRM_PASSWORD_EMPTY: this.translationAdapter.translate('forms.validations.empty', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.confirmPassword'),
                empty: 'vacía'
            }),

            EMAIL_ALREADY_REGISTERED: this.translationAdapter.translate('forms.validations.email.exists'),

            EMAIL_EMPTY: this.translationAdapter.translate('forms.validations.empty', {
                article: 'El',
                attribute: this.translationAdapter.translate('forms.fields.email'),
                empty: 'vacío'
            }),

            EMAIL_INVALID: this.translationAdapter.translate('forms.validations.email.invalid', {
                article: 'El',
                attribute: this.translationAdapter.translate('forms.fields.email')
            }),

            EMAIL_UPDATE_UNCHANGED: this.translationAdapter.translate('forms.validations.unchanged', {
                attribute: this.translationAdapter.translate('forms.fields.email')
            }),

            NAME_EMPTY: this.translationAdapter.translate('forms.validations.empty', {
                article: 'El',
                attribute: this.translationAdapter.translate('forms.fields.name'),
                empty: 'vacío'
            }),

            NAME_MIN_LENGTH: this.translationAdapter.translate('forms.validations.min', {
                article: 'El',
                attribute: this.translationAdapter.translate('forms.fields.name'),
                min: 2
            }),

            PASSWORD_EMPTY: this.translationAdapter.translate('forms.validations.empty', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.password'),
                empty: 'vacía'
            }),

            PASSWORD_MIN_LENGTH: this.translationAdapter.translate('forms.validations.min', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.password'),
                min: 6
            }),

            PASSWORD_NOT_MATCH: this.translationAdapter.translate('forms.validations.password.mismatch'),

            PASSWORD_UPDATED: this.translationAdapter.translate('messages.success.updated', {
                attribute: this.translationAdapter.translate('forms.fields.password'),
                article: 'la',
            }),

            PROFILE_UPDATED: this.translationAdapter.translate('messages.success.updated', {
                attribute: this.translationAdapter.translate('forms.fields.profile'),
                article: 'su',
            }),

            SURNAME_EMPTY: this.translationAdapter.translate('forms.validations.empty', {
                article: 'Los',
                attribute: this.translationAdapter.translate('forms.fields.surname'),
                empty: 'vacíos'
            }),

            SURNAME_MIN_LENGTH: this.translationAdapter.translate('forms.validations.min', {
                article: 'Los',
                attribute: this.translationAdapter.translate('forms.fields.surname'),
                min: 2
            }),

            UNAUTHENTICATED: this.translationAdapter.translate('messages.errors.unauthenticated'),
            UNAUTHORIZED: this.translationAdapter.translate('messages.errors.unauthorized'),
        }
    }

    public get coursesMessages(): CoursesMessages {
        return {
            EXPORTED_SUCCESS: this.translationAdapter.translate('messages.courses.coursesExported'),

            PERSON_NAME_REQUIRED: this.translationAdapter.translate('forms.validations.required', {
                article: 'El',
                attribute: this.translationAdapter.translate('forms.fields.personName'),
                required: 'requerido'
            }),

            PERSON_NAME_MIN_LENGTH: this.translationAdapter.translate('forms.validations.min', {
                article: 'El',
                attribute: this.translationAdapter.translate('forms.fields.personName'),
                min: 2
            }),

            PERSON_ABOUT_REQUIRED: this.translationAdapter.translate('forms.validations.required', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.personAbout'),
                required: 'requerida'
            }),

            PERSON_ABOUT_MIN_LENGTH: this.translationAdapter.translate('forms.validations.min', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.personAbout'),
                min: 10
            }),

            PERSON_ADDRESS_REQUIRED: this.translationAdapter.translate('forms.validations.required', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.address'),
                required: 'requerida'
            }),

            PERSON_ADDRESS_MIN_LENGTH: this.translationAdapter.translate('forms.validations.min', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.address'),
                min: 10
            }),

            PUBLICATION_REQUIRED: this.translationAdapter.translate('forms.validations.empty', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.publication'),
                empty: 'vacía'
            }),

            PUBLICATION_MIN_LENGTH: this.translationAdapter.translate('forms.validations.min', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.publication'),
                min: 5
            }),

            UNSELECTED: this.translationAdapter.translate('messages.errors.unSelected.empty', {
                attribute: this.translationAdapter.translate('forms.fields.course'),
                article: 'un',
                genderEnding: 'o'
            }),

            UNSUSPENDED_FINISH_OR_START: this.translationAdapter.translate('messages.courses.unSuspendedFinishOrStart'),

            UNSELECTED_DELETE: this.translationAdapter.translate('messages.errors.unSelected.deleted', {
                attribute: this.translationAdapter.translate('forms.fields.course'),
                article: 'un',
                genderEnding: 'o'
            }),

            UNSELECTED_UPDATE: this.translationAdapter.translate('messages.errors.unSelected.updated', {
                attribute: this.translationAdapter.translate('forms.fields.course'),
                article: 'un',
                genderEnding: 'o'
            }),

            FINISHED: this.translationAdapter.translate('messages.courses.finishedSuspendOrRestart'),
            SUSPENDED_SUCCESS: this.translationAdapter.translate('messages.courses.suspended'),

            RENEW_SUCCESS: this.translationAdapter.translate('messages.success.renewed', {
                attribute: this.translationAdapter.translate('forms.fields.course'),
                article: 'el',
            }),

            DELETED_SUCCESS: this.translationAdapter.translate('messages.success.deleted', {
                attribute: this.translationAdapter.translate('forms.fields.course'),
                article: 'el',
            }),

            FINISHED_SUCCESS: this.translationAdapter.translate('messages.success.finished', {
                attribute: this.translationAdapter.translate('forms.fields.course'),
                article: 'el',
            }),

            RESTARTED_SUCCESS: this.translationAdapter.translate('messages.success.startedAgain', {
                attribute: this.translationAdapter.translate('forms.fields.course'),
                article: 'el',
            }),

            ADDED_SUCCESS: this.translationAdapter.translate('messages.success.added', {
                attribute: this.translationAdapter.translate('forms.fields.course'),
                article: 'el',
            }),

            UPDATED_SUCCESS: this.translationAdapter.translate('messages.success.updated', {
                attribute: this.translationAdapter.translate('forms.fields.course'),
                article: 'el',
            }),

            WRITE_STUDY_PUBLICATION: this.translationAdapter.translate('forms.validations.courses.writeStudyPublication'),
        }
    }

    public get emailMessages(): EmailMessages {
        return {
            FEEDBACK_FAILED: this.translationAdapter.translate('messages.email.feedbackFailed'),
            FEEDBACK_SUCCESS: this.translationAdapter.translate('messages.email.feedbackSuccess'),

            MESSAGE_MIN_LENGTH: this.translationAdapter.translate('forms.validations.min', {
                article: 'El',
                attribute: this.translationAdapter.translate('forms.fields.message'),
                min: 10
            }),

            MESSAGE_REQUIRED: this.translationAdapter.translate('forms.validations.empty', {
                article: 'El',
                attribute: this.translationAdapter.translate('forms.fields.message'),
                empty: 'vací́o'
            }),

            REPORT_ERROR_FAILED: this.translationAdapter.translate('messages.email.reportErrorFailed'),
            REPORT_ERROR_SUCCESS: this.translationAdapter.translate('messages.email.reportErrorSuccess'),
        }
    }

    public get expoMessages(): ExpoMessages {
        return {
            picker: {
                E_CAMERA_IS_NOT_AVAILABLE: this.translationAdapter.translate('expo.errors.picker.cameraIsNotAvailable'),
                E_CANNOT_LAUNCH_CAMERA: this.translationAdapter.translate('expo.errors.picker.cannotLaunchCamera'),
                E_CANNOT_PROCESS_VIDEO: this.translationAdapter.translate('expo.errors.picker.cannotProcessVideo'),
                E_CANNOT_SAVE_IMAGE: this.translationAdapter.translate('expo.errors.picker.cannotSaveImage'),
                E_ERROR_WHILE_CLEANING_FILES: this.translationAdapter.translate('expo.errors.picker.errorWhileCleaningFiles'),
                E_FAILED_TO_OPEN_CAMERA: this.translationAdapter.translate('expo.errors.picker.failedToOpenCamera'),
                E_FAILED_TO_SHOW_PICKER: this.translationAdapter.translate('expo.errors.picker.failedToShowPicker'),
                E_NO_CAMERA_PERMISSION: this.translationAdapter.translate('expo.errors.picker.noCameraPermission'),
                E_NO_IMAGE_DATA_FOUND: this.translationAdapter.translate('expo.errors.picker.noImageDataFound'),
                E_NO_LIBRARY_PERMISSION: this.translationAdapter.translate('expo.errors.picker.noLibraryPermission'),
                E_PICKER_CANCELLED: this.translationAdapter.translate('expo.errors.picker.pickerCancelled'),
            },

            voiceRecorder: {
                aborted: this.translationAdapter.translate('expo.errors.voiceRecorder.aborted'),
                'audio-capture': this.translationAdapter.translate('expo.errors.voiceRecorder.audioCapture'),
                'bad-grammar': this.translationAdapter.translate('expo.errors.voiceRecorder.badGrammar'),
                busy: this.translationAdapter.translate('expo.errors.voiceRecorder.busy'),
                'language-not-supported': this.translationAdapter.translate('expo.errors.voiceRecorder.languageNotSupported'),
                network: this.translationAdapter.translate('expo.errors.voiceRecorder.network'),
                'no-speech': this.translationAdapter.translate('expo.errors.voiceRecorder.noSpeech'),
                'not-allowed': this.translationAdapter.translate('expo.errors.voiceRecorder.notAllowed'),
                'speech-timeout': this.translationAdapter.translate('expo.errors.voiceRecorder.speechTimeout'),
            },
        }
    }

    public get lessonsMessages(): LessonsMessages {
        return {
            ADDED_SUCCESS: this.translationAdapter.translate('messages.success.added', {
                attribute: this.translationAdapter.translate('forms.fields.lesson'),
                article: 'la',
            }),

            DELETED_SUCCESS: this.translationAdapter.translate('messages.success.deleted', {
                attribute: this.translationAdapter.translate('forms.fields.lesson'),
                article: 'la',
            }),

            DESCRIPTION_MIN_LENGTH: this.translationAdapter.translate('forms.validations.min', {
                article: 'El',
                attribute: this.translationAdapter.translate('forms.fields.contentLesson'),
                min: 10
            }),

            DESCRIPTION_REQUIRED: this.translationAdapter.translate('forms.validations.required', {
                article: 'El',
                attribute: this.translationAdapter.translate('forms.fields.description'),
                required: 'requerido'
            }),

            FINISHED_SUCCESS: this.translationAdapter.translate('messages.success.finished', {
                attribute: this.translationAdapter.translate('forms.fields.lesson'),
                article: 'la',
            }),

            NEXT_LESSON_REQUIRED: this.translationAdapter.translate('forms.validations.empty', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.nextLessonDate'),
                empty: 'vacía'
            }),

            REPROGRAMMED_SUCCESS: this.translationAdapter.translate('messages.success.reprogrammed', {
                attribute: this.translationAdapter.translate('forms.fields.lesson'),
                article: 'la',
            }),

            SUSPENDED_OR_FINISHED: this.translationAdapter.translate('forms.validations.lessons.suspendedOrFinished'),

            UNSELECTED_DELETE: this.translationAdapter.translate('messages.errors.unSelected.deleted', {
                attribute: this.translationAdapter.translate('forms.fields.lesson'),
                article: 'una',
                genderEnding: 'a'
            }),

            UNSELECTED_UPDATE: this.translationAdapter.translate('messages.errors.unSelected.updated', {
                attribute: this.translationAdapter.translate('forms.fields.lesson'),
                article: 'una',
                genderEnding: 'a'
            }),

            UNSELECTED: this.translationAdapter.translate('messages.errors.unSelected.empty', {
                attribute: this.translationAdapter.translate('forms.fields.lesson'),
                article: 'una',
                genderEnding: 'a'
            }),

            UPDATED_SUCCESS: this.translationAdapter.translate('messages.success.updated', {
                attribute: this.translationAdapter.translate('forms.fields.lesson'),
                article: 'la',
            })
        }
    }

    public get networkMessages(): NetworkMessages {
        return {
            WIFI_HASNT_CONNEC_EXPLAIN: this.translationAdapter.translate('messages.network.hasntWifiConnectionExplain'),
            WIFI_HASNT_CONNECTION: this.translationAdapter.translate('messages.network.hasntWifiConnection')
        }
    }

    public get permissionsMessages(): PermissionsMessages {
        return {
            FILE_EXPORT_DENIED: this.translationAdapter.translate('messages.permissions.fileExportDenied'),
            REQUEST: this.translationAdapter.translate('messages.permissions.request'),
            UNSUPPORTED: this.translationAdapter.translate('messages.permissions.unsupported')
        }
    }

    public get preachingMessages(): PreachingMessages {
        return {
            ADDED_SUCCESS: this.translationAdapter.translate('messages.success.added', {
                attribute: this.translationAdapter.translate('forms.fields.preachingDay'),
                article: 'el',
            }),

            DAY_REQUIRED: this.translationAdapter.translate('forms.validations.empty', {
                article: 'El',
                attribute: this.translationAdapter.translate('forms.fields.day'),
                required: 'vací́o'
            }),

            DELETED_SUCCESS: this.translationAdapter.translate('messages.success.deleted', {
                attribute: this.translationAdapter.translate('forms.fields.preachingDay'),
                article: 'el',
            }),

            EXPORTED_SUCCESS: this.translationAdapter.translate('messages.preaching.reportExported'),

            FINAL_HOUR_REQUIRED: this.translationAdapter.translate('forms.validations.empty', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.finalHour'),
                required: 'vací́a'
            }),

            INIT_HOUR_GREATER_THAN_FINAL: this.translationAdapter.translate('forms.validations.lessThan', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.initHour'),
                min: this.translationAdapter.translate('forms.fields.finalHour'),
                minArticle: 'la'
            }),

            INIT_HOUR_REQUIRED: this.translationAdapter.translate('forms.validations.empty', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.initHour'),
                required: 'vací́a'
            }),

            MONTHLY_HOURS_REQUIRED_DONE: this.translationAdapter.translate('messages.preaching.monthlyHoursDone'),

            UNSELECTED_DELETE: this.translationAdapter.translate('messages.errors.unSelected.deleted', {
                attribute: this.translationAdapter.translate('forms.fields.preachingDay'),
                article: 'un',
                genderEnding: 'o'
            }),

            UNSELECTED_UPDATE: this.translationAdapter.translate('messages.errors.unSelected.updated', {
                attribute: this.translationAdapter.translate('forms.fields.preachingDay'),
                article: 'un',
                genderEnding: 'o'
            }),

            UPDATED_SUCCESS: this.translationAdapter.translate('messages.success.updated', {
                attribute: this.translationAdapter.translate('forms.fields.preachingDay'),
                article: 'el',
            }),

            WEEKLY_HOURS_REQUIRED_DONE: this.translationAdapter.translate('messages.preaching.weeklyHoursDone')
        }
    }

    public get precursorMessages(): PrecursorMessages {
        return {
            PRECURSOR_EMPTY: this.translationAdapter.translate('forms.validations.empty', {
                article: 'El',
                attribute: this.translationAdapter.translate('forms.fields.pioner'),
                empty: 'vacío'
            }),

            PRECURSOR_INVALID: this.translationAdapter.translate('forms.validations.enum', {
                article: 'El',
                attribute: this.translationAdapter.translate('forms.fields.pioner'),
                values: this.publisherService.PRECURSORS_OPTIONS.map(({ label }) => label).join(', ')
            }),
        }
    }

    public get revisitsMessages(): RevisitsMessages {
        return {
            ABOUT_MIN_LENGTH: this.translationAdapter.translate('forms.validations.min', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.personAbout'),
                min: 10
            }),

            ABOUT_REQUIRED: this.translationAdapter.translate('forms.validations.required', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.personAbout'),
                required: 'requerida'
            }),

            ADDED_SUCCESS: this.translationAdapter.translate('messages.success.added', {
                attribute: this.translationAdapter.translate('forms.fields.revisit'),
                article: 'la',
            }),

            ADDRESS_MIN_LENGTH: this.translationAdapter.translate('forms.validations.min', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.address'),
                min: 10
            }),

            ADDRESS_REQUIRED: this.translationAdapter.translate('forms.validations.required', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.address'),
                required: 'requerida'
            }),

            COMPLETED_SUCCESS: this.translationAdapter.translate('messages.courses.completed'),

            DELETED_SUCCESS: this.translationAdapter.translate('messages.success.deleted', {
                attribute: this.translationAdapter.translate('forms.fields.revisit'),
                article: 'la',
            }),

            EXPORTED_SUCCESS: this.translationAdapter.translate('messages.revisits.revisitsExported'),

            NEXT_VISIT_REQUIRED: this.translationAdapter.translate('forms.validations.empty', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.lastVisitDate'),
                required: 'vacía'
            }),

            PERSON_NAME_MIN_LENGTH: this.translationAdapter.translate('forms.validations.min', {
                article: 'El',
                attribute: this.translationAdapter.translate('forms.fields.personName'),
                min: 2
            }),

            PERSON_NAME_REQUIRED: this.translationAdapter.translate('forms.validations.required', {
                article: 'El',
                attribute: this.translationAdapter.translate('forms.fields.personName'),
                required: 'requerido'
            }),

            UNSELECTED_COMPLETE: this.translationAdapter.translate('messages.errors.unSelected.completed', {
                attribute: this.translationAdapter.translate('forms.fields.revisit'),
                article: 'una',
                genderEnding: 'a'
            }),

            UNSELECTED_DELETE: this.translationAdapter.translate('messages.errors.unSelected.deleted', {
                attribute: this.translationAdapter.translate('forms.fields.revisit'),
                article: 'una',
                genderEnding: 'a'
            }),

            UNSELECTED_UPDATE: this.translationAdapter.translate('messages.errors.unSelected.updated', {
                attribute: this.translationAdapter.translate('forms.fields.revisit'),
                article: 'una',
                genderEnding: 'a'
            }),

            UPDATED_SUCCESS: this.translationAdapter.translate('messages.success.updated', {
                attribute: this.translationAdapter.translate('forms.fields.revisit'),
                article: 'la',
            }),
        }
    }

    public get supabaseMessages(): SupabaseMessages {
        return {
            auth: {
                'bad_code_verifier': this.translationAdapter.translate('supabase.errors.auth.badCodeVerifier'),
                'bad_json': this.translationAdapter.translate('supabase.errors.auth.badJson'),
                'bad_jwt': this.translationAdapter.translate('supabase.errors.auth.badJwt'),
                'email_address_not_authorized': this.translationAdapter.translate('supabase.errors.auth.emailAddressNotAuthorized'),
                'email_conflict_identity_not_deletable': this.translationAdapter.translate('supabase.errors.auth.emailConflictIdentityNotDeletable'),
                'email_exists': this.translationAdapter.translate('supabase.errors.auth.emailExists'),
                'email_not_confirmed': this.translationAdapter.translate('supabase.errors.auth.emailNotConfirmed'),
                'email_provider_disabled': this.translationAdapter.translate('supabase.errors.auth.emailProviderDisabled'),
                'flow_state_expired': this.translationAdapter.translate('supabase.errors.auth.flowStateExpired'),
                'invalid_credentials': this.translationAdapter.translate('supabase.errors.auth.invalidCredentials'),
                'no_authorization': this.translationAdapter.translate('supabase.errors.auth.noAuthorization'),
                'not_admin': this.translationAdapter.translate('supabase.errors.auth.notAdmin'),
                'same_password': this.translationAdapter.translate('supabase.errors.auth.samePassword'),
                'session_not_found': this.translationAdapter.translate('supabase.errors.auth.sessionNotFound'),
                'sms_send_failed': this.translationAdapter.translate('supabase.errors.auth.smsSendFailed'),
                'user_already_exists': this.translationAdapter.translate('supabase.errors.auth.userAlreadyExists'),
                'user_banned': this.translationAdapter.translate('supabase.errors.auth.userBanned'),
                'user_not_found': this.translationAdapter.translate('supabase.errors.auth.userNotFound'),
                'validation_failed': this.translationAdapter.translate('supabase.errors.auth.validationFailed'),
            },

            postgres: {
                'PGRST003': this.translationAdapter.translate('supabase.errors.postgres.pgrst003'),
                'PGRST100': this.translationAdapter.translate('supabase.errors.postgres.pgrst100'),
                'PGRST102': this.translationAdapter.translate('supabase.errors.postgres.pgrst102'),
                'PGRST103': this.translationAdapter.translate('supabase.errors.postgres.pgrst103'),
                'PGRST108': this.translationAdapter.translate('supabase.errors.postgres.pgrst108'),
                'PGRST112': this.translationAdapter.translate('supabase.errors.postgres.pgrst112'),
                'PGRST116': this.translationAdapter.translate('supabase.errors.postgres.pgrst116'),
                'PGRST300': this.translationAdapter.translate('supabase.errors.postgres.pgrst300'),
                'PGRST301': this.translationAdapter.translate('supabase.errors.postgres.pgrst301'),
                'PGRST302': this.translationAdapter.translate('supabase.errors.postgres.pgrst302'),
            },

            storage: {
                'NoSuchBucket': this.translationAdapter.translate('supabase.errors.storage.noSuchBucket'),
                'NoSuchUpload': this.translationAdapter.translate('supabase.errors.storage.noSuchUpload'),
                'InvalidJWT': this.translationAdapter.translate('supabase.errors.storage.invalidJWT'),
                'InvalidRequest': this.translationAdapter.translate('supabase.errors.storage.invalidRequest'),
                'TenantNotFound': this.translationAdapter.translate('supabase.errors.storage.tenantNotFound'),
                'EntityTooLarge': this.translationAdapter.translate('supabase.errors.storage.entityTooLarge'),
                'ResourceAlreadyExists': this.translationAdapter.translate('supabase.errors.storage.resourceAlreadyExists'),
                'InvalidBucketName': this.translationAdapter.translate('supabase.errors.storage.invalidBucketName'),
                'InvalidRange': this.translationAdapter.translate('supabase.errors.storage.invalidRange'),
                'InvalidMimeType': this.translationAdapter.translate('supabase.errors.storage.invalidMimeType'),
                'InvalidUploadId': this.translationAdapter.translate('supabase.errors.storage.invalidUploadId'),
                'BucketAlreadyExists': this.translationAdapter.translate('supabase.errors.storage.bucketAlreadyExists'),
                'InvalidSignature': this.translationAdapter.translate('supabase.errors.storage.invalidSignature'),
                'SignatureDoesNotMatch': this.translationAdapter.translate('supabase.errors.storage.signatureDoesNotMatch'),
                'AccessDenied': this.translationAdapter.translate('supabase.errors.storage.accessDenied'),
                'ResourceLocked': this.translationAdapter.translate('supabase.errors.storage.resourceLocked'),
                'MissingContentLength': this.translationAdapter.translate('supabase.errors.storage.missingContentLength'),
                'MissingParameter': this.translationAdapter.translate('supabase.errors.storage.missingParameter'),
                'InvalidUploadSignature': this.translationAdapter.translate('supabase.errors.storage.invalidUploadSignature'),
                'LockTimeout': this.translationAdapter.translate('supabase.errors.storage.lockTimeout'),
                'MissingPart': this.translationAdapter.translate('supabase.errors.storage.missingPart'),
                'SlowDown': this.translationAdapter.translate('supabase.errors.storage.slowDown'),
            }
        }
    }
}
