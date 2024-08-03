import localEs from 'dayjs/locale/es';
import { characters } from './characters';

export const localeEs = {
    ...localEs,
    months: localEs.months?.map(month => characters.capitalize(month)),
    monthsShort: localEs.monthsShort?.map(month => characters.capitalize(month)),
    weekdays: localEs.weekdays?.map(day => characters.capitalize(day)),
    weekdaysShort: localEs.weekdaysShort?.map(day => characters.capitalize(day)),
    weekdaysMin: localEs.weekdaysMin?.map(day => characters.capitalize(day))
}
