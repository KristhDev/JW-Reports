import { PRECURSORS_OPTIONS } from '@application/constants/utils/auth.util';

import { TranslationAdapterContract } from '@domain/contracts/adapters';

import { MessagesServiceContract } from '@domain/contracts/services';

import { AppMessages, AuthMessages, CoursesMessages, EmailMessages, LessonsMessages, NetworkMessages, PermissionsMessages, PreachingMessages, PrecursorMessages, RevisitsMessages } from '@infrastructure/interfaces';

export class MessagesService implements MessagesServiceContract {
    constructor(
        private readonly translationAdapter: TranslationAdapterContract
    ) { }

    public get appMessages(): AppMessages {
        return {
            DATA_EXPORTED_SUCCESS: 'Todos sus datos han sido exportados correctamente. Los archivos se encuentran en la carpeta que ha seleccionado.',
            UNEXPECTED_ERROR: 'Ocurrio un error inesperado, por favor intentelo de nuevo.'
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
                attribute: this.translationAdapter.translate('forms.fields.password')
            }),

            PROFILE_UPDATED: this.translationAdapter.translate('messages.success.updated', {
                attribute: this.translationAdapter.translate('forms.fields.profile')
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
            EXPORTED_SUCCESS: 'Has exportado tus cursos correctamente. El archivo se encuentra en la carpeta que ha seleccionado.',

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

            UNSELECTED_FINISH_OR_START: 'No pudes terminar o comenzar de nuevo un curso suspendido.',

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

            FINISHED: 'No puedes suspender o renovar un curso terminado.',
            SUSPENDED_SUCCESS: 'Has suspendido el curso correctamente.',
            RENEW_SUCCESS: 'Has renovado el curso correctamente.',

            DELETED_SUCCESS: this.translationAdapter.translate('messages.success.deleted', {
                attribute: this.translationAdapter.translate('forms.fields.course'),
                article: 'el',
            }),

            FINISHED_SUCCESS: 'Has terminado el curso correctamente.',
            RESTARTED_SUCCESS: 'Has comenzado de nuevo el curso correctamente.',

            ADDED_SUCCESS: this.translationAdapter.translate('messages.success.added', {
                attribute: this.translationAdapter.translate('forms.fields.course'),
                article: 'el',
            }),

            UPDATED_SUCCESS: 'Has actualizado el curso correctamente.',
        }
    }

    public get emailMessages(): EmailMessages {
        return {
            FEEDBACK_FAILED: 'Ocurrio un error al enviar su sugerencia, por favor intentelo de nuevo.',
            FEEDBACK_SUCCESS: '¡Gracias por compartir su sugerencia!',
            MESSAGE_MIN_LENGTH: 'El mensaje debe tener al menos 10 caracteres.',
            MESSAGE_REQUIRED: 'El mensaje no puede estar vacío.',
            REPORT_ERROR_FAILED: 'Ocurrio un error al informar de este error, por favor intentelo de nuevo.',
            REPORT_ERROR_SUCCESS: 'Gracias por informar de este error, se revisará a la brevedad para solucionarlo y se le notificará cuando se resuelva.'
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

            DESCRIPTION_MIN_LENGTH: 'El contenido de la clase debe tener al menos 10 caracteres.',

            DESCRIPTION_REQUIRED: this.translationAdapter.translate('forms.validations.required', {
                article: 'El',
                attribute: this.translationAdapter.translate('forms.fields.description'),
                required: 'requerido'
            }),

            FINISHED_SUCCESS: 'Has terminado la clase correctamente.',
            NEXT_LESSON_REQUIRED: 'La fecha de la próxima clase no puede estar vacía.',
            RESTARTED_SUCCESS: 'Has reprogrado la clase correctamente.',
            SUSPENDED_OR_FINISHED: 'No pudes terminar o reprogramar de nuevo una clase de un curso suspendido o terminado.',

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

            UPDATED_SUCCESS: 'Has actualizado la clase correctamente.'
        }
    }

    public get networkMessages(): NetworkMessages {
        return {
            WIFI_HASNT_CONNEC_EXPLAIN: 'Lo sentimos pero no dispone de conexion a Internet. Los datos que hay en la aplicación no son actualizados. Hasta que recupere la conexión no podrá obtener, guardar, editar o eliminar ningún dato.',
            WIFI_HASNT_CONNECTION: 'Lo sentimos pero no dispone de conexión a Internet.'
        }
    }

    public get permissionsMessages(): PermissionsMessages {
        return {
            FILE_EXPORT_DENIED: 'Permiso denegado para exportar el archivo.',
            REQUEST: 'Para realizar esta acción necesita permisos del dispositivo, por favor abra la configuración de su dispositivo y active los permisos de la aplicación.',
            UNSUPPORTED: 'Lo sentimos pero su dispositivo no soporta esta funcionalidad.'
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

            EXPORTED_SUCCESS: 'Ha exportado sus informaciones de predicación correctamente. El archivo se encuentra en la carpeta que ha seleccionado.',
            FINAL_HOUR_REQUIRED: 'La hora final no puede estar vacía.',
            INIT_HOUR_GREATER_THAN_FINAL: 'La hora inicial no puede ser mayor que la hora final.',
            INIT_HOUR_REQUIRED: 'La hora inicial no puede estar vacía.',
            MONTHLY_HOURS_REQUIRED_DONE: '¡Excelente! has cumplido con tu requerimiento de horas por mes.',

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

            UPDATED_SUCCESS: 'Ha actualizado el día de predicación correctamente.',
            WEEKLY_HOURS_REQUIRED_DONE: '¡Excelente! ha cumplido con su requerimiento de horas por semana.'
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
                values: PRECURSORS_OPTIONS.map(({ label }) => label).join(', ')
            }),
        }
    }

    public get revisitsMessages(): RevisitsMessages {
        return {
            ABOUT_MIN_LENGTH: 'La información de la persona debe tener al menos 10 caracteres.',

            ABOUT_REQUIRED: this.translationAdapter.translate('forms.validations.required', {
                article: 'La',
                attribute: this.translationAdapter.translate('forms.fields.personAbout'),
                required: 'requerida'
            }),

            ADDED_SUCCESS: this.translationAdapter.translate('messages.success.added', {
                attribute: this.translationAdapter.translate('forms.fields.revisit'),
                article: 'la',
            }),

            ADDRESS_MIN_LENGTH: 'La dirección debe tener al menos 10 caracteres.',
            ADDRESS_REQUIRED: 'La dirección es requerida.',
            COMPLETED_SUCCESS: 'Ha marcado como completa su revisita correctamente.',

            DELETED_SUCCESS: this.translationAdapter.translate('messages.success.deleted', {
                attribute: this.translationAdapter.translate('forms.fields.revisit'),
                article: 'la',
            }),

            EXPORTED_SUCCESS: 'Ha exportado sus revisitas correctamente. El archivo se encuentra en la carpeta que ha seleccionado.',
            NEXT_VISIT_REQUIRED: 'La fecha de la último visita no puede estar vacía.',
            PERSON_MIN_LENGTH: 'El nombre de la persona debe tener al menos 2 caracteres.',
            PERSON_NAME_REQUIRED: 'El nombre de la persona es requerido.',

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

            UPDATED_SUCCESS: 'Ha actualizado la revisita correctamente.',
        }
    }
}
