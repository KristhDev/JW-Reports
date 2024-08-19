import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ borderRadius, colors, margins, fontSizes }) => ({
    radioContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: (margins.xs - 3)
    },

    radioPressable: {
        alignItems: 'center',
        borderRadius: borderRadius.rounded,
        borderWidth: 2,
        height: 20,
        justifyContent: 'center',
        padding: (margins.xs - 5),
        width: 20
    },

    radioCircle: {
        borderRadius: borderRadius.rounded,
        height: '100%',
        width: '100%'
    },

    radioLabel: {
        color: colors.text,
        fontSize: (fontSizes.sm + 2),
        marginLeft: margins.xs
    }
}));