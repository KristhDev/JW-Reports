import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors }) => ({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 40,
        width: '100%',
    },

    text: {
        color: colors.text,
        fontSize: 18,
        paddingLeft: 8,
        textAlign: 'left',
    }
}));

export default styles;