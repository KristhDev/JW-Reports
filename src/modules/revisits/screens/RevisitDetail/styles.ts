import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, fontSizes, margins }) => ({
    scrollView: {
        alignItems: 'center',
        flexGrow: 1,
        padding: margins.md,
        paddingBottom: 100
    },

    sectionStyle: {
        marginBottom: margins.lg,
        width: '100%'
    },

    sectionSubTitle: {
        color: colors.text,
        fontSize: (fontSizes.sm + 3),
        fontWeight: 'bold',
        marginBottom: margins.sm
    },

    sectionLinkText: {
        color: colors.linkText,
        fontSize: (fontSizes.sm + 3),
    },

    sectionText: {
        color: colors.text,
        fontSize: (fontSizes.sm + 3)
    },

    imageText: {
        color: colors.modalText,
        fontSize: fontSizes.sm,
        marginTop: (margins.xs + 2)
    },

    dateCreatedText: {
        bottom: margins.md,
        color: colors.modalText,
        fontSize: fontSizes.sm,
        position: 'absolute',
        right: margins.md,
    }
}));

export default styles;