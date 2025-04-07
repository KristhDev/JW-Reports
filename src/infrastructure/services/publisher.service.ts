import { TranslationAdapterContract } from '@domain/contracts/adapters';

import { PublisherServiceContract } from '@domain/contracts/services';

import { ItemOption } from '@infrastructure/interfaces';

import { Characters } from '@utils';

export class PublisherService implements PublisherServiceContract {
    constructor(
        private readonly translationAdapter: TranslationAdapterContract
    ) {}

    public get PRECURSORS_OPTIONS(): ItemOption[] {
        return [
            { 
                label: Characters.capitalize(this.translationAdapter.translate('pioners.none')), 
                value: 'ninguno' 
            },
            { 
                label: Characters.capitalize(this.translationAdapter.translate('pioners.auxiliary')), 
                value: 'auxiliar' 
            },
            { 
                label: Characters.capitalize(this.translationAdapter.translate('pioners.regular')), 
                value: 'regular' 
            },
            { 
                label: Characters.capitalize(this.translationAdapter.translate('pioners.special')), 
                value: 'especial' 
            }
        ]
    }
}