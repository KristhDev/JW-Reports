import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ borderRadius, colors, fontSizes, margins }) => ({
    reportModal: {
        backgroundColor: colors.modal,
        borderRadius: borderRadius.sm,
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
        fontSize: (fontSizes.sm + 4),
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
