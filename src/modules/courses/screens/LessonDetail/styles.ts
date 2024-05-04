import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, margins }) => ({
    sectionStyle: {
        paddingBottom: margins.md,
        width: '100%'
    },

    sectionSubTitle: {
        color: colors.text,
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: margins.xs
    },

    dateCreatedText: {
        bottom: margins.md,
        color: colors.modalText,
        fontSize: 16,
        position: 'absolute',
        right: margins.md
    }
}));

export default styles;