import { TranslationAdapter } from '@infrastructure/adapters/translation.adapter';

export const coursesPlaceholders = {
    PERSON_NAME: TranslationAdapter.translate('forms.placeholders.typeThe', {
        attribute: TranslationAdapter.translate('forms.fields.name'),
        article: 'el'
    }),

    PERSON_ADDRESS: TranslationAdapter.translate('forms.placeholders.typeThe', {
        attribute: TranslationAdapter.translate('forms.fields.address'),
        article: 'la'
    }),

    PERSON_ABOUT: TranslationAdapter.translate('forms.placeholders.personAbout'),

    PUBLICATION: TranslationAdapter.translate('forms.placeholders.typeThe', {
        attribute: TranslationAdapter.translate('forms.fields.publication'),
        article: 'la'
    })
}

export const coursesMessages = {
    EXPORTED_SUCCESS: 'Has exportado tus cursos correctamente. El archivo se encuentra en la carpeta que ha seleccionado.',

    PERSON_NAME_REQUIRED: TranslationAdapter.translate('forms.validations.required', {
        article: 'El',
        attribute: TranslationAdapter.translate('forms.fields.personName'),
        required: 'requerido'
    }),

    PERSON_NAME_MIN_LENGTH: TranslationAdapter.translate('forms.validations.min', {
        article: 'El',
        attribute: TranslationAdapter.translate('forms.fields.personName'),
        min: 2
    }),

    PERSON_ABOUT_REQUIRED: TranslationAdapter.translate('forms.validations.required', {
        article: 'La',
        attribute: TranslationAdapter.translate('forms.fields.personAbout'),
        required: 'requerida'
    }),

    PERSON_ABOUT_MIN_LENGTH: TranslationAdapter.translate('forms.validations.min', {
        article: 'La',
        attribute: TranslationAdapter.translate('forms.fields.personAbout'),
        min: 10
    }),

    PERSON_ADDRESS_REQUIRED: TranslationAdapter.translate('forms.validations.required', {
        article: 'La',
        attribute: TranslationAdapter.translate('forms.fields.address'),
        required: 'requerida'
    }),

    PERSON_ADDRESS_MIN_LENGTH: TranslationAdapter.translate('forms.validations.min', {
        article: 'La',
        attribute: TranslationAdapter.translate('forms.fields.address'),
        min: 10
    }),

    PUBLICATION_REQUIRED: TranslationAdapter.translate('forms.validations.empty', {
        article: 'La',
        attribute: TranslationAdapter.translate('forms.fields.publication'),
        empty: 'vacía'
    }),

    PUBLICATION_MIN_LENGTH: TranslationAdapter.translate('forms.validations.min', {
        article: 'La',
        attribute: TranslationAdapter.translate('forms.fields.publication'),
        min: 5
    }),

    UNSELECTED: TranslationAdapter.translate('messages.errors.unSelected.empty', {
        attribute: TranslationAdapter.translate('forms.fields.course'),
        article: 'un',
        genderEnding: 'o'
    }),

    UNSELECTED_FINISH_OR_START: 'No pudes terminar o comenzar de nuevo un curso suspendido.',

    UNSELECTED_DELETE: TranslationAdapter.translate('messages.errors.unSelected.deleted', {
        attribute: TranslationAdapter.translate('forms.fields.course'),
        article: 'un',
        genderEnding: 'o'
    }),

    UNSELECTED_UPDATE: TranslationAdapter.translate('messages.errors.unSelected.updated', {
        attribute: TranslationAdapter.translate('forms.fields.course'),
        article: 'un',
        genderEnding: 'o'
    }),

    FINISHED: 'No puedes suspender o renovar un curso terminado.',
    SUSPENDED_SUCCESS: 'Has suspendido el curso correctamente.',
    RENEW_SUCCESS: 'Has renovado el curso correctamente.',

    DELETED_SUCCESS: TranslationAdapter.translate('messages.success.deleted', {
        attribute: TranslationAdapter.translate('forms.fields.course'),
        article: 'el',
    }),

    FINISHED_SUCCESS: 'Has terminado el curso correctamente.',
    RESTARTED_SUCCESS: 'Has comenzado de nuevo el curso correctamente.',

    ADDED_SUCCESS: TranslationAdapter.translate('messages.success.added', {
        attribute: TranslationAdapter.translate('forms.fields.course'),
        article: 'el',
    }),

    UPDATED_SUCCESS: 'Has actualizado el curso correctamente.',
}