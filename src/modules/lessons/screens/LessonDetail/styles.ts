import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, fontSizes, margins }) => ({
    sectionContainer: {
        paddingBottom: margins.md,
        width: '100%'
    },

    sectionSubTitle: {
        color: colors.text,
        fontSize: (fontSizes.sm + 3),
        fontWeight: 'bold',
        marginBottom: margins.xs
    },

    sectionTextLink: {
        color: colors.linkText,
        fontSize: (fontSizes.sm + 3),
    },

    sectionText: {
        color: colors.text,
        fontSize: (fontSizes.sm + 3)
    },

    dateCreatedText: {
        bottom: margins.md,
        color: colors.modalText,
        fontSize: fontSizes.sm,
        position: 'absolute',
        right: margins.md
    }
}));
