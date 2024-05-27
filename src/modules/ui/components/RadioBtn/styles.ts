import { createStyleSheet } from 'react-native-unistyles';

const styles = createStyleSheet(({ colors, margins, fontSizes }) => ({
    radioContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: (margins.xs - 3)
    },

    radioPressable: {
        alignItems: 'center',
        borderRadius: 999,
        borderWidth: 2,
        height: 20,
        justifyContent: 'center',
        padding: (margins.xs - 5),
        width: 20
    },

    radioCircle: {
        borderRadius: 999,
        height: '100%',
        width: '100%'
    },

    radioLabel: {
        color: colors.text,
        fontSize: (fontSizes.sm + 2),
        marginLeft: margins.xs
    }
}));

export default styles;