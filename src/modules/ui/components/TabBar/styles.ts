import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(({ colors }) => ({
    container: {
        alignItems: 'center',
        backgroundColor: colors.bottom,
        flexDirection: 'row',
        height: 60,
        overflow: 'hidden',
        width: '100%'
    }
}));