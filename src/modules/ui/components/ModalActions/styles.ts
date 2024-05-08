import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, fontSizes, margins }) => ({
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: margins.xl,
        gap: margins.xs
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

export default styles;