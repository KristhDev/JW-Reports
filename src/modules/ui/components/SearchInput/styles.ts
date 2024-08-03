import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ borderRadius, margins }) => ({
    searchInputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: margins.md,
        paddingHorizontal: margins.xs,
        width: '100%'
    },

    inputContainer: {
        alignItems: 'center',
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
    },

    cleanBtn: {
        alignItems: 'center',
        borderRadius: borderRadius.rounded,
        height: margins.xl,
        justifyContent: 'center',
        width: margins.xl
    }
}));