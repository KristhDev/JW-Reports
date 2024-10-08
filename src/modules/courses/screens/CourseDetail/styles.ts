import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, fontSizes, margins }) => ({
    sectionTextColor: {
        color: colors.text
    },

    cardContainer: {
        borderColor: colors.text,
        borderWidth: 0.5,
    },

    cardHeaderText: {
        color: colors.text,
        fontSize: fontSizes.md,
        fontWeight: 'bold',
        padding: margins.xs,
        textAlign: 'center'
    },

    cardContentText: {
        color: colors.text,
        fontSize: (fontSizes.sm + 3),
        padding: margins.md
    }
}));