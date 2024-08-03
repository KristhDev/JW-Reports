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

    textStatus: {
        color: colors.icon,
        fontSize: (fontSizes.sm - 2),
        marginBottom: margins.sm
    },

    textName: {
        color: colors.text,
        fontWeight: 'bold',
        fontSize: (fontSizes.sm + 2),
    },

    textBook: {
        color: colors.icon,
        fontSize: fontSizes.sm,
        marginBottom: margins.sm
    },

    textDescription: {
        color: colors.text,
        fontSize: fontSizes.sm,
    }
}));
