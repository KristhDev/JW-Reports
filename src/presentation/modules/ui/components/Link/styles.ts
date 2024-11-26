import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, fontSizes }) => ({
    linkText: {
        color: colors.linkText,
        fontSize: fontSizes.sm
    }
}));