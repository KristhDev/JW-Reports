import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, margins }) => ({
    scrollView: {
        alignItems: 'center',
        flexGrow: 1,
        padding: margins.md,
        paddingBottom: 100
    },

    sectionStyle: {
        marginBottom: 32,
        width: '100%'
    },

    sectionSubTitle: {
        color: colors.text,
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: margins.sm
    },

    imageText: {
        color: colors.modalText,
        fontSize: 16,
        marginTop: 10
    },

    dateCreatedText: {
        bottom: margins.md,
        color: colors.modalText,
        fontSize: 16,
        position: 'absolute',
        right: margins.md,
    }
}));

export default styles;