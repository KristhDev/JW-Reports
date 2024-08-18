import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ margins }) => ({
    container: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        paddingHorizontal: margins.md,
        justifyContent: 'center',
        zIndex: 999
    },

    keyboardContent: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    }
}));