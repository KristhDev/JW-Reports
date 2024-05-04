import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, margins }) => ({
    container: {
        padding: margins.sm
    },

    text: {
        color: colors.icon,
        fontSize: 17,
        textAlign: 'center'
    }
}));

export default styles;