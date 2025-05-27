import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, borderRadius, margins }) => ({
    searchInputContainer: {
        minWidth: '100%'
    },

    cleanBtn: {
        alignItems: 'center',
        borderRadius: borderRadius.rounded,
        justifyContent: 'center',
        padding: (margins.xs - 4)
    }
}));