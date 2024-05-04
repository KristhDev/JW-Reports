import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, margins }) => ({
    reportModal: {
        backgroundColor: colors.modal,
        borderRadius: 10,
        padding: margins.md,
    },

    reportModalInfo: {
        color: colors.modalText,
        fontSize: 18,
        fontWeight: 'bold'
    },

    reportTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: 'bold'
    },

    reportText: {
        fontSize: 17,
    }
}));

export default styles;