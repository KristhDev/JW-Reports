import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, fontSizes, margins }) => ({
    sectionContainer: {
        borderBottomColor: colors.header,
        borderBottomWidth: 1,
        paddingTop: margins.md,
    },

    sectionTitle: {
        color: colors.titleSecondary,
        fontSize: (fontSizes.sm - 1),
        fontWeight: 'bold',
        textAlign: 'left'
    }
}));