import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, fontSizes, margins }) => ({
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: margins.xl,
        gap: margins.xs,
        width: '100%'
    },

    modalButton: {
        paddingHorizontal: (margins.xs + 4),
        minWidth: 0
    },

    modalButtonText: {
        color: colors.button,
        fontSize: fontSizes.sm
    },
}));