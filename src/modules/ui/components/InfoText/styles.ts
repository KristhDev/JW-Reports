import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, margins, fontSizes }) => ({
    container: {
        padding: margins.sm
    },

    text: {
        color: colors.icon,
        fontSize: (fontSizes.sm + 1),
        textAlign: 'center'
    }
}));