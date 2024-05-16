import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, margins, fontSizes }) => ({
    titleContainer: {
        alignItems: 'flex-start',
        marginBottom: margins.xl,
        width: '100%'
    },

    title: {
        color: colors.titleText,
        fontSize: (fontSizes.xl - 2),
        fontWeight: 'bold'
    }
}));

export default styles;