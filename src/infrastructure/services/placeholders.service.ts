import { TranslationAdapterContract } from '@domain/contracts/adapters';

import { PlaceholdersServiceContract } from '@domain/contracts/services';

import { AuthPlaceholders, CoursesPlaceholders, LessonsPlaceholders, PreachingPlaceholders } from '@infrastructure/interfaces';

export class PlaceholdersService implements PlaceholdersServiceContract {
    constructor(
        private readonly translationAdapter: TranslationAdapterContract
    ) { }

    public get authPlaceholders(): AuthPlaceholders {
        return {
            EMAIL: this.translationAdapter.translate('forms.placeholders.type', {
                attribute: this.translationAdapter.translate('forms.fields.email')
            }),

            PASSWORD: this.translationAdapter.translate('forms.placeholders.type', {
                attribute: this.translationAdapter.translate('forms.fields.password')
            }),

            CONFIRM_PASSWORD: this.translationAdapter.translate('forms.placeholders.confirm', {
                attribute: this.translationAdapter.translate('forms.fields.password')
            }),

            CONFIRM_NEW_PASSWORD: this.translationAdapter.translate('forms.placeholders.confirm', {
                attribute: this.translationAdapter.translate('forms.fields.password')
            }),

            HOURS_REQUIREMENT: this.translationAdapter.translate('forms.placeholders.type', {
                attribute: this.translationAdapter.translate('forms.fields.hoursRequirement')
            }),

            NAME: this.translationAdapter.translate('forms.placeholders.type', {
                attribute: this.translationAdapter.translate('forms.fields.name')
            }),

            SURNAME: this.translationAdapter.translate('forms.placeholders.type', {
                attribute: this.translationAdapter.translate('forms.fields.surname')
            }),
        }
    }

    public get coursesPlaceholders(): CoursesPlaceholders {
        return {
            PERSON_NAME: this.translationAdapter.translate('forms.placeholders.typeThe', {
                attribute: this.translationAdapter.translate('forms.fields.name'),
                article: 'el'
            }),

            PERSON_ADDRESS: this.translationAdapter.translate('forms.placeholders.typeThe', {
                attribute: this.translationAdapter.translate('forms.fields.address'),
                article: 'la'
            }),

            PERSON_ABOUT: this.translationAdapter.translate('forms.placeholders.personAbout'),

            PUBLICATION: this.translationAdapter.translate('forms.placeholders.typeThe', {
                attribute: this.translationAdapter.translate('forms.fields.publication'),
                article: 'la'
            })
        }
    }

    public get preachingPlaceholders(): PreachingPlaceholders {
        return {
            DAY: this.translationAdapter.translate('forms.placeholders.select', {
                attribute: this.translationAdapter.translate('forms.fields.day'),
                article: 'el'
            }),

            HOUR: this.translationAdapter.translate('forms.placeholders.select', {
                attribute: this.translationAdapter.translate('forms.fields.hour'),
                article: 'la'
            }),

            LDC_HOURS: this.translationAdapter.translate('forms.placeholders.preaching.hoursLDC')
        }
    }

    public get lessonsPlaceholders(): LessonsPlaceholders {
        return {
            SELECT_DAY: this.translationAdapter.translate('forms.placeholders.select', {
                attribute: this.translationAdapter.translate('forms.fields.day'),
                article: 'el'
            })
        }
    }
}