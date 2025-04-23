import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors, margins }) => ({
    screen: {
        alignItems: 'center',
        backgroundColor: colors.contentHeader,
        flex: 1,
        gap: 4,
        justifyContent: 'center'
    },

    logo: {
        maxHeight: 160,
        maxWidth: 160
    }
}));