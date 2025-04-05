import { translationAdapter } from '@config/di';

import { ItemOption, Precursor } from '@infrastructure/interfaces';

import { Characters } from '@utils';



/**
 * The precursors options to select
 */
export const PRECURSORS_OPTIONS: ItemOption[] = [
    { 
        label: Characters.capitalize(translationAdapter.translate('pioners.none')), 
        value: 'ninguno' 
    },
    { 
        label: Characters.capitalize(translationAdapter.translate('pioners.auxiliary')), 
        value: 'auxiliar' 
    },
    { 
        label: Characters.capitalize(translationAdapter.translate('pioners.regular')), 
        value: 'regular' 
    },
    { 
        label: Characters.capitalize(translationAdapter.translate('pioners.special')), 
        value: 'especial' 
    }
] as const;

export const precursors: Record<Uppercase<Precursor>, Precursor> = {
    AUXILIAR: 'auxiliar',
    ESPECIAL: 'especial',
    NINGUNO: 'ninguno',
    REGULAR: 'regular'
}