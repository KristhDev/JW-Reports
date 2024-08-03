import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, fontSizes, margins }) => ({
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: margins.xs + 4
    },

    modalInputContainer: {
        paddingHorizontal: margins.sm,
        paddingVertical: margins.xs
    },

    modalInput: {
        padding: 0,
        paddingLeft: 0,
        fontSize: fontSizes.xl,
        textAlign: 'center'
    },

    modalButtonContainer: {
        height: fontSizes.xl,
        minWidth: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        width: fontSizes.xl,
    },

    hourSeparator: {
        color: colors.inputText,
        fontSize: fontSizes.lg,
        fontWeight: 'bold',
    }
}));