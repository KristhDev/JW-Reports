import { translationAdapter } from '@config/di';

import { PRECURSORS_OPTIONS } from '../utils';

export const authMessages = {
    CONFIRM_PASSWORD_EMPTY: translationAdapter.translate('forms.validations.empty', {
        article: 'La',
        attribute: translationAdapter.translate('forms.fields.confirmPassword'),
        empty: 'vacía'
    }),
    EMAIL_ALREADY_REGISTERED: translationAdapter.translate('forms.validations.email.exists'),
    EMAIL_EMPTY: translationAdapter.translate('forms.validations.empty', {
        article: 'El',
        attribute: translationAdapter.translate('forms.fields.email'),
        empty: 'vacío'
    }),
    EMAIL_INVALID: translationAdapter.translate('forms.validations.email.invalid', {
        article: 'El',
        attribute: translationAdapter.translate('forms.fields.email')
    }),
    EMAIL_UPDATE_UNCHANGED: translationAdapter.translate('forms.validations.unchanged', {
        attribute: translationAdapter.translate('forms.fields.email')
    }),
    NAME_EMPTY: translationAdapter.translate('forms.validations.empty', {
        article: 'El',
        attribute: translationAdapter.translate('forms.fields.name'),
        empty: 'vacío'
    }),
    NAME_MIN_LENGTH: translationAdapter.translate('forms.validations.min', {
        article: 'El',
        attribute: translationAdapter.translate('forms.fields.name'),
        min: 2
    }),
    PASSWORD_EMPTY: translationAdapter.translate('forms.validations.empty', {
        article: 'La',
        attribute: translationAdapter.translate('forms.fields.password'),
        empty: 'vacía'
    }),
    PASSWORD_MIN_LENGTH: translationAdapter.translate('forms.validations.min', {
        article: 'La',
        attribute: translationAdapter.translate('forms.fields.password'),
        min: 6
    }),
    PASSWORD_NOT_MATCH: translationAdapter.translate('forms.validations.password.mismatch'),
    PASSWORD_UPDATED: translationAdapter.translate('messages.success.updated', {
        attribute: translationAdapter.translate('forms.fields.password')
    }),
    PROFILE_UPDATED: translationAdapter.translate('messages.success.updated', {
        attribute: translationAdapter.translate('forms.fields.profile')
    }),
    SURNAME_EMPTY: translationAdapter.translate('forms.validations.empty', {
        article: 'Los',
        attribute: translationAdapter.translate('forms.fields.surname'),
        empty: 'vacíos'
    }),
    SURNAME_MIN_LENGTH: translationAdapter.translate('forms.validations.min', {
        article: 'Los',
        attribute: translationAdapter.translate('forms.fields.surname'),
        min: 2
    }),
    UNATHENTICATED: translationAdapter.translate('messages.errors.unauthenticated'),
    UNAUTHORIZED: translationAdapter.translate('messages.errors.unauthorized'),
} as const;

export const precursorMessages = {
    PRECURSOR_EMPTY: translationAdapter.translate('forms.validations.empty', {
        article: 'El',
        attribute: translationAdapter.translate('forms.fields.pioner'),
        empty: 'vacío'
    }),
    PRECURSOR_INVALID: translationAdapter.translate('forms.validations.enum', {
        article: 'El',
        attribute: translationAdapter.translate('forms.fields.pioner'),
        values: PRECURSORS_OPTIONS.map(({ label }) => label).join(', ')
    }),
} as const;