import localEs from 'dayjs/locale/es';
import localEn from 'dayjs/locale/en';

import { Characters } from '@utils';

export const locales = {
    en: {
        ...localEn,
        months: localEn.months?.map(month => Characters.capitalize(month)),
        monthsShort: localEn.monthsShort?.map(month => Characters.capitalize(month)),
        weekdays: localEn.weekdays?.map(day => Characters.capitalize(day)),
        weekdaysShort: localEn.weekdaysShort?.map(day => Characters.capitalize(day)),
        weekdaysMin: localEn.weekdaysMin?.map(day => Characters.capitalize(day))
    },

    es: {
        ...localEs,
        months: localEs.months?.map(month => Characters.capitalize(month)),
        monthsShort: localEs.monthsShort?.map(month => Characters.capitalize(month)),
        weekdays: localEs.weekdays?.map(day => Characters.capitalize(day)),
        weekdaysShort: localEs.weekdaysShort?.map(day => Characters.capitalize(day)),
        weekdaysMin: localEs.weekdaysMin?.map(day => Characters.capitalize(day))
    }
}
