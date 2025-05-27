import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, fontSizes, margins }) => ({
    filtersContainer: {
        flexDirection: 'row',
        gap: margins.xs,
        width: '100%'
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