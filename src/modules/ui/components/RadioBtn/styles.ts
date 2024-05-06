import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, margins }) => ({
    radioContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5
    },

    radioPressable: {
        alignItems: 'center',
        borderRadius: 999,
        borderWidth: 2,
        height: 20,
        justifyContent: 'center',
        padding: 3,
        width: 20
    },

    radioCircle: {
        borderRadius: 999,
        height: '100%',
        width: '100%'
    },

    radioLabel: {
        color: colors.text,
        fontSize: 18,
        marginLeft: margins.xs
    }
}));

export default styles;