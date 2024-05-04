import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, margins }) => ({
    modal: {
        backgroundColor: colors.modal,
        borderRadius: 10,
        padding: margins.md
    },

    modalTitle: {
        color: colors.text,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: margins.md
    },

    modalSection: {
        marginBottom: margins.sm
    },

    modalSectionText: {
        fontSize: 17,
    }
}));

export default styles;