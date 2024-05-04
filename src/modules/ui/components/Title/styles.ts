import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, margins }) => ({
    titleContainer: {
        alignItems: 'flex-start',
        marginBottom: margins.lg,
        width: '100%'
    },

    title: {
        color: colors.titleText,
        fontSize: 38,
        fontWeight: 'bold'
    }
}));

export default styles;