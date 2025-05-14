import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ borderRadius, colors, fontSizes }) => ({
    buttonNext: {
        backgroundColor: colors.button,
        borderRadius: borderRadius.xs
    },

    buttonPrev: {
        backgroundColor: colors.button,
        borderRadius: borderRadius.xs
    },

    dayCell: {
        borderRadius: borderRadius.xs
    },

    dayLabel: {
        textTransform: 'capitalize',
        color: colors.text
    },

    monthLabel: {
        textTransform: 'capitalize',
        color: colors.text
    },

    monthSelectorLabel: {
        textTransform: 'capitalize',
        color: colors.text,
        fontSize: (fontSizes.sm + 4),
    },

    selected: {
        backgroundColor: colors.button,
        borderRadius: borderRadius.xs
    },

    selectedLabel: {
        textTransform: 'capitalize',
        color: colors.contentHeader,
        fontWeight: 'bold'
    },

    selectedMonth: {
        backgroundColor: colors.button,
        borderRadius: borderRadius.xs
    },

    selectedMonthLabel: {
        textTransform: 'capitalize',
        color: colors.contentHeader,
        fontWeight: 'bold'
    },

    selectedYear: {
        backgroundColor: colors.button,
        textTransform: 'capitalize',
        borderRadius: borderRadius.xs
    },

    selectedYearLabel: {
        textTransform: 'capitalize',
        color: colors.contentHeader,
        fontWeight: 'bold'
    },

    today: {
        borderColor: colors.button,
        borderRadius: borderRadius.xs,
        borderWidth: 2
    },

    todayLabel: {
        textTransform: 'capitalize',
        color: colors.button
    },

    weekdayLabel: {
        textTransform: 'capitalize',
        color: colors.button
    },

    yearLabel: {
        color: colors.text,
        textTransform: 'capitalize'
    },

    yearSelectorLabel: {
        textTransform: 'capitalize',
        color: colors.text,
        fontSize: (fontSizes.sm + 4),
    }
}));