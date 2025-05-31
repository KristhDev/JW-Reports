import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, fontSizes, margins }) => ({
    filtersContainer: {
        flexGrow: 1,
        gap: margins.xs
    },

    filterItemPressable: {
        borderColor: colors.button,
        borderWidth: 1,
    },

    filterItemContainer: {
        minWidth: 0,
        paddingHorizontal: margins.sm,
        paddingVertical: margins.xs
    },

    filterItemText: {
        fontSize: fontSizes.sm
    },

    filterItemUnSelectedText: {
        color: colors.button
    },

    filterItemUnSelectedPressable: {
        backgroundColor: 'transparent'
    },
}));