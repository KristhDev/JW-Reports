import { TranslationAdapter } from '@infrastructure/adapters/translation.adapter';
import { ItemOption, Precursor } from '@infrastructure/interfaces';

/**
 * The precursors options to select
 */
export const PRECURSORS_OPTIONS: ItemOption[] = [
    { label: 'Ninguno', value: 'ninguno' },
    { label: 'Auxiliar', value: 'auxiliar' },
    { label: 'Regular', value: 'regular' },
    { label: 'Especial', value: 'especial' }
];

export const precursors: Record<Uppercase<Precursor>, Precursor> = {
    AUXILIAR: 'auxiliar',
    ESPECIAL: 'especial',
    NINGUNO: 'ninguno',
    REGULAR: 'regular'
}

export const authPlaceholeders = {
    EMAIL: TranslationAdapter.translate('forms.placeholders.type', {
        attribute: TranslationAdapter.translate('forms.fields.email')
    }),

    PASSWORD: TranslationAdapter.translate('forms.placeholders.type', {
        attribute: TranslationAdapter.translate('forms.fields.password')
    }),

    CONFIRM_PASSWORD: TranslationAdapter.translate('forms.placeholders.type', {
        attribute: TranslationAdapter.translate('forms.fields.confirmPassword')
    }),

    NAME: TranslationAdapter.translate('forms.placeholders.type', {
        attribute: TranslationAdapter.translate('forms.fields.name')
    }),

    SURNAME: TranslationAdapter.translate('forms.placeholders.type', {
        attribute: TranslationAdapter.translate('forms.fields.surname')
    }),
}

export const authMessages = {
    CONFIRM_PASSWORD_EMPTY: TranslationAdapter.translate('forms.validations.empty', {
        article: 'La',
        attribute: TranslationAdapter.translate('forms.fields.confirmPassword'),
        empty: 'vacía'
    }),
    EMAIL_ALREADY_REGISTERED: TranslationAdapter.translate('forms.validations.email.exists'),
    EMAIL_EMPTY: TranslationAdapter.translate('forms.validations.empty', {
        article: 'El',
        attribute: TranslationAdapter.translate('forms.fields.email'),
        empty: 'vacío'
    }),
    EMAIL_INVALID: TranslationAdapter.translate('forms.validations.email.invalid', {
        article: 'El',
        attribute: TranslationAdapter.translate('forms.fields.email')
    }),
    EMAIL_UPDATE_UNCHANGED: 'Para actualizar tu correo debes cambiarlo.',
    NAME_EMPTY: TranslationAdapter.translate('forms.validations.empty', {
        article: 'El',
        attribute: TranslationAdapter.translate('forms.fields.name'),
        empty: 'vacío'
    }),
    NAME_MIN_LENGTH: TranslationAdapter.translate('forms.validations.min', {
        article: 'El',
        attribute: TranslationAdapter.translate('forms.fields.name'),
        min: 2
    }),
    PASSWORD_EMPTY: TranslationAdapter.translate('forms.validations.empty', {
        article: 'La',
        attribute: TranslationAdapter.translate('forms.fields.password'),
        empty: 'vacía'
    }),
    PASSWORD_MIN_LENGTH: TranslationAdapter.translate('forms.validations.min', {
        article: 'La',
        attribute: TranslationAdapter.translate('forms.fields.password'),
        min: 6
    }),
    PASSWORD_NOT_MATCH: TranslationAdapter.translate('forms.validations.password.mismatch'),
    PASSWORD_UPDATED: 'Ha actualizado su contraseña correctamente.',
    PROFILE_UPDATED: 'Ha actualizado su perfil correctamente.',
    SURNAME_EMPTY: TranslationAdapter.translate('forms.validations.empty', {
        article: 'Los',
        attribute: TranslationAdapter.translate('forms.fields.surname'),
        empty: 'vacíos'
    }),
    SURNAME_MIN_LENGTH: TranslationAdapter.translate('forms.validations.min', {
        article: 'Los',
        attribute: TranslationAdapter.translate('forms.fields.surname'),
        min: 2
    }),
    UNATHENTICATED: 'Para realizar está acción debe iniciar sesión.',
    UNAUTHORIZED: 'No tiene permiso para realizar está acción.',
}

export const precursorMessages = {
    PRECURSOR_EMPTY: TranslationAdapter.translate('forms.validations.empty', {
        article: 'El',
        attribute: TranslationAdapter.translate('forms.fields.precursor'),
        empty: 'vacío'
    }),
    PRECURSOR_INVALID: TranslationAdapter.translate('forms.validations.enum', {
        article: 'El',
        attribute: TranslationAdapter.translate('forms.fields.precursor'),
        values: PRECURSORS_OPTIONS.map(({ label }) => label).join(', ')
    }),
}