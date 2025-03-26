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

    UNSELECTED: 'No hay un curso seleccionado.',
    UNSELECTED_FINISH_OR_START: 'No pudes terminar o comenzar de nuevo un curso suspendido.',
    UNSELECTED_DELETE: 'No hay un curso seleccionado para eliminar.',
    UNSELECTED_UPDATE: 'No hay un curso seleccionado para actualizar.',
    FINISHED: 'No puedes suspender o renovar un curso terminado.',
    SUSPENDED_SUCCESS: 'Has suspendido el curso correctamente.',
    RENEW_SUCCESS: 'Has renovado el curso correctamente.',
    DELETED_SUCCESS: 'Has eliminado el curso correctamente.',
    FINISHED_SUCCESS: 'Has terminado el curso correctamente.',
    RESTARTED_SUCCESS: 'Has comenzado de nuevo el curso correctamente.',
    ADDED_SUCCESS: 'Has agregado el curso correctamente.',
    UPDATED_SUCCESS: 'Has actualizado el curso correctamente.',
}