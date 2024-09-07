import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ borderRadius, colors, margins, fontSizes }) => ({
    radioContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: (margins.xs - 3)
    },

    radioPressable: (isSelected: boolean) => ({
        alignItems: 'center',
        borderColor: (isSelected) ? colors.button : colors.icon,
        borderRadius: borderRadius.rounded,
        borderWidth: 2,
        height: 20,
        justifyContent: 'center',
        padding: (margins.xs - 5),
        width: 20
    }),

    radioCircle: (isSelected: boolean) => ({
        backgroundColor: (isSelected) ? colors.button : 'transparent',
        borderRadius: borderRadius.rounded,
        height: '100%',
        width: '100%'
    }),

    radioLabel: {
        color: colors.text,
        fontSize: (fontSizes.sm + 2),
        marginLeft: margins.xs
    }
}));