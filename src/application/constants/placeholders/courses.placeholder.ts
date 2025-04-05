import { translationAdapter } from '@config/di';



export const coursesPlaceholders = {
    PERSON_NAME: translationAdapter.translate('forms.placeholders.typeThe', {
        attribute: translationAdapter.translate('forms.fields.name'),
        article: 'el'
    }),

    PERSON_ADDRESS: translationAdapter.translate('forms.placeholders.typeThe', {
        attribute: translationAdapter.translate('forms.fields.address'),
        article: 'la'
    }),

    PERSON_ABOUT: translationAdapter.translate('forms.placeholders.personAbout'),

    PUBLICATION: translationAdapter.translate('forms.placeholders.typeThe', {
        attribute: translationAdapter.translate('forms.fields.publication'),
        article: 'la'
    })
}
