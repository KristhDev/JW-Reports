import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, fontSizes, margins }) => ({
    pressable: {
        marginVertical: margins.xs,
        width: '100%'
    },

    cardContainer: {
        backgroundColor: colors.card,
        padding: margins.sm
    },

    textDate: {
        color: colors.icon,
        fontSize: (fontSizes.sm - 2),
        marginBottom: margins.sm
    },

    textDescription: {
        color: colors.text,
        fontSize: fontSizes.sm,
    }
}));