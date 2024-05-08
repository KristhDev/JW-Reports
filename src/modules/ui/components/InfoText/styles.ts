import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, margins, fontSizes }) => ({
    container: {
        padding: margins.sm
    },

    text: {
        color: colors.icon,
        fontSize: (fontSizes.sm + 1),
        textAlign: 'center'
    }
}));

export default styles;