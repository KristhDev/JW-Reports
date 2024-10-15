import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ borderRadius, fontSizes }) => ({
    fabView: {
        borderRadius: borderRadius.rounded,
        height: fontSizes.xxl,
        width: fontSizes.xxl,
        zIndex: 999
    },

    fab: {
        alignItems: 'center',
        borderRadius: borderRadius.rounded,
        height: '100%',
        justifyContent: 'center',
        width: '100%',
    }
}));