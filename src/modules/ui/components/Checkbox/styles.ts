import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, fontSizes, margins }) => ({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: margins.xl,
        width: '100%',
    },

    checkbox: {
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        height: 20,
        justifyContent: 'center',
        width: 20
    },

    text: {
        color: colors.text,
        fontSize: (fontSizes.sm + 2),
        paddingLeft: margins.sm,
        textAlign: 'left',
    }
}));

export default styles;