import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, fontSizes, margins }) => ({
    pressable: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: margins.md,
        justifyContent: 'space-between',
        padding: margins.sm,
    },

    text: {
        color: colors.text,
        fontSize: fontSizes.sm,
    },

    subText: {
        color: colors.icon,
        fontSize: (fontSizes.sm - 2),
    }
}));