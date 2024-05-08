import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, fontSizes, margins }) => ({
    reportModal: {
        backgroundColor: colors.modal,
        borderRadius: 10,
        padding: margins.md,
        width: '100%'
    },

    reportModalInfo: {
        color: colors.modalText,
        fontSize: (fontSizes.sm + 2),
        fontWeight: 'bold'
    },

    reportTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: 'bold'
    },

    reportText: {
        fontSize: (fontSizes.sm + 1),
    },

    restMinsText: {
        color: colors.modalText,
        fontSize: fontSizes.sm,
        marginTop: margins.sm
    }
}));

export default styles;