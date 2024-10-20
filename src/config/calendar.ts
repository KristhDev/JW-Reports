import localEs from 'dayjs/locale/es';
import { Characters } from '@utils';

export const locales = {
    es: {
        ...localEs,
        months: localEs.months?.map(month => Characters.capitalize(month)),
        monthsShort: localEs.monthsShort?.map(month => Characters.capitalize(month)),
        weekdays: localEs.weekdays?.map(day => Characters.capitalize(day)),
        weekdaysShort: localEs.weekdaysShort?.map(day => Characters.capitalize(day)),
        weekdaysMin: localEs.weekdaysMin?.map(day => Characters.capitalize(day))
    }
}
