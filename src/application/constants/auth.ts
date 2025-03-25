import { TranslationAdapter } from '@infrastructure/adapters/translation.adapter';
import { ItemOption, Precursor } from '@infrastructure/interfaces';

import { Characters } from '@utils';

/**
 * The precursors options to select
 */
export const PRECURSORS_OPTIONS: ItemOption[] = [
    { 
        label: Characters.capitalize(TranslationAdapter.translate('pioners.none')), 
        value: 'ninguno' 
    },
    { 
        label: Characters.capitalize(TranslationAdapter.translate('pioners.auxiliary')), 
        value: 'auxiliar' 
    },
    { 
        label: Characters.capitalize(TranslationAdapter.translate('pioners.regular')), 
        value: 'regular' 
    },
    { 
        label: Characters.capitalize(TranslationAdapter.translate('pioners.special')), 
        value: 'especial' 
    }
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

    CONFIRM_NEW_PASSWORD: TranslationAdapter.translate('forms.placeholders.confirm', {
        attribute: TranslationAdapter.translate('forms.fields.password')
    }),

    HOURS_REQUIREMENT: TranslationAdapter.translate('forms.placeholders.type', {
        attribute: TranslationAdapter.translate('forms.fields.hoursRequirement')
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
    EMAIL_UPDATE_UNCHANGED: TranslationAdapter.translate('forms.validations.unchanged', {
        attribute: TranslationAdapter.translate('forms.fields.email')
    }),
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
    PASSWORD_UPDATED: TranslationAdapter.translate('messages.success.updated', {
        attribute: TranslationAdapter.translate('forms.fields.password')
    }),
    PROFILE_UPDATED: TranslationAdapter.translate('messages.success.updated', {
        attribute: TranslationAdapter.translate('forms.fields.profile')
    }),
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
    UNATHENTICATED: TranslationAdapter.translate('messages.errors.unauthenticated'),
    UNAUTHORIZED: TranslationAdapter.translate('messages.errors.unauthorized'),
}

export const precursorMessages = {
    PRECURSOR_EMPTY: TranslationAdapter.translate('forms.validations.empty', {
        article: 'El',
        attribute: TranslationAdapter.translate('forms.fields.pioner'),
        empty: 'vacío'
    }),
    PRECURSOR_INVALID: TranslationAdapter.translate('forms.validations.enum', {
        article: 'El',
        attribute: TranslationAdapter.translate('forms.fields.pioner'),
        values: PRECURSORS_OPTIONS.map(({ label }) => label).join(', ')
    }),
}