import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, fontSizes, margins }) => ({
    sectionStyle: {
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
        fontSize: (fontSizes.sm + 3),
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

export default styles;