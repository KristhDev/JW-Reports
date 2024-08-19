import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ borderRadius, colors, fontSizes, margins }) =>({
    buttonPressable: {
        borderRadius: (borderRadius.xs + 2),
        backgroundColor: colors.button,
    },

    buttonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: margins.sm,
        justifyContent: 'center',
        minWidth: '100%',
        paddingHorizontal: (margins.sm + 4),
        paddingVertical: (margins.xs + 1)
    },

    buttonText: {
        color: colors.contentHeader,
        fontSize: (fontSizes.sm + 2),
        fontWeight: 'bold',
        marginBottom: 2,
        textAlign: 'center',
    },
}));