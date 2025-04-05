import { translationAdapter } from '@config/di';



export const authPlaceholeders = {
    EMAIL: translationAdapter.translate('forms.placeholders.type', {
        attribute: translationAdapter.translate('forms.fields.email')
    }),

    PASSWORD: translationAdapter.translate('forms.placeholders.type', {
        attribute: translationAdapter.translate('forms.fields.password')
    }),

    CONFIRM_PASSWORD: translationAdapter.translate('forms.placeholders.type', {
        attribute: translationAdapter.translate('forms.fields.confirmPassword')
    }),

    CONFIRM_NEW_PASSWORD: translationAdapter.translate('forms.placeholders.confirm', {
        attribute: translationAdapter.translate('forms.fields.password')
    }),

    HOURS_REQUIREMENT: translationAdapter.translate('forms.placeholders.type', {
        attribute: translationAdapter.translate('forms.fields.hoursRequirement')
    }),

    NAME: translationAdapter.translate('forms.placeholders.type', {
        attribute: translationAdapter.translate('forms.fields.name')
    }),

    SURNAME: translationAdapter.translate('forms.placeholders.type', {
        attribute: translationAdapter.translate('forms.fields.surname')
    }),
}