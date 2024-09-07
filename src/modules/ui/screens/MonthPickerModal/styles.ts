import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, fontSizes, margins }) => ({
    modalTitle: {
        color: colors.text,
        fontSize: (fontSizes.sm + 2),
        fontWeight: 'bold',
        marginBottom: margins.md
    },

    modalContent: {
        flexDirection: 'row',
        gap: margins.xs,
        justifyContent: 'center',
    },

    modalInputContainer: {
        alignItems: 'center',
        gap: (margins.xs + 4)
    },

    controlInput: {
        paddingHorizontal: margins.sm,
        paddingVertical: margins.xs,
    },

    modalInput: {
        fontSize: fontSizes.sm + 2,
        padding: 0,
        paddingLeft: 0,
        textAlign: 'center'
    },

    modalButtonContainer: {
        height: fontSizes.xl,
        minWidth: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        width: fontSizes.xl
    }
}));