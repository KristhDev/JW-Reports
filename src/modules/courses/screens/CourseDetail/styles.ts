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

    sectionTextColor: {
        color: colors.text
    },

    dateCreatedText: {
        bottom: margins.md,
        color: colors.modalText,
        fontSize: fontSizes.sm,
        position: 'absolute',
        right: margins.md,
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