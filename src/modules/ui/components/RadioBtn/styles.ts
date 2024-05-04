import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, margins }) => ({
    radioContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5
    },

    radioLabel: {
        color: colors.text,
        fontSize: 18,
        marginLeft: margins.xs
    }
}));

export default styles;