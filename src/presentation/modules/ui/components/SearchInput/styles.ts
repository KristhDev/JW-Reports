import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, borderRadius, margins }) => ({
    searchInputContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: margins.md,
        paddingHorizontal: margins.xs,
        width: '100%'
    },

    inputContainer: (isFocused) => ({
        alignItems: 'center',
        borderColor: (isFocused) ? colors.button : colors.icon,
        borderBottomWidth: 1,
        flex: 1,
        flexDirection: 'row',
        paddingLeft: (margins.xs - 4)
    }),

    cleanBtn: {
        alignItems: 'center',
        borderRadius: borderRadius.rounded,
        justifyContent: 'center',
        padding: (margins.xs - 4)
    }
}));