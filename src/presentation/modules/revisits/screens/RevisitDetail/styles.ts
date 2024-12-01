import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, fontSizes, margins }) => ({
    imageText: {
        color: colors.modalText,
        fontSize: fontSizes.sm,
        marginTop: (margins.xs + 2)
    }
}));