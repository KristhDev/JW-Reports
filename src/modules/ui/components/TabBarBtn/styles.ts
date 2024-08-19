import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ borderRadius }) => ({
    pressable: {
        alignItems: 'center',
        borderRadius: borderRadius.xxl,
        flex: 1,
        height: 100,
        justifyContent: 'center'
    }
}));